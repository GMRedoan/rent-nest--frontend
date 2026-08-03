import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Browse all available rental properties.",
};


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main className="max-w-7xl mx-auto px-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}
