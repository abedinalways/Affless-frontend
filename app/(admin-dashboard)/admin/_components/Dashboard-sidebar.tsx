import Earning from "@/components/Icons/Earning";
import { BriefcaseBusiness, LayoutDashboard, LogOut, PackageSearch, Settings, User } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";

export interface SidebarDataType {
  id: number;
  name: string;
  href: string;
  icon: React.ElementType;
}

export const SidebarData: SidebarDataType[] = [
  {
    id: 1,
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "User Management",
    href: "/admin/usermanagement",
    icon: FaRegUser,
  },
  {
    id: 3,
    name: "Earnings",
    href: "/admin/earning",
    icon: Earning,
  },
  {
    id: 4,
    name: "Analytics",
    href: "/admin/analytics",
    icon: BriefcaseBusiness,
  },
  {
    id: 5,
    name: "Chats",
    href: "/admin/chats",
    icon: MdMailOutline,
  },
  {
    id: 6,
    name: "Settings",
    href: "/admin/setting",
    icon: Settings,
  },
];