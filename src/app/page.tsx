import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>
        <Link href={"/"}>User</Link>
      </p>
      <Button>Hello</Button>
    </div>
  );
};

export default Home;
