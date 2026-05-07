import MessageLayout from "./_components/MessageLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MessageLayout>
            {children}
        </MessageLayout>
    );
}