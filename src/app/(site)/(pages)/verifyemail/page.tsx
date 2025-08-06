// import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
import VerifyEmail from "@/components/Auth/verifyemail";
export const metadata: Metadata = {
  title: "Verification Page | File Storage system",
  description: "This is Verification Page for File Storage system",
  // other metadata
};

const Verification = () => {
  return (
    <main>
      <VerifyEmail />
    </main>
  );
};

export default Verification;
