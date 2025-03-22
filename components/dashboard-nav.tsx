"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { FileSpreadsheet, Home } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

export function DashboardNav({ availableFiles }: { availableFiles: string[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: "Overview",
      path: "/",
      icon: <Home className="h-4 w-4" />,
    },
    ...availableFiles.map((file) => ({
      name: file.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      path: `/data/${file}`,
      icon: <FileSpreadsheet className="h-4 w-4" />,
    })),
  ];

  return (
    <div className="flex flex-col space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={pathname === item.path ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => router.push(item.path)}
        >
          {item.icon}
          <span className="ml-2">{item.name}</span>
        </Button>
      ))}
    </div>
  );
}