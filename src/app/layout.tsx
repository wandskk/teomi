import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import CustomLoader from "@/components/Loader/CustomLoader";
import Flower from "@/components/Flower/Flower";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserStorage } from "../context/UserContext";
import "./globals.css";
import "normalize.css/normalize.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teomi",
  description: "Teomi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <UserStorage>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Header />
          <main>{children}</main>
          <Flower />
          <Footer />
          <SplashScreen />
          <CustomLoader />
        </body>
      </UserStorage>
    </html>
  );
}
