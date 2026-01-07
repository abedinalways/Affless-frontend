import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";
import Footer from "@/components/shared/Footer/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {children}
      <Footer />
    </div>
  );
}
