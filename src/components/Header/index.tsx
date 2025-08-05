"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BASE_URL, fetchLogo } from "@/Helper/handleapi";

import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    fetchLogo()
      .then((data) => {
        setLogo(data);
      })
      .catch((error) => {
        console.error("Error fetching logo:", error);
      });
  }, []);

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
            {logo.map((d) => (
              <Link href="/" key={d._id}>
                <img
                  src={`${BASE_URL}/images/${d.image}`}
                  alt="Logo"
                  style={{ width: "140px" }}
                />
              </Link>
            ))}

            <div className="max-w-[475px] w-full">
              <form>
                <div className="flex items-center">
                  <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
                    {/* <!-- divider --> */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search ..."
                      autoComplete="off"
                      className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                    />

                    <button
                      type="submit"
                      id="search-btn"
                      aria-label="Search"
                      className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
                  (+91) 00000 00000
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
