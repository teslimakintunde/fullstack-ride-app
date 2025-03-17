import AboutUs from "@/components/about/About";
import BackTotopBtn from "@/components/back-to-top/BackTotopBtn";
import Cta from "@/components/cta/Cta";
import HeroSection from "@/components/hero/HeroSection";
import Objectives from "@/components/objectives/Objectives";
import Services from "@/components/services/Services";

import React from "react";

const HomePage = async () => {
  return (
    <main className="relative">
      <HeroSection />
      <AboutUs />
      <Services />
      <Cta />
      <Objectives />
      <BackTotopBtn />
    </main>
  );
};

export default HomePage;
