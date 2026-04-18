import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


export const amiamie = localFont({
  src: [
    { path: "../../public/fonts/amiamie/otf/Amiamie-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/amiamie/otf/Amiamie-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/amiamie/otf/Amiamie-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/amiamie/otf/Amiamie-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/amiamie/otf/Amiamie-Black.otf", weight: "900", style: "normal" },
    { path: "../../public/fonts/amiamie/otf/Amiamie-BlackItalic.otf", weight: "900", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Novak",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${amiamie.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}