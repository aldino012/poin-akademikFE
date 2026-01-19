"use client";

export default function OrganisasiCV({ organisasi = [] }) {
  // ================= JIKA KOSONG =================
  if (!organisasi.length) {
    return (
      <div className="section-gap">
        <h2 className="no-break">
          <span className="section-icon">
            <i className="fas fa-users"></i>
          </span>
          Pengalaman Organisasi
        </h2>

        <p className="text-sm italic text-gray-500 mt-2">
          Tidak memiliki pengalaman organisasi.
        </p>
      </div>
    );
  }

  // ================= BAGI 2 KOLOM =================
  const mid = Math.ceil(organisasi.length / 2);
  const kolomKiri = organisasi.slice(0, mid);
  const kolomKanan = organisasi.slice(mid);

  // ================= FORMAT TAHUN =================
  const formatTahun = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d) ? "" : d.getFullYear();
  };

  // ================= RENDER =================
  const renderItem = (item, idx) => {
    const judul =
      item.rincianAcara || item.namaKegiatan || "Kegiatan Organisasi";

    const tahun = formatTahun(item.tanggal);

    return (
      <li key={idx} className="mb-1">
        {/* 🔑 JUDUL UTAMA */}
        <b>{judul}</b>

        {/* POSISI */}
        {item.posisi && <span className="text-gray-700"> — {item.posisi}</span>}

        {/* TAHUN */}
        {tahun && <span className="text-gray-500 text-sm"> ({tahun})</span>}
      </li>
    );
  };

  return (
    <div className="section-gap">
      <h2 className="no-break">
        <span className="section-icon">
          <i className="fas fa-users"></i>
        </span>
        Pengalaman Organisasi
      </h2>

      <div className="two-columns-grid">
        {/* ================= KOLOM KIRI ================= */}
        <ul>{kolomKiri.map(renderItem)}</ul>

        {/* ================= KOLOM KANAN ================= */}
        <ul>{kolomKanan.map(renderItem)}</ul>
      </div>
    </div>
  );
}
