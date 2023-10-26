import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { PaginationContextProvider } from "@/context/PaginationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Webwhiz",
  description: "webwhiz - a blog application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <PaginationContextProvider>
              <div className="md:container md:mx-auto px-5 md:px-0">
                <Toaster expand={true} position="top-right" richColors />
                <Navbar />
                <div>{children}</div>
                <Footer />
              </div>
            </PaginationContextProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
