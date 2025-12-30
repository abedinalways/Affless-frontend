import AuthHeader from "@/components/shared/AuthHeader/AuthHeader";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-screen h-screen grid grid-rows-[auto_1fr] overflow-x-hidden">
        <AuthHeader/>
        {children}
      </div>
  );
}
