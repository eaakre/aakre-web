"use client";

import Link from "next/link";
import { useState } from "react";
import Drawer from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="flex items-center justify-between p-4 md:py-8 container mx-auto">
        <Link href="/" className="text-xl font-semibold">
          Solid Ground Homes
        </Link>
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          className="md:hidden"
          variant="secondary"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          direction="right"
        >
          <nav className="space-y-4 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-lg hover:underline"
                onClick={() => setIsOpen(false)} // optional: can remove this line
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Drawer>
      </div>
    </header>
  );
}
