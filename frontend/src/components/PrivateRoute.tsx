import { Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";

interface Props {
  isLoggedIn: boolean;
  children: JSX.Element;
}

const PrivateRoute = ({ isLoggedIn, children }: Props) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
