import React from "react";
import { Item } from "../../types/item";
import Image from "next/image";

const Home = ({ items }: { items: Item }) => {
  return (
    <div className="shadow-1 bg-white rounded-xl px-4 sm:px-5 pt-5 pb-4">
      <Image
        src={items.img}
        alt="blog"
        className="rounded-md w-full"
        width={330}
        height={210}
      />

      <div className="mt-5.5">
        <span className="flex items-center gap-3 mb-2.5">
          <a
            href="#"
            className="text-custom-sm ease-out duration-200 hover:text-blue"
          >
            {items.date}
          </a>

          {/* <!-- divider --> */}
          <span className="block w-px h-4 bg-gray-4"></span>

          <a
            href="#"
            className="text-custom-sm ease-out duration-200 hover:text-blue"
          >
           Sub title
          </a>
        </span>

        <h2 className="font-medium text-dark text-lg sm:text-xl ease-out duration-200 mb-4 hover:text-blue">
          {items.title}
        </h2>
      </div>
    </div>
  );
};

export default Home;
