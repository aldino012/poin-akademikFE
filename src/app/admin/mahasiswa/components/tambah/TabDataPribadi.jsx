import React, { useState, useEffect } from "react";

export default function TabDataPribadi({ form, handleChange, errors = {} }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");

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

  // Handler untuk upload file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      // Validasi ukuran file (maksimal 1MB)
      if (file.size > 1024 * 1024) {
        // 1MB = 1024 * 1024 bytes
        handleChange({
          target: {
            name: "foto",
            value: null,
          },
        });
        // Anda bisa menambahkan error handling di sini
      } else {
        handleChange(e);
      }
    }
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* NIM */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-id-card mr-2 text-blue-600"></i>
          NIM <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nim"
          value={form.nim}
          onChange={validateNIM}
          className={`
                w-full px-4 py-3 rounded-lg shadow-sm text-sm bg-white text-gray-900
                border ${errors.nim ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 ${
                  errors.nim ? "focus:ring-red-500" : "focus:ring-blue-500"
                } focus:border-transparent
                transition-all duration-200
            `}
          placeholder="Contoh: 12345678"
        />
        {errors.nim ? (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.nim}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <i className="fas fa-info-circle mr-1.5 text-blue-500"></i>
            Masukkan 8-12 digit NIM (hanya angka)
          </p>
        )}
      </div>

      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user mr-2 text-blue-600"></i>
          Nama Mahasiswa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama_mhs"
          value={form.nama_mhs}
          onChange={handleChange}
          autoComplete="off"
          className={`
            w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
            border ${errors.nama_mhs ? "border-red-500" : "border-gray-300"}
            focus:outline-none focus:ring-2 ${
              errors.nama_mhs ? "focus:ring-red-500" : "focus:ring-blue-500"
            } focus:border-transparent
            transition-all duration-200 uppercase
          `}
          placeholder="Contoh: ANDI PRASETYA"
        />
        {errors.nama_mhs && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.nama_mhs}
          </p>
        )}
      </div>

      {/* Prodi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-graduation-cap mr-2 text-blue-600"></i>
          Prodi
        </label>
        <select
          name="prodi"
          value={form.prodi}
          onChange={handleChange}
          className={`
                w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                border ${errors.prodi ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 ${
                  errors.prodi ? "focus:ring-red-500" : "focus:ring-blue-500"
                } focus:border-transparent
                transition-all duration-200 appearance-none cursor-pointer
            `}
        >
          <option value="">Pilih Program Studi</option>
          <option value="S1">S1 - Sarjana</option>
          <option value="D3">D3 - Diploma</option>
        </select>
        {errors.prodi && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.prodi}
          </p>
        )}
      </div>

      {/* Angkatan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
          Angkatan
        </label>
        <input
          type="text"
          name="angkatan"
          value={form.angkatan}
          onChange={validateAngkatan}
          className={`
                w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                border ${errors.angkatan ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 ${
                  errors.angkatan ? "focus:ring-red-500" : "focus:ring-blue-500"
                } focus:border-transparent
                transition-all duration-200
            `}
          placeholder="Contoh: 2023"
          maxLength={4}
        />
        {errors.angkatan ? (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.angkatan}
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <i className="fas fa-info-circle mr-1.5 text-blue-500"></i>
            Masukkan tahun angkatan (4 digit angka)
          </p>
        )}
      </div>

      {/* Tempat Lahir */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
          Tempat Lahir
        </label>
        <input
          type="text"
          name="tempat_lahir"
          value={form.tempat_lahir}
          onChange={handleChange}
          className={`
                w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
                border ${
                  errors.tempat_lahir ? "border-red-500" : "border-gray-300"
                }
                focus:outline-none focus:ring-2 ${
                  errors.tempat_lahir
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                } focus:border-transparent
                transition-all duration-200 uppercase
            `}
          placeholder="Contoh: JAKARTA"
        />
        {errors.tempat_lahir && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.tempat_lahir}
          </p>
        )}
      </div>

      {/* Tanggal Lahir */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-birthday-cake mr-2 text-blue-600"></i>
          Tanggal Lahir
        </label>
        <div className="relative">
          <input
            type="date"
            name="tgl_lahir"
            value={form.tgl_lahir}
            onChange={handleChange}
            className={`
              w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
              border ${errors.tgl_lahir ? "border-red-500" : "border-gray-300"}
              focus:outline-none focus:ring-2 ${
                errors.tgl_lahir ? "focus:ring-red-500" : "focus:ring-blue-500"
              } focus:border-transparent
              transition-all duration-200
              appearance-none
              [color-scheme:light]
            `}
            max={getTodayDate()}
            style={{
              color: "#000000",
              // Custom styling untuk ikon kalender
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23000' class='bi bi-calendar' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "16px",
              paddingRight: "2.5rem",
            }}
          />
          {/* Overlay untuk ikon custom jika perlu */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <i className="fas fa-calendar-alt text-gray-700"></i>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <i className="fas fa-info-circle mr-1.5 text-blue-500"></i>
          Format: DD/MM/YYYY
        </p>
        {errors.tgl_lahir && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.tgl_lahir}
          </p>
        )}
      </div>

      {/* EMAIL + AUTO-SUGGEST */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-envelope mr-2 text-blue-600"></i>
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
              w-full px-4 py-3 rounded-lg shadow-sm bg-white text-gray-900 text-sm
              border ${errors.email ? "border-red-500" : "border-gray-300"}
              focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
              } focus:border-transparent
              transition-all duration-200
            `}
            placeholder="Contoh: nama@gmail.com"
          />

          {/* Inline suggestions container */}
          {emailSuggestions.length > 0 && (
            <div className="absolute inset-x-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {emailSuggestions.map((domain, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  onClick={() => applySuggestion(domain)}
                >
                  <i className="fas fa-at text-blue-600 mr-3 text-sm"></i>
                  <span className="text-gray-700 font-medium">
                    {form.email.split("@")[0] || "nama"}
                  </span>
                  <span className="text-blue-600 ml-1">{domain}</span>
                  <i className="fas fa-chevron-right text-gray-400 ml-auto text-xs"></i>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <i className="fas fa-info-circle mr-1.5 text-blue-500"></i>
          Email yang valid diperlukan untuk konfirmasi
        </p>
        {errors.email && (
          <p className="text-xs text-red-600 mt-2 flex items-center">
            <i className="fas fa-exclamation-circle mr-1.5"></i>
            {errors.email}
          </p>
        )}
      </div>

      {/* Foto */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <i className="fas fa-camera mr-2 text-blue-600"></i>
          Foto Profil
        </label>

        {/* Custom File Upload Styling */}
        <div
          className={`
          relative border-2 border-dashed rounded-xl p-6 text-center
          transition-all duration-300 hover:border-blue-400
          ${
            errors.foto
              ? "border-red-300 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-blue-50"
          }
        `}
        >
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            accept="image/*"
            id="foto-upload"
          />

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="fas fa-cloud-upload-alt text-2xl text-blue-600"></i>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => document.getElementById("foto-upload").click()}
                >
                  <i className="fas fa-upload"></i>
                  Pilih Foto
                </button>
                <p className="text-sm text-gray-600">atau drag & drop</p>
              </div>

              <p className="text-sm text-gray-500">
                Format: JPG, PNG, GIF (Maksimal 1MB)
              </p>

              {selectedFileName && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-image text-blue-600"></i>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                          {selectedFileName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <i className="fas fa-check-circle text-green-500 mr-1"></i>
                          File berhasil dipilih
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFileName("");
                        handleChange({
                          target: { name: "foto", value: "" },
                        });
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              )}

              {!selectedFileName && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                    <div className="text-left">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        Rekomendasi Foto:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <i className="fas fa-check text-green-500 text-xs"></i>
                          Foto formal (background polos)
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="fas fa-check text-green-500 text-xs"></i>
                          Wajah terlihat jelas
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="fas fa-check text-green-500 text-xs"></i>
                          Ukuran maksimal 1MB
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {errors.foto && (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1.5"></i>
              {errors.foto}
            </p>
          )}
          <p className="text-xs text-gray-500 flex items-center">
            <i className="fas fa-exclamation-triangle mr-1.5 text-yellow-500"></i>
            Pastikan foto sesuai ketentuan untuk kelancaran proses verifikasi
          </p>
        </div>
      </div>
    </div>
  );
}
