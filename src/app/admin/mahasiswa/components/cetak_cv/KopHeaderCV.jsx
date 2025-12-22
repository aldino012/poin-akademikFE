"use client";

import { useEffect, useState } from "react";

export default function KopHeaderCV({ biodata }) {
  if (!biodata) return null;

  const { nama_mhs, email, tlp_saya, foto_file_id } = biodata;

  // ✅ WAJIB: lewat Next.js proxy
  const baseFotoUrl = foto_file_id
    ? `/api/proxy/api/mahasiswa/foto/${foto_file_id}`
    : null;

  const [fotoSrc, setFotoSrc] = useState(baseFotoUrl);

  useEffect(() => {
    if (baseFotoUrl) {
      // cache buster supaya foto update
      setFotoSrc(`${baseFotoUrl}?t=${Date.now()}`);
    }
  }, [baseFotoUrl]);

  return (
    <>
      <div className="kop-header">
        <img src="/images/kop2.png" className="kop-img" alt="Kop Surat" />
      </div>

      <div className="profile-header flex items-start gap-6 no-break mt-4">
        <div className="w-[100px] h-[130px] border border-gray-400 flex-shrink-0 rounded-md overflow-hidden shadow-sm bg-white flex items-center justify-center">
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
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center px-2">
              No Photo
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-[22px] font-bold text-gray-800 mb-2 leading-tight">
            <i className="fas fa-user-graduate text-purple-600 mr-2"></i>
            {nama_mhs || "-"}
          </h1>

          <div className="space-y-1 text-[13px] text-gray-700">
            {email && (
              <p>
                <i className="fas fa-envelope mr-2 text-blue-500"></i>
                <b>Email:</b> {email}
              </p>
            )}
            {tlp_saya && (
              <p>
                <i className="fas fa-phone mr-2 text-green-600"></i>
                <b>Telp:</b> {tlp_saya}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
