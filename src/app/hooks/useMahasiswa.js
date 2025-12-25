"use client";

import { useState, useEffect } from "react";
import api from "@/app/api/axios";

export default function useMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMahasiswa = async () => {
      try {
        const res = await api.get("/mahasiswa/me");

        if (isMounted) {
          setMahasiswa(res.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data mahasiswa:", err);
        if (isMounted) {
          setMahasiswa(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMahasiswa();

    return () => {
      isMounted = false;
    };
  }, []);

  return { mahasiswa, loading };
}
