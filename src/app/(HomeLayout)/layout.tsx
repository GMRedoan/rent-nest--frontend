import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
export const metadata: Metadata = {
  title: "Rent Nest | Home",
  description: "A property rental app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <nav>
            <Navbar />
          </nav>
          {children}
    </>
  );
}
