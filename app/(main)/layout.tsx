import ContactUs from "@/components/MainPage/Contact-Us/Contact-Us";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
           <Navbar/>
        {children}

        <ContactUs/>
        <Footer/>
      </body>
    </html>
  );
}
