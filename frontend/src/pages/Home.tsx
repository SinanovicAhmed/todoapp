import Navbar from "../components/Navbar";
interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  userID: string;
}
const Home = ({ user, setIsLoggedIn, userID, setUserID }: Props) => {
  return (
    <div>
      <Navbar
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        userID={userID}
        setUserID={setUserID}
      />
    </div>
  );
};

export default Home;
