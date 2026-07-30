import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
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
          <Footer/>
    </>
  );
}
