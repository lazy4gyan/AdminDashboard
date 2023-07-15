import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_BASE_URL } from "../constants/constants";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetching user data, if Username exists after refresh
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      fetch(USER_BASE_URL + username)
        .then((res) => res.json())
        .then((resp) => {
          setUser(resp);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handle Login using username and password
  const handleLogin = async (values) => {
    const { userName, password } = values;
    fetch(USER_BASE_URL + userName)
      .then((res) => res.json())
      .then((resp) => {
        if (Object.keys(resp).length === 0) {
          toast.error("Please enter a valid username");
        } else {
          if (resp.password === password) {
            toast.success("Success");
            sessionStorage.setItem("username", userName);
            setUser(resp);
            navigate("/");
          } else {
            toast.error("Please enter valid credentials");
          }
        }
      })
      .catch((err) => {
        toast.error("Login failed due to: " + err.message);
      });
  };

  const handleLogout = async ()=>{
    setUser(null);
    sessionStorage.removeItem("username");
    navigate("/login");
  }
  return (
    <AuthContext.Provider value={{ user, setUser, loading, handleLogin,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
