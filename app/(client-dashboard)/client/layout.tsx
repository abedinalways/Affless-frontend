
import ContactUs from "@/components/MainPage/Contact-Us/Contact-Us";
import ClientDashboardHeader from "@/components/shared/ClientDashboardHeader/ClinetDashboardHeaader";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <div>
      <div className="">
        <ClientDashboardHeader />
      </div>
      {children}
      <ContactUs />
      <Footer />
    </div>

  );
}
