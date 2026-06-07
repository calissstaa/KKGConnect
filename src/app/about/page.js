"use client";

import { useEffect } from "react";

export default function About() {
  // Scroll reveal hook
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="section-tag" style={{ background: "rgba(255,255,255,.15)", color: "#DBEAFE", borderColor: "rgba(255,255,255,.25)" }}>
          🏛️ Tentang Kami
        </div>
        <h1>Mengenal <span style={{ color: "#93C5FD" }}>Organisasi Kampus</span></h1>
        <p>
          Wadah pengembangan diri mahasiswa — HIMA dan UKM — yang telah berdiri lebih dari 30 tahun, melahirkan ribuan
          alumni berprestasi.
        </p>
      </div>

      {/* SEJARAH SINGKAT */}
      <section style={{ padding: "4rem 5%", background: "var(--bg3)" }}>
        <div className="about-grid">
          <div className="about-visual">
            <div className="floating-icons">
              <span className="fi" style={{ top: "10%", left: "10%", animationDelay: "0s" }}>⚽</span>
              <span className="fi" style={{ top: "20%", right: "15%", animationDelay: ".5s" }}>🎨</span>
              <span className="fi" style={{ bottom: "25%", left: "20%", animationDelay: "1s" }}>🔬</span>
              <span className="fi" style={{ bottom: "15%", right: "10%", animationDelay: "1.5s" }}>🌿</span>
              <span className="fi" style={{ top: "50%", left: "5%", animationDelay: ".8s" }}>🕌</span>
              <span className="fi" style={{ top: "40%", right: "5%", animationDelay: ".3s" }}>🏆</span>
            </div>
            🎓
          </div>
          <div className="about-content">
            <div className="section-tag">Sejarah Singkat</div>
            <h2>Berdiri Sejak 1987, Terus Berkembang</h2>
            <p>
              UKM Kampus lahir dari kebutuhan mahasiswa akan ruang ekspresi dan pengembangan diri di luar perkuliahan.
              Dimulai dari 5 unit kegiatan sederhana, kini telah berkembang menjadi lebih dari 20 unit dengan ratusan anggota
              aktif.
            </p>
            <p>
              Setiap tahunnya, ratusan mahasiswa berhasil menorehkan prestasi di tingkat regional, nasional, hingga
              internasional — berkat semangat dan dukungan dari ekosistem UKM yang kuat.
            </p>
            <div className="about-values">
              <div className="value-item">
                <div className="vi-icon">💡</div>
                <h4>Inovasi</h4>
              </div>
              <div className="value-item">
                <div className="vi-icon">🤝</div>
                <h4>Kolaborasi</h4>
              </div>
              <div className="value-item">
                <div className="vi-icon">🌟</div>
                <h4>Keunggulan</h4>
              </div>
              <div className="value-item">
                <div className="vi-icon">❤️</div>
                <h4>Integritas</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section style={{ padding: "4rem 5%", background: "var(--bg)" }}>
        <div className="section-header reveal">
          <div className="section-tag">🎯 Visi &amp; Misi</div>
          <h2 className="section-title">Tujuan &amp; <span style={{ color: "var(--primary)" }}>Arah Kami</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
          <div className="why-card reveal" style={{ "--card-accent": "linear-gradient(90deg,#1E3A8A,#3B82F6)" }}>
            <div className="why-icon" style={{ fontSize: "1.8rem", width: "64px", height: "64px" }}>👁️</div>
            <h3>Visi</h3>
            <p>
              Menjadi ekosistem pengembangan mahasiswa terbaik yang menghasilkan insan unggul, berkarakter, dan siap
              bersaing di era global.
            </p>
          </div>
          <div className="why-card reveal" style={{ "--card-accent": "linear-gradient(90deg,#F59E0B,#EF4444)" }}>
            <div className="why-icon" style={{ fontSize: "1.8rem", width: "64px", height: "64px" }}>🚀</div>
            <h3>Misi</h3>
            <p>
              Memfasilitasi pengembangan bakat, membangun komunitas inklusif, dan mendorong kolaborasi lintas jurusan untuk
              menciptakan dampak nyata.
            </p>
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI */}
      <section style={{ padding: "4rem 5%", background: "var(--bg3)" }}>
        <div className="section-header reveal">
          <div className="section-tag">👥 Struktur Organisasi</div>
          <h2 className="section-title">Tim <span style={{ color: "var(--primary)" }}>Pengurus</span> Pusat</h2>
          <p className="section-subtitle">Dikelola oleh mahasiswa, untuk mahasiswa — dengan bimbingan dosen pembina berpengalaman.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
          <div className="why-card reveal" style={{ textAlign: "center", "--card-accent": "linear-gradient(90deg,#1D4ED8,#3B82F6)" }}>
            <div style={{ fontSize: "3rem", marginBottom: ".8rem" }}>💁‍♀️</div>
            <div style={{ fontSize: "1.3rem", marginBottom: ".3rem", fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: "var(--primary)" }}>
              Astrid Stephanie
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>Pengurus Pusat</div>
          </div>
          <div className="why-card reveal" style={{ textAlign: "center", "--card-accent": "linear-gradient(90deg,#2563EB,#1E3A8A)" }}>
            <div style={{ fontSize: "3rem", marginBottom: ".8rem" }}>🙋‍♀️</div>
            <div style={{ fontSize: "1.3rem", marginBottom: ".3rem", fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: "var(--primary)" }}>
              Calista Mirachel
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>Pengurus Pusat</div>
          </div>
          <div className="why-card reveal" style={{ textAlign: "center", "--card-accent": "linear-gradient(90deg,#059669,#2563EB)" }}>
            <div style={{ fontSize: "3rem", marginBottom: ".8rem" }}>🙆‍♀️</div>
            <div style={{ fontSize: "1.3rem", marginBottom: ".3rem", fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: "var(--primary)" }}>
              Claudya Christania T.
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: ".85rem" }}>Pengurus Pusat</div>
          </div>
        </div>
      </section>
    </div>
  );
}
