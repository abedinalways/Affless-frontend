import EditorDashboardHeader from "@/components/shared/EditorDashboardHeader/EditorDashboardHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <EditorDashboardHeader />
      {children}

    </div>
  );
}
