import React, { useState, useEffect } from "react";
import pekerjaanData from "@/data/pekerjaan.json";
import asalSekolahData from "@/data/asal_sekolah.json";
import ModalTambah from "./ModalTambah";

export default function TabDataLainnya({
  form,
  handleChange,
  setIsChildModalOpen,
  errors = {},
}) {
  const [pekerjaanList, setPekerjaanList] = useState([]);
  const [asalSekolahList, setAsalSekolahList] = useState([]);

  const [showPekerjaanModal, setShowPekerjaanModal] = useState(false);
  const [showSekolahModal, setShowSekolahModal] = useState(false);

  const [newPekerjaan, setNewPekerjaan] = useState("");
  const [newSekolah, setNewSekolah] = useState("");

  useEffect(() => {
    setPekerjaanList(pekerjaanData.items || []);
    setAsalSekolahList(asalSekolahData.items || []);
  }, []);

  const tambahPekerjaan = () => {
    if (!newPekerjaan.trim()) return;

    const upper = newPekerjaan.toUpperCase();
    setPekerjaanList((prev) => [...prev, upper]);

    handleChange({ target: { name: "pekerjaan", value: upper } });

    setNewPekerjaan("");
    setShowPekerjaanModal(false);
  };

  const tambahSekolah = () => {
    if (!newSekolah.trim()) return;

    const upper = newSekolah.toUpperCase();
    setAsalSekolahList((prev) => [...prev, upper]);

    handleChange({ target: { name: "asal_sekolah", value: upper } });

    setNewSekolah("");
    setShowSekolahModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PEKERJAAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-briefcase mr-1 text-blue-600"></i>
            Pekerjaan
          </label>

          <div className="flex gap-2">
            <select
              name="pekerjaan"
              value={form.pekerjaan}
              onChange={handleChange}
              className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            >
              <option value="">-- Pilih Pekerjaan --</option>

              {pekerjaanList.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowPekerjaanModal(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow text-sm hover:bg-blue-700"
            >
              +
            </button>
          </div>
          {errors.pekerjaan && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.pekerjaan}
            </p>
          )}
        </div>

        {/* ASAL SEKOLAH */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-school mr-1 text-blue-600"></i>
            Asal Sekolah
          </label>

          <div className="flex gap-2">
            <select
              name="asal_sekolah"
              value={form.asal_sekolah}
              onChange={handleChange}
              className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            >
              <option value="">-- Pilih Asal Sekolah --</option>

              {asalSekolahList.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowSekolahModal(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow text-sm hover:bg-blue-700"
            >
              +
            </button>
          </div>
          {errors.asal_sekolah && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.asal_sekolah}
            </p>
          )}
        </div>

        {/* Tahun Lulus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-calendar-check mr-1 text-blue-600"></i>
            Tahun Lulus
          </label>
          <input
            type="text"
            name="thn_lulus"
            value={form.thn_lulus}
            onChange={handleChange}
            placeholder="2021"
            autoComplete="off"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            style={{ textTransform: "uppercase" }}
          />
          {errors.thn_lulus && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.thn_lulus}
            </p>
          )}
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-user-check mr-1 text-blue-600"></i>
            Jenis Kelamin
          </label>
          <select
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
          >
            <option value="">-- Pilih --</option>
            <option value="L">LAKI-LAKI</option>
            <option value="P">PEREMPUAN</option>
          </select>
          {errors.jenis_kelamin && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.jenis_kelamin}
            </p>
          )}
        </div>

        {/* Telepon Saya */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-mobile-alt mr-1 text-blue-600"></i>
            Telepon Saya
          </label>
          <input
            type="text"
            name="tlp_saya"
            value={form.tlp_saya}
            onChange={handleChange}
            autoComplete="off"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            style={{ textTransform: "uppercase" }}
          />
          {errors.tlp_saya && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.tlp_saya}
            </p>
          )}
        </div>

        {/* Telepon Rumah */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-phone mr-1 text-blue-600"></i>
            Telepon Rumah
          </label>
          <input
            type="text"
            name="tlp_rumah"
            value={form.tlp_rumah}
            onChange={handleChange}
            autoComplete="off"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            style={{ textTransform: "uppercase" }}
          />
          {errors.tlp_rumah && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.tlp_rumah}
            </p>
          )}
        </div>

        {/* Alamat */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-map-marker-alt mr-1 text-blue-600"></i>
            Alamat
          </label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            rows="3"
            autoComplete="off"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            style={{ textTransform: "uppercase" }}
          ></textarea>
          {errors.alamat && (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.alamat}
            </p>
          )}
        </div>
      </div>

      {/* MODAL PEKERJAAN */}
      {showPekerjaanModal && (
        <ModalTambah
          isOpen={showPekerjaanModal}
          onClose={() => setShowPekerjaanModal(false)}
          title="Tambah Pekerjaan Baru"
          value={newPekerjaan}
          setValue={setNewPekerjaan}
          placeholder="Contoh: BARISTA"
          onSubmit={tambahPekerjaan}
          setIsChildModalOpen={setIsChildModalOpen} // 🔥 WAJIB
        />
      )}

      {/* MODAL SEKOLAH */}
      {showSekolahModal && (
        <ModalTambah
          isOpen={showSekolahModal}
          onClose={() => setShowSekolahModal(false)}
          title="Tambah Asal Sekolah Baru"
          value={newSekolah}
          setValue={setNewSekolah}
          placeholder="Contoh: SMKN 1 BANYUWANGI"
          onSubmit={tambahSekolah}
          setIsChildModalOpen={setIsChildModalOpen} // 🔥 WAJIB
        />
      )}
    </>
  );
}
