"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── SUBCOMPONENT: Viewport Counter ──
function Counter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} className="big-num">
      {count.toLocaleString("id-ID")}
      {suffix}
    </div>
  );
}

// ── FAQ DATA ──
const faqs = [
  {
    q: "Siapa saja yang bisa bergabung dalam organisasi?",
    a: "Seluruh mahasiswa aktif kampus dari semua jurusan dan angkatan diperbolehkan bergabung dengan UKM. Namun untuk HIMA, pendaftaran dikhususkan bagi mahasiswa dari program studi terkait."
  },
  {
    q: "Berapa banyak organisasi yang boleh saya ikuti?",
    a: "Tidak ada batasan resmi, namun kami menyarankan maksimal mengikuti 1 HIMA dan 2 UKM agar kamu tetap bisa mengatur waktu antara kuliah dan organisasi dengan seimbang."
  },
  {
    q: "Apakah ada biaya pendaftaran?",
    a: "Mayoritas pendaftaran organisasi adalah gratis. Namun, beberapa UKM tertentu mungkin memiliki iuran keanggotaan untuk biaya operasional kegiatan (seperti alat olahraga atau seragam)."
  },
  {
    q: "Bagaimana cara mendapatkan poin SKKM?",
    a: "Kamu akan mendapatkan sertifikat resmi setelah menyelesaikan masa jabatan atau berpartisipasi dalam event tertentu yang kemudian bisa diklaim ke bagian kemahasiswaan sebagai poin SKKM."
  }
];

