import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";

export const metadata = {
  title: "GameStart",
  description: "Welcome to GameStart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
