import "./globals.css";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Sistem Poin Mahasiswa STIKOM",
    template: "%s | Sistem Poin Mahasiswa STIKOM",
  },
  description:
    "Sistem informasi poin non akademik mahasiswa STIKOM untuk pengelolaan klaim kegiatan, verifikasi dosen, dan rekap poin mahasiswa.",
  keywords: [
    "poin mahasiswa",
    "sistem poin mahasiswa",
    "poin non akademik",
    "STIKOM",
    "sistem informasi kampus",
    "mahasiswa",
  ],
  authors: [{ name: "STIKOM" }],
  creator: "STIKOM",
  publisher: "STIKOM",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://poin-mhs-stikom.my.id"),
  openGraph: {
    title: "Sistem Poin Mahasiswa STIKOM",
    description:
      "Aplikasi pengelolaan poin non akademik mahasiswa STIKOM berbasis web.",
    url: "https://poin-mhs-stikom.my.id",
    siteName: "Sistem Poin Mahasiswa STIKOM",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
