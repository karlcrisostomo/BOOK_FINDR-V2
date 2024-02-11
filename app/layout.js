import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, StyledLayout } from "@/app/component";
import { SearchProvider } from "@/app/context/SearchContext";
import { NavigationProvider } from "./context/NavigationContext";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BOOKFINDR",
  description: "Find Your Next Book",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NavigationProvider>
        <SearchProvider>
          <body className={poppins.className}>
            <Navbar />
            <StyledLayout>
              <main className="main">{children}</main>
              <Footer />
            </StyledLayout>
          </body>
        </SearchProvider>
      </NavigationProvider>
    </html>
  );
}
