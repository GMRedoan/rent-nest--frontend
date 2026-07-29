"use client";

import { ThemeProvider } from "@/components/shared/theme/ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={true}
            >
                     {children}
             </ThemeProvider>
    );
};

export default Providers;
