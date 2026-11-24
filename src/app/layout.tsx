import type { Metadata, Viewport } from "next";
import "./globals.css";
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smrbruh-beyond-interface.branchinggerbil8.chatgpt.site";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: "SMRBRUH / Beyond the Interface — Bakdaulet Sotsial",
  description:
    "Software engineering, cybersecurity and applied research. Explore Bakdaulet Sotsial’s open-source tools, desktop applications and research experiments.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SMRBRUH / Beyond the Interface",
    description:
      "The mission archive of Bakdaulet Sotsial. Software. Systems. Experiments.",
    type: "website",
    images: [
      {
        url: "/assets/site/launchpad.webp",
        width: 1536,
        height: 1024,
        alt: "SMRBRUH cinematic spacecraft launchpad",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#070a19",
  width: "device-width",
  initialScale: 1,
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
