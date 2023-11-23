import React from "react";
import Link from "next/link";

const Navbar = (props) => {
  const {} = props;

  return (
    <div className="nav_wrapper">
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/careers"}>Career</Link>
    </div>
  );
};

export default React.memo(Navbar);
