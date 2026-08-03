import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import Providers from "@/provider/Providers";
import { getUser } from "@/server/user/user.service";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
 
export const metadata: Metadata = {
  title: {
    default: "RentNest",
    template: "%s | RentNest",
  },
  description:
    "Find your perfect rental property with trusted landlords and secure online payments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <AuthProvider 
            initialUser={user.success ? user.data : null}
          >
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
