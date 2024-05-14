import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GithubIcon } from "./github-icon";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanctum Wonderland checker",
  description: "Check your wonderland score",
  openGraph: {
    title: "Sanctum Wonderland checker",
    url: ``,
    description: "Check your wonderland score",
  },
  twitter: {
    title: "Sanctum Wonderland checker",
    description: "Check your wonderland score",
    creator: "@thereal0xalice",
  },
};

const config = {
  twitter: "https://twitter.com/thereal0xalice",
  author: "0xAlice",
  githubRepo: "https://github.com/21e8/sanctum-wonderland-checker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="flex flex-col justify-center items-center text-center mt-16">
          <span className="mb-8">
            Made With ❤️ by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
              href={config.twitter}
            >
              {config.author}
            </a>
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-400"
            href={config.githubRepo}
            aria-label="Fork me on GitHub"
            title="Fork me on GitHub"
          >
            <i>
              <GithubIcon className="h-12 w-12" />
            </i>
          </a>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
