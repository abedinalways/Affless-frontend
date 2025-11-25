"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface BreadLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function BreadCrumb({ links }: { links: BreadLink[] }) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-2 text-white">

        {links.map((link, index) => {
          const isLast = index === links.length - 1;

          return (
            <div className="flex items-center gap-2" key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-white" />}

              {/* If not last item → make it clickable */}
              {!isLast && link.href ? (
                <Link
                  href={link.href}
                  className="hover:underline text-sm font-medium text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-sm font-normal text-white opacity-80">
                  {link.label}
                </span>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}
