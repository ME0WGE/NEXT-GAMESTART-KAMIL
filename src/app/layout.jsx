import Footer from "@/components/Footer/Footer";
import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";
import Navbar from "@/components/Navbar/Navbar";
import CouponSection from "@/components/CouponSection/CouponSection";

export const metadata = {
  title: "GameStart",
  description: "Welcome to GameStart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-midnight">
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
