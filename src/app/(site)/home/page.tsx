import React from "react";
import MainPage from "@/components/MainPage";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home Page | File Storage system",
  description: "This is Home Page for File Storage system",
};

const Home = () => {
  return (
    <main>
      <MainPage />
    </main>
  );
};

export default Home;
