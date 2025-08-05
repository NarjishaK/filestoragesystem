import Home from "./home/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Storage |File Storage  ",
  description: "File Storage  – Secure File storage system for your files.",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
