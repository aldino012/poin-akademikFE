"use client";

export default function FooterCV({ biodata }) {
  // ================= FORMAT TANGGAL INDONESIA =================
  const formatTanggalIndonesia = (date = new Date()) => {
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const tgl = date.getDate();
    const bln = bulan[date.getMonth()];
    const thn = date.getFullYear();

    return `${tgl} ${bln} ${thn}`;
  };

  const today = formatTanggalIndonesia();

  return (
    <div className="closing-section" id="closingSection">
      {/* ================= TANGGAL ================= */}
      <div className="text-right mb-5 text-sm">Banyuwangi, {today}</div>

      {/* ================= TANDA TANGAN ================= */}
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="font-bold text-sm pb-2">Ketua STIKOM</th>
            <th className="font-bold text-sm pb-2">Kabag Kemahasiswaan</th>
            <th className="font-bold text-sm pb-2">Mahasiswa</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="sign-box">
                <img
                  src="/images/ketua_stamp.png"
                  className="stamp"
                  alt="Stempel Ketua"
                />
                <img
                  src="/images/ketua_ttd.png"
                  className="ttd"
                  alt="TTD Ketua"
                />
              </div>
            </td>

            <td>
              <div className="sign-box">
                <img
                  src="/images/kabag_stamp.png"
                  className="stamp"
                  alt="Stempel Kabag"
                />
                <img
                  src="/images/kabag_ttd.png"
                  className="ttd"
                  alt="TTD Kabag"
                />
              </div>
            </td>

            <td>
              <div className="sign-box"></div>
            </td>
          </tr>

          <tr>
            <td className="text-xs pt-2">
              <div className="signature-line">
                <b>Rachman Yulianto, M.Kom</b>
              </div>
            </td>

            <td className="text-xs pt-2">
              <div className="signature-line">
                <b>Abdul Haris, M.Kom</b>
              </div>
            </td>

            <td className="text-xs pt-2">
              <div className="signature-line">
                <b>{biodata?.nama_mhs || "Mahasiswa"}</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================= FOOTER IMAGE ================= */}
      <div className="footer-section">
        <img
          src="/images/footer.png"
          className="inline-block w-[55%]"
          alt="Footer"
        />
      </div>
    </div>
  );
}
