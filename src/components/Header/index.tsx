"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCustomer = localStorage.getItem("customerDetails");
      if (storedCustomer) {
        try {
          const parsed = JSON.parse(storedCustomer);
          setCustomerName(parsed.name);
        } catch (e) {
          console.error("Error parsing customerDetails from localStorage:", e);
        }
      }
    }
  }, []);

  // Listen for cart updates using custom event
  const targetHref = customerName ? "/my-account" : "/signin";

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && "shadow"
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        {/* <!-- header top start --> */}
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* <!-- header top left --> */}
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            <Link href="/">
              <h3 className="text-custom-2 font-semibold">
                File Storage system
              </h3>
            </Link>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full lg:w-auto items-center gap-7.5">
            <div className="hidden xl:flex items-center gap-3.5">
              <i className="bi bi-telephone text-2xl text-blue"></i>

              <div>
                <span className="block text-2xs text-dark-4 uppercase">
                  24/7 SUPPORT
                </span>
                <p className="font-medium text-custom-sm text-dark">
                  (+91) 8136949407
                </p>
              </div>
            </div>

            {/* <!-- divider --> */}
            <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <div className="flex items-center gap-5">
                <Link href={targetHref} className="flex items-center gap-2.5">
                  <i className="bi bi-person text-3xl text-blue"></i>

                  <div>
                    <span className="block text-2xs text-dark-4 uppercase">
                      account
                    </span>
                    <p className="font-medium text-custom-sm text-dark">
                      {customerName ? `Hi, ${customerName}` : "Sign In"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </div>
    </header>
  );
};

export default Header;
