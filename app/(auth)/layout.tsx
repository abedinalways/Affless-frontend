import AuthHeader from "@/components/AuthHeader/AuthHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
        <AuthHeader/>
        {children}
      </body>
    </html>
  );
}
