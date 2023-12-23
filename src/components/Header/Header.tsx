import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";
import changeTheme from "../../../public/static/theme.png";
import Image from "next/image";
import arrow from "../../../public/static/arrow.png";

interface HeaderProps {
  arrowBack: boolean;
}

export const Header: FC<HeaderProps> = ({ arrowBack }) => {
  const router = useRouter();

  const { currentTheme, toggleTheme } = useContext(Theme);

  const onArrowClick = () => {
    router.push("/");
  };
  return (
    <header
      className={`flex px-20  w-full py-1 border-b-2 justify-between items-center fixed top-0 left-0   ${
        currentTheme == "black" ? "header-bg" : "A638EC0"
      }`}
      style={{ zIndex: 6 }}>
      <h1 className="text-3xl flex text-white leading-loose ">YSMLreska</h1>
      <div className="flex items-center">
        {arrowBack && (
          <Image
            src={arrow}
            alt="arrow"
            onClick={onArrowClick}
            className="invert cursor-pointer"
          />
        )}
        <Image
          width={40}
          height={40}
          src={changeTheme}
          className={`cursor-pointer ml-4 ${
            currentTheme !== "black" ? "invert" : ""
          }`}
          alt="theme switch p-2"
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
};
