"use client";

export default function BiodataCV({ biodata }) {
  if (!biodata) return null;

  const { alamat, ttl, prodi } = biodata;

  return (
    <div className="no-break section-gap">
      <h2>
        <span className="section-icon">
          <i className="fas fa-id-card"></i>
        </span>
        Biodata
      </h2>

      {/* ================= ALAMAT ================= */}
      {alamat && (
        <div className="biodata-item">
          <i className="fas fa-map-marker-alt biodata-icon"></i>
          <p className="text-sm flex-1">
            <b>Alamat:</b> {alamat}
          </p>
        </div>
      )}

      {/* ================= TTL ================= */}
      <div className="biodata-item">
        <i className="fas fa-calendar-alt biodata-icon"></i>
        <p className="text-sm flex-1">
          <b>TTL:</b> {ttl || "-"}
        </p>
      </div>

      {/* ================= JURUSAN ================= */}
      {prodi && (
        <div className="biodata-item">
          <i className="fas fa-graduation-cap biodata-icon"></i>
          <p className="text-sm flex-1">
            <b>Jurusan:</b> {prodi}
          </p>
        </div>
      )}
    </div>
  );
}
