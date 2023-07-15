import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CLIENT_BASE_URL, USER_BASE_URL } from "../constants/constants";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Checking username conflict here, in ui as i don't have any api for the username validation by fetching userlist
  useEffect(() => {
    async function getUserList() {
      fetch(USER_BASE_URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching data");
          }
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
    getUserList();
  }, []);

  // Fetch users data from the endpoint
  useEffect(() => {
    fetch(CLIENT_BASE_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // New user registeration
  const handleRegisterUser = async (values) => {
    fetch(USER_BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(() => {
        toast.success("Registered successfully.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed :" + err.message);
      });
  };

  // Delete user from list
  async function deleteUser(id) {
    const url = `${CLIENT_BASE_URL}/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("User deleted successfully.");
          setData((prevData) => prevData.filter((user) => user.id !== id));
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch((error) => {
        toast.error("Failed to delete user: " + error.message);
      });
  }

  return (
    <GlobalContext.Provider
      value={{ users, data, setData, handleRegisterUser, deleteUser, loading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
