import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/reduxProvider";
import NavBar from "@/components/topbar/navBar";

const patrick = Patrick_Hand({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Teaching from the Heart",
  description:
    "Un sitio web dedicado a enseñar inglés como segundo idioma a niños con métodos divertidos, dinámicos y efectivos.",
  keywords:
    "ESL, niños, clases de inglés para niños, segundo idioma, inglés para niños, inglés para niños como segundo idioma, métodos de enseñanza, educación infantil, aprender inglés, lecciones de ESL dinámicas",
  openGraph: {
    title: "Teaching from the Heart",
    description:
      "Un sitio web dedicado a enseñar inglés como segundo idioma a niños con métodos dinámicos y efectivos.",
    url: "https://teaching-from-the-heart.vercel.app",
    type: "website",
    images: [
      {
        url: "https://teaching-from-the-heart.vercel.app/logo-teach.png/logo-teach.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    site_name: "Teaching from the Heart",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="340rasPMLJ8k1O5hou-YzHnXVeTt8ws3JfI055f8PQA"
        />
        <link rel="icon" type="image/png" href="/logo-teach.png" />
      </head>
      <body
        className={`${patrick.className} tracking-wide antialiased  scroll-smooth `}
      >
        <ReduxProvider>
          <div className="sticky top-0 right-0 z-50 bg-neutral-100/30 shadow-md p-4 backdrop-blur-md">
            {" "}
            <NavBar />
          </div>

          <div className="text-rose-950 p-4 overflow-x-hidden">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
