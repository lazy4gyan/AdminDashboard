import Navbar from "../components/navbar/Navbar";
import UserProfile from "../components/Profile";

const Home = () => {
  return (
    <>
      <Navbar />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "2rem 0",
        }}
      >
        <UserProfile />
      </main>
    </>
  );
};

export default Home;
