import AuthHeader from "@/components/shared/AuthHeader/AuthHeader";
import { Toaster } from "react-hot-toast";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-screen h-screen grid grid-rows-[auto_1fr] overflow-x-hidden">
        {/* <Toaster position="top-right" /> */}
        <AuthHeader/>
        {children}
      </div>
  );
}
