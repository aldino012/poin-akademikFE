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
    return new Date(dateStr).getFullYear();
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
        <ul>
          {kolomKiri.map((item, idx) => (
            <li key={idx}>
              <b>{item.posisi || item.namaKegiatan}</b>
              {item.tingkat && ` – ${item.tingkat}`}
              {item.tanggal && ` (${formatTahun(item.tanggal)})`}
            </li>
          ))}
        </ul>

        {/* ================= KOLOM KANAN ================= */}
        <ul>
          {kolomKanan.map((item, idx) => (
            <li key={idx}>
              <b>{item.posisi || item.namaKegiatan}</b>
              {item.tingkat && ` – ${item.tingkat}`}
              {item.tanggal && ` (${formatTahun(item.tanggal)})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
