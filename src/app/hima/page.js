"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import data from "@/data.json";

function HimaContent() {
  const himaList = data.hima || [];
  const searchParams = useSearchParams();
  const [selectedFak, setSelectedFak] = useState("all");

  useEffect(() => {
    const fak = searchParams.get("fak") || "all";
    setSelectedFak(fak.toLowerCase());
  }, [searchParams]);

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
  }, [selectedFak]); // Re-observe when filter changes and cards re-render

  const faculties = [
    { key: "all", label: "📚 Semua" },
    { key: "ilmu komunikasi", label: "🌍 Ilmu Komunikasi" },
    { key: "administrasi bisnis", label: "💼 Administrasi Bisnis" },
    { key: "akuntansi", label: "⚖️ Akuntansi" },
    { key: "manajemen", label: "📊 Manajemen" },
    { key: "siti", label: "💻 SITI" }
  ];

  const getBadgeStyle = (category) => {
    const key = category.toLowerCase();
    if (key.includes("komunikasi")) return { backgroundColor: "rgba(139,92,246,.15)", color: "#C4B5FD" };
    if (key.includes("bisnis")) return { backgroundColor: "rgba(245,158,11,.15)", color: "#FCD34D" };
    if (key.includes("akuntansi") || key.includes("akuntan")) return { backgroundColor: "rgba(245,158,11,.15)", color: "#FCD34D" };
    if (key.includes("manajemen")) return { backgroundColor: "rgba(16,185,129,.15)", color: "#6EE7B7" };
    if (key.includes("siti")) return { backgroundColor: "rgba(59,130,246,.15)", color: "#93C5FD" };
    return { backgroundColor: "rgba(107,114,128,.15)", color: "#9CA3AF" };
  };

  const filteredHima = himaList.filter((hima) => {
    if (selectedFak === "all") return true;
    return hima.category.toLowerCase() === selectedFak;
  });

  const getImagePath = (path) => {
    if (path.startsWith("images/")) {
      return "/" + path;
    }
    return path;
  };

  return (
    <div>
      <div className="page-header" style={{ background: "linear-gradient(135deg,#0F1E4A,#1A3A7A,#0D2461)" }}>
        <div className="section-tag" style={{ background: "rgba(255,255,255,.15)", color: "#DBEAFE", borderColor: "rgba(255,255,255,.25)" }}>
          🏛️ Direktori HIMA
        </div>
        <h1>Daftar <span style={{ color: "#93C5FD" }}>Himpunan Mahasiswa</span></h1>
        <p>Temukan himpunan mahasiswa sesuai program studimu. Aktif di HIMA untuk kumpulkan poin SKKM dan perluas jaringan akademikmu.</p>
      </div>

      <section style={{ padding: "3rem 5%", background: "var(--bg)" }}>
        <div className="filter-bar" id="himaFilter">
          {faculties.map((fac) => (
            <button
              key={fac.key}
              className={`filter-btn ${selectedFak === fac.key ? "active" : ""}`}
              onClick={() => setSelectedFak(fac.key)}
            >
              {fac.label}
            </button>
          ))}
        </div>

        <div className="ukm-list-grid" id="himaGrid">
          {filteredHima.map((hima, index) => {
            const truncatedDesc = hima.description.length > 240 ? hima.description.substring(0, 240) + "..." : hima.description;
            return (
              <div key={index} className="ukm-list-card reveal" data-fak={hima.category.toLowerCase()}>
                <div className="ukm-list-top">
                  <div className="ukm-list-emoji">
                    <img src={getImagePath(hima.image)} alt={hima.name} />
                  </div>
                  <div className="ukm-list-info">
                    <h3>{hima.name}</h3>
                    <span className="ukm-list-badge" style={getBadgeStyle(hima.category)}>
                      {hima.category}
                    </span>
                  </div>
                </div>
                <p>{truncatedDesc}</p>
                <div className="card-footer">
                  <span className="members-count">👥 {hima.members} anggota</span>
                  <Link href={`/detail?type=hima&id=${encodeURIComponent(hima.name)}`} className="join-mini-btn">
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info SKKM Banner */}
        <div
          style={{
            marginTop: "3rem",
            background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)",
            border: "1px solid var(--border-blue)",
            borderRadius: "var(--radius)",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap"
          }}
        >
          <div style={{ fontSize: "2.5rem" }}>📋</div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h4 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, color: "var(--primary)", marginBottom: ".3rem" }}>
              Info Poin SKKM
            </h4>
            <p style={{ fontSize: ".88rem", color: "var(--text-muted)" }}>
              Setiap kegiatan resmi HIMA memberikan poin SKKM yang diakui oleh kampus. Minimal poin SKKM dibutuhkan untuk mendaftar yudisium
              dan kelulusan. Aktif di HIMA = investasi akademikmu!
            </p>
          </div>
          <a href="#" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
            Daftar &amp; Mulai Kumpulkan
          </a>
        </div>
      </section>
    </div>
  );
}

export default function HimaPage() {
  return (
    <Suspense fallback={<div>Loading HIMA Directory...</div>}>
      <HimaContent />
    </Suspense>
  );
}
