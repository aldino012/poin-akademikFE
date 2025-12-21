"use client";
import { useState, useEffect } from "react";

export default function useMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5050/api/mahasiswa/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Gagal mengambil data mahasiswa");

        const data = await res.json();
        setMahasiswa(data.data);
      } catch (err) {
        console.error(err);
        setMahasiswa(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { mahasiswa, loading };
}
