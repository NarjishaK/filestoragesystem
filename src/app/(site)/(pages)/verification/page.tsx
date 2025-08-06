// import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
import VerificationPending from "@/components/Auth/verification";
export const metadata: Metadata = {
  title: "Verification Page | File Storage systemg",
  description: "This is Verification Page for File Storage system",
  // other metadata
};

const Verification = () => {
  return (
    <main>
      <VerificationPending />
    </main>
  );
};

export default Verification;
