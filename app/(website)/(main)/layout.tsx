import ContactUs from "@/components/MainPage/Contact-Us/Contact-Us";
import Footer from "@/components/shared/Footer/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
      <ContactUs />
      <Footer />
    </div>
  );
}
