import "./global.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Cortex Labs",
  description: "Embedded Systems Engineering Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}