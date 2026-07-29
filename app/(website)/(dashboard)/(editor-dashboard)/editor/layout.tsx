import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";
import Footer from "@/components/shared/Footer/Footer";
export const dynamic = 'force-dynamic'

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
    </div>
  );
}
