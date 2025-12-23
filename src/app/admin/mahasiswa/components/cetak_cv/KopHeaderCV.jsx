"use client";

import { useEffect, useState } from "react";

export default function KopHeaderCV({ biodata }) {
  if (!biodata) return null;

  const { nama_mhs, email, tlp_saya, foto_file_id } = biodata;

  // ✅ FIX: JANGAN DOUBLE /api
  const baseFotoUrl = foto_file_id
    ? `/api/proxy/mahasiswa/foto/${foto_file_id}`
    : null;

  const [fotoSrc, setFotoSrc] = useState(baseFotoUrl);

  useEffect(() => {
    if (baseFotoUrl) {
      setFotoSrc(`${baseFotoUrl}?t=${Date.now()}`);
    }
  }, [baseFotoUrl]);

  return (
    <>
      <div className="kop-header">
        <img src="/images/kop2.png" className="kop-img" alt="Kop Surat" />
      </div>

      <div className="profile-header flex items-start gap-6 no-break mt-4">
        <div className="w-[100px] h-[130px] border border-gray-400 rounded-md overflow-hidden bg-white flex items-center justify-center">
          {fotoSrc ? (
            <img
              src={fotoSrc}
              className="w-full h-full object-cover"
              alt={`Foto ${nama_mhs}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  nama_mhs || "Mahasiswa"
                )}`;
              }}
            />
          ) : (
            <div className="text-gray-400 text-xs">No Photo</div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-[22px] font-bold text-gray-800 mb-2">
            {nama_mhs || "-"}
          </h1>

          <div className="space-y-1 text-[13px] text-gray-700">
            {email && <p>Email: {email}</p>}
            {tlp_saya && <p>Telp: {tlp_saya}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
