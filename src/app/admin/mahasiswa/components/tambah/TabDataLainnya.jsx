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

  // Validasi Tahun Lulus (hanya angka, maksimal 4 digit)
  const validateTahunLulus = (e) => {
    const value = e.target.value;

    // Hanya angka
    const numericValue = value.replace(/\D/g, "");

    // Batasi maksimal 4 digit (tahun)
    const limitedValue = numericValue.slice(0, 4);

    // Update form
    handleChange({
      target: { name: "thn_lulus", value: limitedValue },
    });
  };

  // Validasi Telepon Saya (hanya angka)
  const validateTeleponSaya = (e) => {
    const value = e.target.value;

    // Hanya angka
    const numericValue = value.replace(/\D/g, "");

    // Update form
    handleChange({
      target: { name: "tlp_saya", value: numericValue },
    });
  };

  // Validasi Telepon Rumah (hanya angka)
  const validateTeleponRumah = (e) => {
    const value = e.target.value;

    // Hanya angka
    const numericValue = value.replace(/\D/g, "");

    // Update form
    handleChange({
      target: { name: "tlp_rumah", value: numericValue },
    });
  };

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
                  errors.pekerjaan
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
              className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow text-sm hover:bg-blue-700 transition-colors"
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
                  errors.asal_sekolah
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
              className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow text-sm hover:bg-blue-700 transition-colors"
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
            onChange={validateTahunLulus}
            placeholder="Contoh: 2021"
            autoComplete="off"
            maxLength="4"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.thn_lulus
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors
            `}
          />
          <div className="flex justify-between mt-1">
            {errors.thn_lulus ? (
              <p className="text-xs text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.thn_lulus}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Hanya angka (4 digit)
              </p>
            )}
            {form.thn_lulus && (
              <p className="text-xs text-gray-500">
                {form.thn_lulus.length}/4 digit
              </p>
            )}
          </div>
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
                  errors.jenis_kelamin
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm">+62</span>
            </div>
            <input
              type="text"
              name="tlp_saya"
              value={form.tlp_saya}
              onChange={validateTeleponSaya}
              placeholder="Contoh: 81234567890"
              autoComplete="off"
              className={`
                  w-full pl-12 px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                  ${
                    errors.tlp_saya
                      ? "border border-red-500 focus:ring-red-500"
                      : "border border-gray-300 focus:ring-blue-500"
                  }
                  transition-colors
              `}
            />
          </div>
          <div className="flex justify-between mt-1">
            {errors.tlp_saya ? (
              <p className="text-xs text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.tlp_saya}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Hanya angka (maksimal 15 digit)
              </p>
            )}
            {form.tlp_saya && (
              <p className="text-xs text-gray-500">
                {form.tlp_saya.length} digit
              </p>
            )}
          </div>
        </div>

        {/* Telepon Rumah */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-phone mr-1 text-blue-600"></i>
            Telepon Rumah
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm">+62</span>
            </div>
            <input
              type="text"
              name="tlp_rumah"
              value={form.tlp_rumah}
              onChange={validateTeleponRumah}
              placeholder="Contoh: 0211234567"
              autoComplete="off"
              className={`
                  w-full pl-12 px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                  ${
                    errors.tlp_rumah
                      ? "border border-red-500 focus:ring-red-500"
                      : "border border-gray-300 focus:ring-blue-500"
                  }
                  transition-colors
              `}
            />
          </div>
          <div className="flex justify-between mt-1">
            {errors.tlp_rumah ? (
              <p className="text-xs text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.tlp_rumah}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Hanya angka (maksimal 15 digit)
              </p>
            )}
            {form.tlp_rumah && (
              <p className="text-xs text-gray-500">
                {form.tlp_rumah.length} digit
              </p>
            )}
          </div>
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
            placeholder="Contoh: JL. SUDIRMAN NO. 123, KELURAHAN MENTENG, KECAMATAN MENTENG, JAKARTA PUSAT"
            autoComplete="off"
            className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.alamat
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
            style={{ textTransform: "uppercase" }}
          ></textarea>
          <div className="flex justify-between mt-1">
            {errors.alamat && (
              <p className="text-xs text-red-600">
                <i className="fas fa-exclamation-circle mr-1"></i>
                {errors.alamat}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {form.alamat ? form.alamat.length : 0} karakter
            </p>
          </div>
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
          setIsChildModalOpen={setIsChildModalOpen}
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
          setIsChildModalOpen={setIsChildModalOpen}
        />
      )}
    </>
  );
}
