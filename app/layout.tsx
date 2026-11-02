import "./globals.css";

export const metadata = {
  title: "Automated SMM Reseller Panel",
  description: "Boost your social growth automatically via I&M Bank settlements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
