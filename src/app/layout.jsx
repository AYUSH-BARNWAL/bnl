import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position={"top-center"}
          autoClose={3000}
          theme={"light"}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
