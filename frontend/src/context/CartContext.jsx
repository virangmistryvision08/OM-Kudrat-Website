// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "../instance/axiosInstance";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [token, setToken] = useState(
    Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME) || null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      if (newToken !== token) setToken(newToken || null);
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const get_all_carts = async () => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/get-all-carts`
      );
      setCarts(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      const res = await api.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/cart/increment-quantity/${productId}`
      );
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const res = await api.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/cart/decrement-quantity/${productId}`);
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleRemoveCart = async (productId) => {
    try {
      const res = await api.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/cart/remove-from-cart/${productId}`);
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add-in-cart/${productId}`);
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const clearCart = () => {
    setCarts([]);
  };

  useEffect(() => {
    if (token) get_all_carts();
    else setCarts([]);
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        carts,
        get_all_carts,
        handleIncrement,
        handleDecrement,
        handleRemoveCart,
        handleAddToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
