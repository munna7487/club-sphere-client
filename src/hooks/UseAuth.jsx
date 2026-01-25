import { useContext } from "react";
import { Authcontex } from "../contex/authcontex/Authcontex";

const UseAuth = () => {
  return useContext(Authcontex);
};

export default UseAuth;
