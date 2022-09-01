import Navbar from "../components/Navbar";
import Catagory from "../components/Category";
import { useEffect, useState } from "react";
import Category from "../components/Category";
interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  userID: string;
}
const Home = ({ user, setIsLoggedIn, userID, setUserID }: Props) => {
  const [categories, setCategories] = useState([]);
  const [update, toggleUpdate] = useState(false);

  const updateView = () => {
    toggleUpdate(!update);
  };

  const fetchCategories = async () => {
    const response = await fetch(
      `http://localhost:5000/api/categories/${userID}`
    );
    const responseMsg = await response.json();
    setCategories(responseMsg.categories);
  };
  useEffect(() => {
    fetchCategories();
  }, [update]);

  return (
    <div>
      <Navbar
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        userID={userID}
        setUserID={setUserID}
      />
      <div className="w-screen flex">
        <Catagory
          categoryName="To do"
          addedCategory={false}
          categoryID="123"
          updateView={updateView}
        />
        {categories.map((item, i) => (
          <Category
            key={i}
            categoryName={item["categoryName"]}
            addedCategory={true}
            categoryID={item["_id"]}
            updateView={updateView}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
