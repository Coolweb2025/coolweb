import { Suspense } from "react";
import Menu from "./menu";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="w-screen p-5 bg-teal-400 flex items-center justify-start md:justify-between flex-col md:flex-row">
        <Suspense fallback={<p>Loading logo...</p>}>
          <Image
            src="logo.svg"
            width="300"
            height="50"
            alt="Coolweb"
            className="w-64 flex-none"
          ></Image>
        </Suspense>
        <Suspense fallback={<p>Loading menu...</p>}>
          <Menu />
        </Suspense>
      </div>
    </>
  );
}
