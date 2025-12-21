import React, { useState } from "react";

export default function TabDataPribadi({ form, handleChange, errors = {} }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);

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

  // Auto-suggest email
  const handleEmailChange = (e) => {
    const value = e.target.value;

    handleChange(e); // panggil handler asli

    // Jika belum ada "@", jangan tampilkan sugesti
    if (!value.includes("@")) {
      setShowSug(false);
      return;
    }

    const [username, domainPart] = value.split("@");

    // Jika user hanya mengetik "@"
    if (value.endsWith("@")) {
      setSuggestions(emailDomains);
      setShowSug(true);
      return;
    }

    // Filter domain
    const filtered = emailDomains.filter((d) =>
      d.replace("@", "").toLowerCase().startsWith(domainPart.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSug(filtered.length > 0);
  };

  const applySuggestion = (domain) => {
    const username = form.email.split("@")[0];
    const newEmail = username + domain;
    handleChange({
      target: { name: "email", value: newEmail },
    });
    setShowSug(false);
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
          onChange={handleChange}
          className={`
                w-full px-3 py-2 rounded-lg shadow-sm text-sm  bg-white text-gray-900
                ${
                  errors.nim
                    ? "border border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-blue-500"
                }
            `}
        />
        {errors.nim && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.nim}
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
          placeholder="Masukkan nama lengkap"
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
        />
        {errors.angkatan && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.angkatan}
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
        />
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
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleEmailChange}
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
          placeholder="email@example.com"
        />

        {/* Dropdown Suggestion */}
        {showSug && (
          <ul className="absolute z-50 bg-white w-full border border-gray-300 rounded-lg shadow-md mt-1 text-sm">
            {suggestions.map((domain, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                onClick={() => applySuggestion(domain)}
              >
                <i className="fas fa-at text-blue-600 mr-2"></i>
                {form.email.split("@")[0]}
                {domain}
              </li>
            ))}
          </ul>
        )}
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
          className={`w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors
            ${
              errors.angkatan
                ? "border border-red-500 focus:ring-red-500"
                : "border border-gray-300 focus:ring-blue-500"
            }
            `}
          accept="image/*"
        />
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
