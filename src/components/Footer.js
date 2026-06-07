import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>
            <div className="logo-icon">🎓</div>
            <div className="logo-text">KKG<span>Connect</span></div>
          </div>
          <p>
            Portal resmi organisasi kemahasiswaan. HIMA &amp; UKM terbaik kampus untuk mendukung perjalanan akademik dan
            non-akademikmu.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn">📘</a>
            <a href="#" className="social-btn">📸</a>
            <a href="#" className="social-btn">🐦</a>
            <a href="#" className="social-btn">▶️</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigasi</h4>
          <ul>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/about">Tentang Kami</Link></li>
            <li><Link href="/hima">Daftar HIMA</Link></li>
            <li><Link href="/ukm">Daftar UKM</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Kategori UKM</h4>
          <ul>
            <li><Link href="/ukm?cat=olahraga">⚽ Olahraga</Link></li>
            <li><Link href="/ukm?cat=minat dan bakat">🎨 Minat & Bakat</Link></li>
            <li><Link href="/ukm?cat=penalaran dan kreativitas">🔬 Penalaran & Kreativitas</Link></li>
            <li><Link href="/ukm?cat=kerohanian, kemasyarakatan dan sosial">🕌 Kerohanian & Sosial</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Info Penting</h4>
          <ul>
            <li><Link href="/#why">Panduan SKKM</Link></li>
            <li><Link href="/#join">Cara Bergabung</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 KKGConnect. Dibuat dengan <span>♥</span> untuk mahasiswa.</p>
        <p>Privasi • Syarat &amp; Ketentuan</p>
      </div>
    </footer>
  );
}
