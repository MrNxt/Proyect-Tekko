import HeroBody from "@/components/Hero";
import HeroDetails from "@/components/HeroDetails";
import Footer from "@/components/Footer";
import Info from "@/components/Info";
import BetaSignUp from "@/components/BetaSignUp";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="h-full w-full">
      <SmoothScroll />
      <div className="flex flex-col">
        <HeroBody />
        <Info />
        <HeroDetails />
        <BetaSignUp />
      </div>
      <Footer />
    </main>
  );
}
