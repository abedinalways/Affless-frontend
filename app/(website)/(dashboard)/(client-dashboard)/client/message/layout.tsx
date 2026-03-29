import MessageLayout from "./_components/MessageLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MessageLayout>
            {children}
        </MessageLayout>
    );
}