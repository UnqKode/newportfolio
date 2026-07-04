import "./globals.css";

export const metadata = {
  title: "Manas Yadav | Web Developer",
  description:
    "Manas Yadav (MaYa), a creative web developer and freelancer from India. Portfolio reimagined as a Windows 11 desktop - explore About, Projects, Skills, Resume, and Contact.",
  keywords: [
    "Manas Yadav",
    "MaYa",
    "web developer portfolio",
    "full stack developer",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: "Manas Yadav" }],
  icons: {
    icon: "/maya-logo.svg",
  },
  openGraph: {
    title: "Manas Yadav | Web Developer",
    description:
      "A creative web developer and freelancer from India, crafting immersive digital experiences with code and motion.",
    url: "https://www.itsdevmanas.xyz/",
    siteName: "Manas Yadav",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Manas Yadav | Web Developer",
    description:
      "A creative web developer and freelancer from India, crafting immersive digital experiences with code and motion.",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
