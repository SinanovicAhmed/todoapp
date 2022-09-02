import Navbar from "../components/Navbar";
import Catagory from "../components/Category";
import { useEffect, useState } from "react";
import Category from "../components/Category";
import HomeBar from "../components/HomeBar";

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  user: string;
  userID: string;
}
const Home = ({ user, setIsLoggedIn, userID, setUserID }: Props) => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState<
    {
      _id: string;
      userID: string;
      categoryID: string;
      taskHeadline: string;
      taskText: string;
    }[]
  >([]);
  const [update, toggleUpdate] = useState(false);
  const categoriesCount = categories.length;
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
  const fetchTasks = async () => {
    const response = await fetch(`http://localhost:5000/api/task/${userID}`);
    const responseMsg = await response.json();
    setTasks(responseMsg.tasks);
  };
  useEffect(() => {
    fetchCategories();
    fetchTasks();
  }, [update]);

  return (
    <div>
      <Navbar
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        userID={userID}
        setUserID={setUserID}
      />
      <HomeBar
        userID={userID}
        updateView={updateView}
        categoriesCount={categoriesCount}
      />
      <div className="w-screen flex justify-center items-start flex-wrap">
        <Catagory
          categoryName="To do"
          addedCategory={false}
          categoryID="123"
          updateView={updateView}
          tasks={tasks}
        />
        {categories.map((item, i) => (
          <Category
            key={i}
            categoryName={item["categoryName"]}
            addedCategory={true}
            categoryID={item["_id"]}
            updateView={updateView}
            tasks={tasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
