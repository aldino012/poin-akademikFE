"use client";

export default function PrestasiCV({ prestasi = [] }) {
  // ================= JIKA KOSONG =================
  if (!prestasi.length) {
    return (
      <div className="section-gap">
        <h2 className="no-break">
          <span className="section-icon">
            <i className="fas fa-trophy"></i>
          </span>
          Prestasi
        </h2>

        <p className="text-sm italic text-gray-500 mt-2">
          Belum memiliki prestasi.
        </p>
      </div>
    );
  }

  // ================= BAGI 2 KOLOM =================
  const mid = Math.ceil(prestasi.length / 2);
  const kolomKiri = prestasi.slice(0, mid);
  const kolomKanan = prestasi.slice(mid);

  // ================= FORMAT TAHUN =================
  const formatTahun = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d) ? "" : d.getFullYear();
  };

  // ================= RENDER ITEM =================
  const renderItem = (item, idx) => {
    const judul =
      item.rincianAcara || item.namaKegiatan || "Prestasi Mahasiswa";

    const tahun = formatTahun(item.tanggal);

    return (
      <li key={idx} className="mb-1">
        {/* 🔑 NAMA LOMBA / KOMPETISI */}
        <b>{judul}</b>

        {/* POSISI / JUARA */}
        {item.posisi && <span className="text-gray-700"> — {item.posisi}</span>}

        {/* TINGKAT */}
        {item.tingkat && (
          <span className="text-gray-600">, {item.tingkat}</span>
        )}

        {/* TAHUN */}
        {tahun && <span className="text-gray-500 text-sm"> ({tahun})</span>}
      </li>
    );
  };

  return (
    <div className="section-gap">
      <h2 className="no-break">
        <span className="section-icon">
          <i className="fas fa-trophy"></i>
        </span>
        Prestasi
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
