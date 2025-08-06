"use client";
import React, { useState, useRef, useEffect } from "react";
import Home from "../Home/home";
import Signin from "../Auth/Signin";

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-50 py-8">
      <Home />
    </div>
  ) : (
    <Signin />
  );
};

export default MainPage;
