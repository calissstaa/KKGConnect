"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import data from "@/data.json";

function UkmContent() {
  const ukmList = data.ukm || [];
  const searchParams = useSearchParams();
  const [selectedCat, setSelectedCat] = useState("all");

  useEffect(() => {
    const cat = searchParams.get("cat") || "all";
    setSelectedCat(cat.toLowerCase());
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
  }, [selectedCat]); // Re-observe when filter changes and cards re-render

  const categories = [
    { key: "all", label: "🔍 Semua" },
    { key: "olahraga", label: "⚽ Olahraga" },
    { key: "minat dan bakat", label: "🎨 Minat & Bakat" },
    { key: "penalaran dan kreativitas", label: "🔬 Penalaran & Kreativitas" },
    { key: "kerohanian, kemasyarakatan dan sosial", label: "🕌 Kerohanian & Sosial" }
  ];

  const getBadgeStyle = (category) => {
    const key = category.toLowerCase();
    if (key.includes("olahraga")) return { backgroundColor: "rgba(239,68,68,.15)", color: "#F87171" };
    if (key.includes("minat")) return { backgroundColor: "rgba(59,130,246,.15)", color: "#93C5FD" };
    if (key.includes("kerohanian")) return { backgroundColor: "rgba(245,158,11,.15)", color: "#FCD34D" };
    if (key.includes("penalaran")) return { backgroundColor: "rgba(59,130,246,.15)", color: "#93C5FD" };
    return { backgroundColor: "rgba(16,185,129,.15)", color: "#6EE7B7" };
  };

  const filteredUkm = ukmList.filter((ukm) => {
    if (selectedCat === "all") return true;
    return ukm.category.toLowerCase() === selectedCat;
  });

  const getImagePath = (path) => {
    if (path.startsWith("images/")) {
      return "/" + path;
    }
    return path;
  };

  return (
    <div>
      <div className="page-header">
        <div className="section-tag" style={{ background: "rgba(255,255,255,.15)", color: "#DBEAFE", borderColor: "rgba(255,255,255,.25)" }}>
          🗂️ Direktori UKM
        </div>
        <h1>Semua Unit <span style={{ color: "#93C5FD" }}>Kegiatan Mahasiswa</span></h1>
        <p>Filter berdasarkan kategori dan temukan UKM yang paling sesuai dengan minat dan bakatmu.</p>
      </div>

      <section style={{ padding: "3rem 5%", background: "var(--bg)" }}>
        <div className="filter-bar" id="filterBar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${selectedCat === cat.key ? "active" : ""}`}
              onClick={() => setSelectedCat(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="ukm-list-grid" id="ukmGrid">
          {filteredUkm.map((ukm, index) => {
            const truncatedDesc = ukm.description.length > 240 ? ukm.description.substring(0, 240) + "..." : ukm.description;
            return (
              <div key={index} className="ukm-list-card reveal" data-cat={ukm.category.toLowerCase()}>
                <div className="ukm-list-top">
                  <div className="ukm-list-emoji">
                    <img src={getImagePath(ukm.image)} alt={ukm.name} />
                  </div>
                  <div className="ukm-list-info">
                    <h3>{ukm.name}</h3>
                    <span className="ukm-list-badge" style={getBadgeStyle(ukm.category)}>
                      {ukm.category}
                    </span>
                  </div>
                </div>
                <p>{truncatedDesc}</p>
                <div className="card-footer">
                  <span className="members-count">👥 {ukm.members} anggota</span>
                  <Link href={`/detail?type=ukm&id=${encodeURIComponent(ukm.name)}`} className="join-mini-btn">
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function UkmPage() {
  return (
    <Suspense fallback={<div>Loading UKM Directory...</div>}>
      <UkmContent />
    </Suspense>
  );
}
