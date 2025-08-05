import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import mainData from "./mainData";
import Home from "../Home/home";

const BlogGrid = () => {
  return (
    <>
      <Breadcrumb title={"File storage system"} />{" "}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
            {mainData.map((items, key) => (
              <Home items={items} key={key} />
            ))}
          </div>
        </div>
      </section> 
    </>
  );
};

export default BlogGrid;
