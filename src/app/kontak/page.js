"use client";

import { useState, useEffect } from "react";

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="section-tag" style={{ background: "rgba(255,255,255,.15)", color: "#DBEAFE", borderColor: "rgba(255,255,255,.25)" }}>
          📬 Layanan Bantuan
        </div>
        <h1>Hubungi <span style={{ color: "#93C5FD" }}>Admin</span> KKGConnect</h1>
        <p>Ada kendala atau pertanyaan mengenai pendaftaran HIMA &amp; UKM? Tim admin kami siap membantu kamu.</p>
      </div>

      {/* CONTACT GRID */}
      <section style={{ padding: "4rem 5%", background: "var(--bg3)" }}>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-tag">📍 Info Admin</div>
            <h2>Bantuan <span style={{ color: "#F59E0B" }}>Cepat</span></h2>
            <p>Hubungi admin pusat untuk bantuan teknis atau informasi umum seputar kegiatan mahasiswa di lingkungan kampus.</p>
            
            <div className="contact-items">
              <div className="contact-item">
                <div className="ci-icon">📍</div>
                <div>
                  <div className="ci-label">Lokasi Kantor Admin</div>
                  <div className="ci-value">Gedung Student Center Lt. 2, Kampus Pusat</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon">📞</div>
                <div>
                  <div className="ci-label">WhatsApp Admin</div>
                  <div className="ci-value">+62 812-3456-7890</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon">✉️</div>
                <div>
                  <div className="ci-label">Email Support</div>
                  <div className="ci-value">admin@kkgconnect.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon">🕐</div>
                <div>
                  <div className="ci-label">Respon Admin</div>
                  <div className="ci-value">Senin–Jumat, 08.00–16.00 WIB</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", marginBottom: "1rem", color: "var(--text)" }}>Media Sosial</h4>
              <div className="footer-social">
                <a href="#" className="social-btn" title="Facebook">📘</a>
                <a href="#" className="social-btn" title="Instagram">📸</a>
                <a href="#" className="social-btn" title="Twitter">🐦</a>
                <a href="#" className="social-btn" title="YouTube">▶️</a>
              </div>
            </div>
          </div>

          <div className="contact-form reveal">
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.5rem", color: "var(--text)" }}>
              ✉️ Kirim Pesan ke Admin
            </h3>
            
            {!isSubmitted ? (
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nama">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama kamu"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@gmail.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subjek">Subjek *</label>
                    <input
                      type="text"
                      id="subjek"
                      name="subjek"
                      value={formData.subjek}
                      onChange={handleChange}
                      placeholder="Contoh: Masalah Login"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pesan">Pesan atau Pertanyaan *</label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows="5"
                    value={formData.pesan}
                    onChange={handleChange}
                    placeholder="Jelaskan secara detail apa yang bisa kami bantu..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                  🚀 Kirim Pesan
                </button>
              </form>
            ) : (
              <div
                id="successMsg"
                style={{
                  display: "block",
                  padding: "1.2rem",
                  background: "rgba(16,185,129,.15)",
                  border: "1px solid rgba(16,185,129,.3)",
                  borderRadius: "12px",
                  textAlign: "center",
                  color: "#059669",
                  fontWeight: 600
                }}
              >
                ✅ Pesan Berhasil Terkirim!<br />Admin akan segera merespons melalui email kamu.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section style={{ padding: "0 5% 4rem", background: "var(--bg3)" }}>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "3rem", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🗺️</div>
          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, marginBottom: ".5rem", color: "var(--text)" }}>
            Lokasi Pusat Sekretariat
          </h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontWeight: 500 }}>
            Gedung Student Center Lantai 2 — Kampus Pusat IBI Kwik Kian Gie
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-block", fontWeight: 700 }}>
            📍 Buka di Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
