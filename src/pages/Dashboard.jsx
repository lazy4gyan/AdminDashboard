import Navbar from "../components/navbar/Navbar";
import UserList from "../components/UserList";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main>
        <UserList />
      </main>
    </>
  );
};

export default Dashboard;
