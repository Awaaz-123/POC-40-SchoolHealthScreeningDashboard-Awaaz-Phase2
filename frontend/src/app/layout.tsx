import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Health Screening Dashboard | Infocreon Internship",
  description: "Student vision, hearing, dental, and BMI screening coverage across Gulf school systems. Real-time screening coverage gauges, referral-to-treatment funnels, BMI age cohort trends, and school rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full bg-brand-bg text-gray-100 flex flex-col font-sans overflow-hidden">
        {children}
      </body>
    </html>
  );
}
