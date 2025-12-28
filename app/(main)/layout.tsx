import ContactUs from "@/components/MainPage/Contact-Us/Contact-Us";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>
      {children}
      <ContactUs />
      <Footer />
    </div>
  );
}
