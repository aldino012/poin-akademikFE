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

  // ================= FORMAT TANGGAL =================
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).getFullYear();
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
        <ul>
          {kolomKiri.map((item, idx) => (
            <li key={idx}>
              <b>{item.namaKegiatan}</b>
              {item.posisi && ` – ${item.posisi}`}
              {item.tanggal && ` (${formatTanggal(item.tanggal)})`}
            </li>
          ))}
        </ul>

        {/* ================= KOLOM KANAN ================= */}
        <ul>
          {kolomKanan.map((item, idx) => (
            <li key={idx}>
              <b>{item.namaKegiatan}</b>
              {item.posisi && ` – ${item.posisi}`}
              {item.tanggal && ` (${formatTanggal(item.tanggal)})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
