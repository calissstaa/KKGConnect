import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Organisasi Kampus – HIMA & UKM",
  description: "Temukan dan bergabung dengan HIMA atau UKM terbaik di kampus. Kembangkan diri, raih prestasi, dan tambah poin SKKM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
