import React from "react";
import Error from "@/components/Error";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Error Page | File Storage system",
  description: "This is Error Page for File Storage system",
};

const ErrorPage = () => {
  return (
    <main>
      <div className="py-20">
      <Error />
     </div>
    </main>
  );
};

export default ErrorPage;
