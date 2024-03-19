import Dashboard from "@/pages/dashboard";
import scss from "@/pages/components/Layout/Layout.module.scss"
import React from "react";

const Home: React.FC = () => {

  return (
    <main className={scss.main}>
      <Dashboard />
    </main>
  );
};

export default Home;