import CetakCVparent from "@/app/admin/mahasiswa/components/cetak_cv/CetakCVparent";

/* ================= METADATA ================= */
export async function generateMetadata({ params }) {
  const { id } = await params; // ✅ WAJIB AWAIT

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mahasiswa/cv/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return { title: "CV_Mahasiswa" };
    }

    const data = await res.json();
    const mhs = data.biodata;

    const nim = mhs.nim || "NIM";
    const nama = (mhs.nama_mhs || "MAHASISWA")
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");

    return {
      title: `CV_${nim}_${nama}`,
    };
  } catch {
    return { title: "CV_Mahasiswa" };
  }
}

/* ================= PAGE ================= */
export default async function Page({ params }) {
  const { id } = await params; // ✅ WAJIB AWAIT

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/mahasiswa/cv/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-10 text-center text-gray-600">
        Data CV tidak ditemukan
      </div>
    );
  }

  const data = await res.json();

  return (
    <CetakCVparent
      biodata={data.biodata}
      organisasi={data.organisasi}
      prestasi={data.prestasi}
    />
  );
}
