import AuthHeader from "@/components/AuthHeader/AuthHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div>
  <AuthHeader/>
        {children}
    
      </div>
      
  );
}
