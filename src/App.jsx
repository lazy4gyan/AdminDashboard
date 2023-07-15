import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { GlobalProvider } from "./store/globalStore";
import { AuthProvider } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!username && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location, username]);

  return (
    <main>
      <ToastContainer theme="colored" position="top-center" />
      <AuthProvider>
        <GlobalProvider>
          <Suspense
            fallback={
              <div className="loading-container">
                <Spin size="large" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </GlobalProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
