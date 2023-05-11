import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div
        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 bg-white flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        onClick={toggleOpen}
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={"/placeholder.jpg"} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md  w-[20vh] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem onClick={toggleOpen} label="Login" />
            <MenuItem onClick={toggleOpen} label="Sign Up" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
