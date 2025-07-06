import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 px-4 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} Modular Homes. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="mailto:info@modularhomes.com" className="hover:underline">
            info@modularhomes.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
