import "./globals.css";
import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "../lib/utils";
import { Provider } from "../components/Providers";

const lexend = Lexend({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Learning Journey",
  description: 'AI course generator platform - using chatgpt'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, "antialiased min-h-screen bg-black-100 font-poppins")}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}

