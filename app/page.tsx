import About from "@/components/ui-home/about";
import Cta from "@/components/ui-home/cta";
import Features from "@/components/ui-home/features";
import Footer from "@/components/ui-home/footer";
import LandingSec from "@/components/ui-home/landing-sec";
import Modes from "@/components/ui-home/modes";
import Sponsor from "@/components/ui-home/sponsor";
import Team from "@/components/ui-home/team";
import React from "react";

const page = () => {
  return (
    <div className="bg-black">
      <LandingSec />
      <Sponsor />
      <About />
      <Modes />
      <Features />
      <Team />
      <Cta />
      <Footer />
    </div>
  );
};

export default page;