export default function Home() {
  const [faqActiveIndex, setFaqActiveIndex] = useState(null);

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

  const toggleFaq = (index) => {
    setFaqActiveIndex(faqActiveIndex === index ? null : index);
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="hero-img-overlay"></div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="hero-content">
          <div className="hero-badge">✨ &nbsp;Tahun Akademik 2025/2026 — Open Recruitment</div>
          <h1>Bergabung &amp; <span className="highlight">Berkembang</span> Bersama Kami</h1>
          <p>
            Ratusan mahasiswa aktif di HIMA dan UKM kampus. Kembangkan potensi, perluas jaringan, dan raih poin SKKM lebih
            cepat bersama komunitas terbaik.
          </p>
          <div className="hero-actions">
            <Link href="/hima" className="btn-primary">🏛️ Lihat HIMA</Link>
            <Link href="/ukm" className="btn-outline">🎯 Lihat UKM</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">5</div>
              <div className="stat-label">Himpunan Mahasiswa</div>
            </div>
            <div className="stat">
              <div className="stat-number">15</div>
              <div className="stat-label">Unit Kegiatan</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Anggota Aktif</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-icon">🏛️</div>
            <div className="hero-card-title">HIMA</div>
            <div className="hero-card-sub">5 Himpunan</div>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">🎯</div>
            <div className="hero-card-title">UKM</div>
            <div className="hero-card-sub">15 Unit</div>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">📋</div>
            <div className="hero-card-title">SKKM</div>
            <div className="hero-card-sub">Poin Terakreditasi</div>
          </div>
          <div className="hero-card">
            <div className="hero-card-icon">🏆</div>
            <div className="hero-card-title">Prestasi</div>
            <div className="hero-card-sub">50+ Event/Tahun</div>
          </div>
        </div>
      </section>

      {/* ═══ WHY JOIN (5 ALASAN) ═══ */}
      <section className="why-join" id="why">
        <div className="section-header reveal">
          <div className="section-tag">💡 Kenapa Harus Bergabung?</div>
          <h2 className="section-title">5 Alasan Kamu <span style={{ color: "var(--primary)" }}>Wajib</span> Aktif Organisasi</h2>
          <p className="section-subtitle">Organisasi kampus bukan hanya kegiatan tambahan — ini investasi terbaik selama masa kuliahmu.</p>
        </div>
        <div className="why-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div
            className="why-card reveal"
            style={{
              "--card-accent": "linear-gradient(90deg,#1D4ED8,#3B82F6)",
              "--icon-bg": "var(--primary-light)"
            }}
          >
            <div className="why-icon">📋</div>
            <h3>Poin SKKM Terakreditasi</h3>
            <p>Setiap kegiatan HIMA dan UKM memberikan poin SKKM yang diakui resmi oleh kampus — wajib untuk kelulusan dan yudisium.</p>
          </div>

          <div
            className="why-card reveal"
            style={{
              "--card-accent": "linear-gradient(90deg,#F59E0B,#EF4444)",
              "--icon-bg": "#FEF3C7"
            }}
          >
            <div className="why-icon">🤝</div>
            <h3>Perluas Jaringan &amp; Relasi</h3>
            <p>Kenali ratusan mahasiswa lintas jurusan, alumni berpengalaman, dan profesional industri yang terhubung via organisasi kampus.</p>
          </div>

          <div
            className="why-card reveal"
            style={{
              "--card-accent": "linear-gradient(90deg,#059669,#3B82F6)",
              "--icon-bg": "#D1FAE5"
            }}
          >
            <div className="why-icon">🏆</div>
            <h3>Raih Prestasi &amp; Penghargaan</h3>
            <p>Ikuti kompetisi dari tingkat lokal hingga nasional. Prestasi organisasi memperkuat profil akademik dan CV profesionalmu.</p>
          </div>

          <div
            className="why-card reveal"
            style={{
              "--card-accent": "linear-gradient(90deg,#2563EB,#1E3A8A)",
              "--icon-bg": "#DBEAFE"
            }}
          >
            <div className="why-icon">🚀</div>
            <h3>Kembangkan Soft Skill</h3>
            <p>Kepemimpinan, komunikasi, manajemen waktu, dan kerja tim — semua terasah secara nyata melalui program dan kegiatan organisasi.</p>
          </div>

          <div
            className="why-card reveal"
            style={{
              "--card-accent": "linear-gradient(90deg,#3B82F6,#60A5FA)",
              "--icon-bg": "#E0F2FE"
            }}
          >
            <div className="why-icon">🎉</div>
            <h3>Pengalaman &amp; Kenangan Berharga</h3>
            <p>Dari pentas seni, bakti sosial, hingga pelatihan nasional — setiap momen di organisasi menjadi cerita yang tak ternilai.</p>
          </div>
        </div>
      </section>

      {/* ═══ TIPE ORGANISASI: HIMA & UKM ═══ */}
      <section className="org-types" id="types">
        <div className="section-header reveal">
          <div className="section-tag">🏢 Jenis Organisasi</div>
          <h2 className="section-title">HIMA &amp; <span style={{ color: "var(--primary)" }}>UKM</span></h2>
          <p className="section-subtitle">Dua jenis organisasi kemahasiswaan yang saling melengkapi untuk membentuk mahasiswa yang unggul dan berkarakter.</p>
        </div>
        <div className="org-grid">
          {/* HIMA */}
          <div className="org-card reveal">
            <div className="org-card-top" style={{ "--org-grad": "linear-gradient(135deg,#1E3A8A,#2563EB,#38BDF8)", height: "140px" }}>
              🏛️
            </div>
            <div className="org-card-body" style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem" }}>HIMA — Himpunan Mahasiswa</h3>
              <p style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>Organisasi kemahasiswaan berbasis program studi untuk membangun identitas akademik dan profesional.</p>
              <span className="org-count" style={{ marginTop: "0.5rem", padding: "0.2rem 0.6rem", fontSize: "0.7rem" }}>🏛️ 5 Himpunan</span>
            </div>
            <div className="org-card-footer" style={{ padding: "0 1rem 1rem" }}>
              <Link href="/hima" className="org-link" style={{ padding: "0.4rem", fontSize: "0.8rem" }}>Lihat HIMA →</Link>
            </div>
          </div>

          {/* UKM */}
          <div className="org-card reveal">
            <div className="org-card-top" style={{ "--org-grad": "linear-gradient(135deg,#1E3A8A,#1D4ED8,#3B82F6)", height: "140px" }}>
              🎯
            </div>
            <div className="org-card-body" style={{ padding: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem" }}>UKM — Unit Kegiatan Mahasiswa</h3>
              <p style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>Organisasi lintas jurusan berbasis minat dan bakat di bidang olahraga, seni, dan lainnya.</p>
              <span className="org-count" style={{ marginTop: "0.5rem", padding: "0.2rem 0.6rem", fontSize: "0.7rem" }}>🎯 15 Unit</span>
            </div>
            <div className="org-card-footer" style={{ padding: "0 1rem 1rem" }}>
              <Link href="/ukm" className="org-link" style={{ padding: "0.4rem", fontSize: "0.8rem" }}>Lihat UKM →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW TO JOIN ═══ */}
      <section className="how-to-join" id="join">
        <div className="section-header reveal">
          <div className="section-tag">📝 Alur Pendaftaran</div>
          <h2 className="section-title">Cara <span style={{ color: "var(--primary)" }}>Bergabung</span></h2>
          <p className="section-subtitle">Ikuti langkah-langkah mudah berikut untuk menjadi bagian dari HIMA atau UKM pilihanmu.</p>
        </div>

        <div className="join-steps">
          <div className="step-item reveal" style={{ "--step-color": "#3B82F6", "--step-bg": "#EFF6FF" }}>
            <div className="step-num">01</div>
            <div className="step-icon">🔍</div>
            <div className="step-content">
              <h3>Pilih Organisasi</h3>
              <p>Jelajahi daftar HIMA &amp; UKM yang tersedia. Pilih yang paling sesuai dengan passion atau jurusanmu.</p>
            </div>
          </div>
          <div className="step-item reveal" style={{ "--step-color": "#F59E0B", "--step-bg": "#FFFBEB" }}>
            <div className="step-num">02</div>
            <div className="step-icon">📝</div>
            <div className="step-content">
              <h3>Isi Formulir</h3>
              <p>Klik tombol daftar dan isi formulir pendaftaran online dengan data diri yang lengkap dan benar.</p>
            </div>
          </div>
          <div className="step-item reveal" style={{ "--step-color": "#10B981", "--step-bg": "#ECFDF5" }}>
            <div className="step-num">03</div>
            <div className="step-icon">🤝</div>
            <div className="step-content">
              <h3>Wawancara &amp; Seleksi</h3>
              <p>Ikuti rangkaian tes atau wawancara singkat untuk mengenal lebih dalam tentang visi dan misimu.</p>
            </div>
          </div>
          <div className="step-item reveal" style={{ "--step-color": "#8B5CF6", "--step-bg": "#F5F3FF" }}>
            <div className="step-num">04</div>
            <div className="step-icon">🎉</div>
            <div className="step-content">
              <h3>Resmi Bergabung</h3>
              <p>Selamat! Kamu kini resmi menjadi bagian dari keluarga besar organisasi dan siap berkarya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BANNER ═══ */}
      <div className="stats-banner">
        <div className="stats-grid">
          <div className="stats-item reveal">
            <Counter target={4} suffix="" />
            <div className="big-label">Himpunan Mahasiswa (HIMA)</div>
          </div>
          <div className="stats-item reveal">
            <Counter target={12} suffix="" />
            <div className="big-label">Unit Kegiatan Mahasiswa (UKM)</div>
          </div>
          <div className="stats-item reveal">
            <Counter target={200} suffix="+" />
            <div className="big-label">Anggota Aktif</div>
          </div>
          <div className="stats-item reveal">
            <Counter target={50} suffix="+" />
            <div className="big-label">Event per Tahun</div>
          </div>
        </div>
      </div>

      {/* ═══ FAQ ═══ */}
      <section className="faq-section" id="faq">
        <div className="section-header reveal">
          <div className="section-tag">❓ Pertanyaan Umum</div>
          <h2 className="section-title">Sering <span style={{ color: "var(--primary)" }}>Ditanyakan</span></h2>
          <p className="section-subtitle">Menjawab segala keraguanmu sebelum melangkah lebih jauh.</p>
        </div>

        <div className="faq-container reveal">
          {faqs.map((faq, index) => {
            const isActive = faqActiveIndex === index;
            return (
              <div key={index} className={`faq-item ${isActive ? "active" : ""}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <div className="faq-icon">{isActive ? "-" : "+"}</div>
                </div>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isActive ? "200px" : "0px",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden"
                  }}
                >
                  <p style={{ padding: "1.2rem 1.5rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.7" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ CONTACT/CTA ═══ */}
      <section className="cta-section" id="contact">
        <div className="cta-box-full reveal">
          <div className="cta-content">
            <div className="section-tag" style={{ marginBottom: ".5rem" }}>📞 Hubungi Kami</div>
            <h2>Punya Pertanyaan <span style={{ color: "var(--primary)" }}>Lainnya?</span></h2>
            <p>Tim admin KKGConnect siap membantu menjawab keraguanmu seputar pendaftaran HIMA &amp; UKM.</p>
            <div className="cta-actions">
              <Link href="/kontak" className="btn-primary">💬 Hubungi Admin</Link>
              <Link href="/hima" className="btn-outline-dark">🏛️ Jelajahi HIMA</Link>
              <Link href="/ukm" className="btn-outline-dark">🎯 Jelajahi UKM</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
