import Footer from "@/components/Footer";
import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "GameStart",
  description: "Welcome to GameStart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
