import { LayoutDashboard, LogOut, PackageSearch, Settings } from "lucide-react";

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
    href: "dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "User Management",
    href: "/admin/dashboard/usermanagement",
    icon: PackageSearch,
  },
  {
    id: 3,
    name: "Earning",
    href: "/admin/dashboard/earning",
    icon: Settings,
  },
    {
    id: 4,
    name: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: LogOut,
  },
    {
    id: 5,
    name: "Setting",
    href: "/logout",
    icon: Settings,
  },
];