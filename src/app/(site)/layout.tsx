"use client";
import { useState, useEffect } from "react";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// import { ReduxProvider } from "@/redux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <div className="loader" />
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
