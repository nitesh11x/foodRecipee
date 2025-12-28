import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "http://localhost:3000/api";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      profile();
      fetchRecipe();
      getSavedRecipe();
    }
  }, [token]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${url}/`, { withCredentials: true });
      setRecipe(response.data.recipe);
    } catch {}
  };

  const getSavedRecipe = async () => {
    try {
      const response = await axios.get(`${url}/saved`, { withCredentials: true });
      setSavedRecipe(Array.isArray(response.data?.recipe) ? response.data.recipe : []);
    } catch {
      setSavedRecipe([]);
    }
  };

  const profile = async () => {
    try {
      const response = await axios.get(`${url}/user`, {
        headers: { Auth: token },
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `${url}/login`,
      { email, password },
      { withCredentials: true }
    );
    setToken(response.data.token);
    setIsAuthenticated(true);
    return response;
  };

  const register = async (name, email, password, phone) => {
    const response = await axios.post(
      `${url}/register`,
      { name, email, password, phone },
      { withCredentials: true }
    );
    setToken(response.data.token);
    setIsAuthenticated(true);
    return response;
  };

  const addRecipe = async (title, ist, ing1, ing2, ing3, ing4, qty1, imgUrl) => {
    return await axios.post(
      `${url}/add`,
      { title, ist, ing1, ing2, ing3, ing4, qty1, imgUrl },
      { headers: { Auth: token }, withCredentials: true }
    );
  };

  const getRecipeById = async (id) => {
    return await axios.get(`${url}/${id}`, { headers: { Auth: token }, withCredentials: true });
  };

  const saveRecipeById = async (id) => {
    return await axios.post(
      `${url}/${id}`,
      {},
      { headers: { Auth: token }, withCredentials: true }
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuthenticated(false);
    setUser(null);
    setSavedRecipe([]);
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addRecipe,
        getRecipeById,
        saveRecipeById,
        getSavedRecipe,
        setRecipe,
        recipe,
        savedRecipe,
        user,
        profile,
        isAuthenticated,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
