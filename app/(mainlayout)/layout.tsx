import Footer from "@/shareds/footer/Footer";
import Navbar from "@/shareds/navbar/Navbar";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
