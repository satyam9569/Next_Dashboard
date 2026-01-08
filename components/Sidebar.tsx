"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/sales", label: "Sales" },
  { href: "/returns", label: "Returns" },
  { href: "/history", label: "History" },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-6 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <h1 className="font-bold text-xl mb-6">fashi</h1>
      <nav>
        <ul className="flex flex-col space-y-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "block px-3 py-2 rounded-md",
                  pathname === href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
