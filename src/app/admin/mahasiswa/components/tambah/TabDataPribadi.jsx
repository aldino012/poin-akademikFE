import React, { useState } from "react";

export default function TabDataPribadi({ form, handleChange, errors = {} }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const [fotoError, setFotoError] = useState("");

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
    const numericValue = value.replace(/\D/g, "");

    // Update form
    handleChange({
      target: { name: "nim", value: numericValue },
    });
  };

  // Validasi Angkatan (hanya angka tahun)
  const validateAngkatan = (e) => {
    const value = e.target.value;

    // Hanya angka
    const numericValue = value.replace(/\D/g, "");

    // Batasi maksimal 4 digit (tahun)
    const limitedValue = numericValue.slice(0, 4);

    // Update form
    handleChange({
      target: { name: "angkatan", value: limitedValue },
    });
  };

  // Validasi Foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validasi ukuran file (maksimal 1MB)
      if (file.size > 1024 * 1024) {
        // 1MB dalam bytes
        setFotoError("Ukuran file maksimal 1MB");
        handleChange({
          target: { name: "foto", value: "" },
        });
        e.target.value = ""; // Reset input file
        return;
      }

      // Validasi tipe file
      if (!file.type.startsWith("image/")) {
        setFotoError("File harus berupa gambar");
        handleChange({
          target: { name: "foto", value: "" },
        });
        e.target.value = "";
        return;
      }

      setFotoError("");
    }

    handleChange(e);
  };

  // Auto-suggest email di dalam input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleChange(e);

    // Jika belum ada "@", jangan tampilkan sugesti
    if (!value.includes("@")) {
      setSuggestions([]);
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
    setSuggestions([]);
    setShowSug(false);
  };

  // Hapus file foto
  const handleRemoveFoto = () => {
    handleChange({
      target: { name: "foto", value: "" },
    });
    setFotoError("");
    // Reset input file
    const fileInput = document.querySelector('input[name="foto"]');
    if (fileInput) {
      fileInput.value = "";
    }
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
          maxLength="12"
        />
        <div className="flex justify-between">
          {errors.nim ? (
            <p className="text-xs text-red-600 mt-1">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {errors.nim}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              <i className="fas fa-info-circle mr-1"></i>
              {form.nim.length < 8
                ? `Minimal 8 digit (${form.nim.length}/8)`
                : form.nim.length > 12
                ? `Maksimal 12 digit`
                : `${form.nim.length} digit`}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {form.nim.length > 0 && `${form.nim.length} digit`}
          </p>
        </div>
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
          placeholder="Contoh: ANDI SANTOSO"
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
          <option value="">Pilih Prodi</option>
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
            transition-colors
          `}
          placeholder="Contoh: 2023"
          maxLength="4"
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
            transition-colors
          `}
          placeholder="Contoh: JAKARTA"
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
        <div className="relative">
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
              transition-colors appearance-none
            `}
            placeholder="Pilih tanggal lahir"
          />
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <i className="fas fa-calendar text-gray-900"></i>
          </div>
        </div>
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
              transition-colors pr-8
            `}
            placeholder="Contoh: nama@email.com"
          />

          {/* Email suggestions di dalam input */}
          {showSug && suggestions.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-full bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-1">
              {suggestions.map((domain, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-sm"
                  onClick={() => applySuggestion(domain)}
                >
                  <span className="text-gray-600">
                    {form.email.split("@")[0]}
                  </span>
                  <span className="text-blue-600 font-medium">{domain}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {errors.email}
          </p>
        )}
      </div>

      {/* Foto - Upload Biasa */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-camera mr-1 text-blue-600"></i>
          Foto Profil
        </label>

        {/* Info Ukuran File */}
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-blue-500 mt-0.5 mr-2"></i>
            <div className="text-xs text-gray-700">
              <p className="font-medium mb-1">Ketentuan upload foto:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Ukuran file maksimal{" "}
                  <span className="font-semibold">1 MB</span>
                </li>
                <li>
                  Format file:{" "}
                  <span className="font-semibold">JPG, JPEG, PNG</span>
                </li>
                <li>Foto harus jelas dan dapat dikenali</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Input File Biasa */}
        <div className="space-y-3">
          <div
            className={`
            w-full px-3 py-2 rounded-lg shadow-sm text-sm bg-white
            ${
              errors.foto || fotoError
                ? "border border-red-500 focus:ring-red-500"
                : "border border-gray-300 focus:ring-blue-500"
            }
          `}
          >
            <input
              type="file"
              name="foto"
              onChange={handleFotoChange}
              autoComplete="off"
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
              accept=".jpg,.jpeg,.png"
            />
          </div>

          {/* Tampilan file yang dipilih */}
          {form.foto && (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded">
                  <i className="fas fa-check-circle text-green-500 text-lg"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {typeof form.foto === "object"
                      ? form.foto.name
                      : "File foto terpilih"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <i className="fas fa-check mr-1"></i>
                    File sesuai dengan ketentuan
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFoto}
                className="text-red-500 hover:text-red-700 text-sm flex items-center"
              >
                <i className="fas fa-trash mr-1"></i> Hapus
              </button>
            </div>
          )}

          {/* Pesan Error */}
          {(errors.foto || fotoError) && (
            <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
              <i className="fas fa-exclamation-triangle text-red-500 mt-0.5 mr-2"></i>
              <p className="text-sm text-red-600">{fotoError || errors.foto}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
