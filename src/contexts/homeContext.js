import React, { createContext, useReducer, useEffect } from "react";
import { homeReducer } from "../reducers/homeReducer";
import { getHome } from "../crudFunctions/homeFunctions";

export const HomeContext = createContext();
const initState = {
  error: null,
};

const HomeContextProvider = (props) => {
  const [home, dispatch] = useReducer(homeReducer, initState);
  useEffect(() => {
    getHome(dispatch);
  }, []);
  return (
    <HomeContext.Provider value={{ home, dispatch }}>
      {props.children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
