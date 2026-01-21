import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";
import Footer from "@/components/shared/Footer/Footer";
import EditorLayout from "./_components/EditorLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <EditorLayout >
        {children}
      </EditorLayout>
      <Footer />
    </div>
  );
}
