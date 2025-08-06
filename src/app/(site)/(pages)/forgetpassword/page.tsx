import Forgetpassword from "@/components/Auth/Forgetpassword";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forget Page | File Storage system",
  description: "This is Forget Page for File Storage system",
  // other metadata
};

const Forget = () => {
  return (
    <main>
      <Forgetpassword />
    </main>
  );
};

export default Forget;
