export const dynamic = 'force-dynamic'

import ClientLayout from "./_components/ClientLayout";
import ContactUs from "@/components/MainPage/Contact-Us/Contact-Us";
import ClientDashboardHeader from "@/components/shared/ClientDashboardHeader/ClinetDashboardHeaader";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/NavbarWithoutLogin";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <ClientLayout>
        {children}
      </ClientLayout>
    </div>
  );
}
