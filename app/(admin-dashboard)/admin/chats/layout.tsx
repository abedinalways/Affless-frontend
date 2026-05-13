import MessageLayout from "@/app/(admin-dashboard)/admin/chats/_components/MessageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MessageLayout>{children}</MessageLayout>;
}
