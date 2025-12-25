import React, { useState, useEffect } from "react";

export default function TabDataPribadi({ form, handleChange, errors = {} }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  // Domain yang kamu inginkan
  const emailDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com",
    "@student.ac.id",
    "@campus.ac.id",
    "@mail.com",
    "@live.com",
  ];

  // Validasi NIM (8-12 digit)
  const validateNIM = (e) => {
    const value = e.target.value;
    // Hanya angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Batasi maksimal 12 digit
    const limitedValue = numericValue.slice(0, 12);

    handleChange({
      target: { name: "nim", value: limitedValue },
    });
  };

  // Validasi Angkatan (hanya angka tahun)
  const validateAngkatan = (e) => {
    const value = e.target.value;
    // Hanya angka
    const numericValue = value.replace(/[^0-9]/g, "");

    // Batasi maksimal 4 digit (untuk tahun)
    const limitedValue = numericValue.slice(0, 4);

    handleChange({
      target: { name: "angkatan", value: limitedValue },
    });
  };

  // Auto-suggest email di dalam input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleChange(e);

    // Jika belum ada "@", jangan tampilkan sugesti
    if (!value.includes("@")) {
      setEmailSuggestions([]);
      return;
    }

    const [username, domainPart] = value.split("@");

    // Jika user hanya mengetik "@"
    if (value.endsWith("@")) {
      setEmailSuggestions(emailDomains);
      return;
    }

    // Filter domain
    const filtered = emailDomains.filter((d) =>
      d.replace("@", "").toLowerCase().startsWith(domainPart.toLowerCase())
    );

    setEmailSuggestions(filtered);
  };

  const applySuggestion = (domain) => {
    const username = form.email.split("@")[0];
    const newEmail = username + domain;
    handleChange({
      target: { name: "email", value: newEmail },
    });
    setEmailSuggestions([]);
  };

  // Format tanggal untuk placeholder
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* NIM */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-id-card mr-1 text-blue-600"></i>
          NIM <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nim"
          value={form.nim}
          onChange={validateNIM}
          className={`
                w-full px-3 py-2 rounded-lg shadow-sm text-sm bg-white text-gray-900
                ${
                  errors.nim
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
            `}
          placeholder="Contoh: 12345678"
        />
        {errors.nim ? (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.nim}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            <i className="fas fa-info-circle mr-1"></i>
            Masukkan 8-12 digit NIM
          </p>
        )}
      </div>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user mr-1 text-blue-600"></i>
          Nama Mahasiswa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama_mhs"
          value={form.nama_mhs}
          onChange={handleChange}
          autoComplete="off"
          className={`
    w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
    ${
      errors.nama_mhs
        ? "border border-red-500 focus:ring-red-500"
        : "border border-gray-300 focus:ring-blue-500"
    }
    transition-colors uppercase-input
  `}
          placeholder="Contoh: ANDI PRASETYA"
          style={{ textTransform: "uppercase" }}
        />
        {errors.nama_mhs && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.nama_mhs}
          </p>
        )}
      </div>

      {/* Prodi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-graduation-cap mr-1 text-blue-600"></i>
          Prodi
        </label>
        <select
          name="prodi"
          value={form.prodi}
          onChange={handleChange}
          className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.prodi
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors
            `}
        >
          <option value="">Pilih Program Studi</option>
          <option value="S1">S1</option>
          <option value="D3">D3</option>
        </select>
        {errors.prodi && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.prodi}
          </p>
        )}
      </div>

      {/* Angkatan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-calendar-alt mr-1 text-blue-600"></i>
          Angkatan
        </label>
        <input
          type="text"
          name="angkatan"
          value={form.angkatan}
          onChange={validateAngkatan}
          className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.angkatan
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
          placeholder="Contoh: 2023"
          maxLength={4}
        />
        {errors.angkatan ? (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.angkatan}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            <i className="fas fa-info-circle mr-1"></i>
            Masukkan tahun angkatan (4 digit)
          </p>
        )}
      </div>

      {/* Tempat Lahir */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-map-marker-alt mr-1 text-blue-600"></i>
          Tempat Lahir
        </label>
        <input
          type="text"
          name="tempat_lahir"
          value={form.tempat_lahir}
          onChange={handleChange}
          className={`
                w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                ${
                  errors.tempat_lahir
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
                transition-colors uppercase-input
            `}
          placeholder="Contoh: JAKARTA"
          style={{ textTransform: "uppercase" }}
        />
        {errors.tempat_lahir && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.tempat_lahir}
          </p>
        )}
      </div>

      {/* Tanggal Lahir */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-birthday-cake mr-1 text-blue-600"></i>
          Tanggal Lahir
        </label>
        <input
          type="date"
          name="tgl_lahir"
          value={form.tgl_lahir}
          onChange={handleChange}
          className={`
      w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
      ${
        errors.tgl_lahir
          ? "border border-red-500 focus:ring-red-500"
          : "border border-gray-300 focus:ring-blue-500"
      }
      transition-colors
    `}
          max={getTodayDate()}
          style={{ color: "#000000" }} // Warna hitam untuk teks
        />
        <p className="text-xs text-gray-500 mt-1">
          <i className="fas fa-info-circle mr-1"></i>
          Format: DD/MM/YYYY
        </p>
        {errors.tgl_lahir && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.tgl_lahir}
          </p>
        )}
      </div>

      {/* EMAIL + AUTO-SUGGEST */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-envelope mr-1 text-blue-600"></i>
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleEmailChange}
            autoComplete="off"
            className={`
              w-full px-3 py-2 rounded-lg shadow-sm bg-white text-gray-900 text-sm
              ${
                errors.email
                  ? "border border-red-500 focus:ring-red-500"
                  : "border border-gray-300 focus:ring-blue-500"
              }
              transition-colors
            `}
            placeholder="Contoh: nama@gmail.com"
          />

          {/* Inline suggestions container */}
          {emailSuggestions.length > 0 && (
            <div className="absolute inset-x-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10 max-h-40 overflow-y-auto">
              {emailSuggestions.map((domain, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-sm text-gray-700"
                  onClick={() => applySuggestion(domain)}
                >
                  <i className="fas fa-at text-blue-600 mr-2 text-xs"></i>
                  <span className="text-gray-600">
                    {form.email.split("@")[0] || "nama"}
                  </span>
                  <span className="text-blue-600 font-medium">{domain}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          <i className="fas fa-info-circle mr-1"></i>
          Email yang valid diperlukan untuk konfirmasi
        </p>
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.email}
          </p>
        )}
      </div>

      {/* Foto */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-camera mr-1 text-blue-600"></i>
          Foto Profil
        </label>
        <input
          type="file"
          name="foto"
          onChange={handleChange}
          autoComplete="off"
          className={`w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors
            ${
              errors.foto
                ? "border border-red-500 focus:ring-red-500"
                : "border border-gray-300 focus:ring-blue-500"
            }
            `}
          accept="image/*"
        />
        <div className="mt-2 text-xs text-gray-600">
          <p className="flex items-center">
            <i className="fas fa-info-circle mr-2 text-blue-600"></i>
            Format: JPG, PNG | Maksimal: 1MB
          </p>
          <p className="flex items-center mt-1">
            <i className="fas fa-image mr-2 text-blue-600"></i>
            Rekomendasi: Foto formal dengan background polos
          </p>
        </div>
        {errors.foto && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.foto}
          </p>
        )}
      </div>
    </div>
  );
}
