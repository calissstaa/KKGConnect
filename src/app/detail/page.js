"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import data from "@/data.json";

function DetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type") || "ukm";
  const id = searchParams.get("id") || "";

  // Find the item in data
  const itemsList = data[type] || [];
  const item = itemsList.find((obj) => obj.name === id);

  useEffect(() => {
    if (!item) {
      router.push("/");
    }
  }, [item, router]);

  if (!item) {
    return <div style={{ padding: "10rem 5%", textAlign: "center" }}>Mengalihkan...</div>;
  }

  const getImagePath = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80";
    if (path.startsWith("images/")) {
      return "/" + path;
    }
    return path;
  };

  return (
    <div>
      <div style={{ marginTop: "80px", background: "var(--bg)", padding: "1rem 5%", borderBottom: "1px solid var(--border)" }}>
        <Link href={`/${type}`} style={{ textDecoration: "none", color: "var(--primary)", fontWeight: "600", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ← Kembali ke Daftar {type.toUpperCase()}
        </Link>
      </div>

      <section className="detail-hero">
        <div 
          className="detail-hero-bg" 
          style={{ 
            backgroundImage: `url(${getImagePath(item.cover_image)})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            inset: 0,
            zIndex: -2
          }}
        ></div>
        <div className="detail-hero-overlay"></div>
        <div style={{ zIndex: 1, display: "flex", alignItems: "center", gap: "2rem", width: "100%" }}>
          <div style={{ width: "120px", height: "120px", background: "#fff", borderRadius: "24px", padding: "1rem", flexShrink: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
            <img src={getImagePath(item.image)} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <div className="section-tag" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "none" }}>
              {item.category}
            </div>
            <h1 style={{ fontSize: "2.8rem", marginTop: ".5rem", textShadow: "0 2px 10px rgba(0,0,0,0.3)", color: "#fff" }}>
              {item.name}
            </h1>
          </div>
        </div>
      </section>

      <div className="detail-container">
        <main className="detail-main">
          {/* Deskripsi Section */}
          <section className="detail-section" style={{ marginBottom: "2rem" }}>
            <h2 className="section-title-alt">📝 Deskripsi</h2>
            <div style={{ lineHeight: 1.7, color: "var(--text-muted)", fontSize: "1rem", whiteSpace: "pre-line" }}>
              {item.description}
            </div>
          </section>

          {/* Visi & Misi Section */}
          <section className="detail-section" style={{ marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              <div>
                <h3 className="section-title-alt">👁️ Visi</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {item.vision || "-"}
                </p>
              </div>
              <div>
                <h3 className="section-title-alt">🚀 Misi</h3>
                <ul className="mission-list">
                  {item.mission && item.mission.map((m, index) => (
                    <li key={index}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Kegiatan Section */}
          <section className="detail-section">
            <h3 className="section-title-alt">📅 Kegiatan &amp; Proker</h3>
            <div className="event-grid">
              {item.events && item.events.map((event, index) => (
                <div key={index} className="event-card">
                  <div className="event-img">
                    <img src={getImagePath(event.image)} alt={event.title} />
                  </div>
                  <div className="event-body">
                    <h4>{event.title}</h4>
                    <span>🗓️ {event.date} • {event.type || "Event"}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="detail-sidebar">
          <div className="info-card">
            <h4 style={{ fontFamily: "'Outfit',sans-serif", marginBottom: "1.5rem", color: "var(--primary)" }}>
              ℹ️ Informasi Umum
            </h4>

            <div className="info-item">
              <div className="info-icon">👨‍💼</div>
              <div className="info-text">
                <div>Ketua / Leader</div>
                <div>{item.leader || "-"}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">👥</div>
              <div className="info-text">
                <div>Jumlah Anggota</div>
                <div>{item.members || "?"} Mahasiswa</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🕒</div>
              <div className="info-text">
                <div>Jadwal Rutin</div>
                <div>{item.schedule || "-"}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                <div>Lokasi</div>
                <div>{item.location || "-"}</div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📸</div>
              <div className="info-text">
                <div>Instagram</div>
                <div>
                  {item.instagram ? (
                    <a href={`https://instagram.com/${item.instagram}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 700 }}>
                      @{item.instagram}
                    </a>
                  ) : "-"}
                </div>
              </div>
            </div>

            <a href={item.link || "#"} className="btn-primary" style={{ width: "100%", marginTop: "1.5rem", textAlign: "center", justifyContent: "center", display: "flex" }}>
              Daftar Sekarang
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div style={{ padding: "10rem 5%", textAlign: "center" }}>Loading Detail Page...</div>}>
      <DetailContent />
    </Suspense>
  );
}
