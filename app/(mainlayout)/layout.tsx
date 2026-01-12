import Footer from "@/shareds/footer/Footer";
import Navbar from "@/shareds/navbar/Navbar";
import { Suspense } from "react";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<div className="h-20 bg-black/80 w-full fixed top-0" />}>
        <Navbar />
      </Suspense>
      <main> {children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
