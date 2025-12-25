import React, { useState } from "react";

export default function TabDataPribadi({ form, handleChange }) {
  const [showSuggest, setShowSuggest] = useState(false);
  const [nimError, setNimError] = useState("");
  const [angkatanError, setAngkatanError] = useState("");

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

  /** --- UPPERCASE HANDLER --- */
  const toUpperExceptEmail = (name, value) => {
    const skip = ["email", "tgl_lahir", "prodi", "nim", "angkatan"];
    if (skip.includes(name)) return value;
    return value.toUpperCase();
  };

  /** --- NIM FILTER (HANYA ANGKA) --- */
  const filterNIM = (value) => value.replace(/[^0-9]/g, "");

  /** --- ANGKATAN FILTER (HANYA ANGKA) --- */
  const filterAngkatan = (value) => value.replace(/[^0-9]/g, "");

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // khusus NIM → numeric only + validasi digit
    if (name === "nim") {
      const numeric = filterNIM(value);

      // Validasi panjang digit
      if (numeric.length < 8 && numeric.length > 0) {
        setNimError(`NIM minimal 8 digit (${numeric.length}/8)`);
      } else if (numeric.length > 12) {
        setNimError("NIM maksimal 12 digit");
      } else {
        setNimError("");
      }

      handleChange({ target: { name, value: numeric } });
      return;
    }

    // khusus Angkatan → numeric only + validasi tahun
    if (name === "angkatan") {
      const numeric = filterAngkatan(value);

      // Validasi panjang (4 digit untuk tahun)
      if (numeric.length > 0 && numeric.length !== 4) {
        setAngkatanError("Angkatan harus 4 digit (tahun)");
      } else {
        setAngkatanError("");
      }

      // Batasi maksimal 4 digit
      const limitedValue = numeric.slice(0, 4);
      handleChange({ target: { name, value: limitedValue } });
      return;
    }

    // email → langsung lower
    if (name === "email") {
      const emailValue = value.toLowerCase();
      handleChange({ target: { name, value: emailValue } });

      // show suggestion kalau user mengetik "@"
      if (emailValue.includes("@")) {
        setShowSuggest(true);
      } else {
        setShowSuggest(false);
      }
      return;
    }

    // lainnya → uppercase
    const up = toUpperExceptEmail(name, value);
    handleChange({ target: { name, value: up } });
  };

  /** --- Prevent paste non numeric pada NIM --- */
  const handlePasteNIM = (e) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) e.preventDefault();
  };

  /** --- Prevent non numeric keyboard for NIM --- */
  const handleKeyDownNIM = (e) => {
    const allow = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];
    if (allow.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  /** --- Prevent paste non numeric pada Angkatan --- */
  const handlePasteAngkatan = (e) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) e.preventDefault();
  };

  /** --- Prevent non numeric keyboard for Angkatan --- */
  const handleKeyDownAngkatan = (e) => {
    const allow = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];
    if (allow.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  /** Tambahkan pilihan domain ke email */
  const applyEmailSuggestion = (domain) => {
    const namePart = form.email.split("@")[0];
    const finalEmail = namePart + domain;

    handleChange({
      target: { name: "email", value: finalEmail.toLowerCase() },
    });

    setShowSuggest(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* NIM */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-id-card mr-1 text-amber-600"></i>
          NIM
        </label>
        <input
          type="text"
          name="nim"
          value={form.nim}
          onChange={handleLocalChange}
          onKeyDown={handleKeyDownNIM}
          onPaste={handlePasteNIM}
          autoComplete="off"
          maxLength="12"
          className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white 
            text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors
            ${nimError ? "border-red-500" : "border-gray-300"}`}
          placeholder="Contoh: 12345678"
        />
        <div className="flex justify-between mt-1">
          {nimError ? (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {nimError}
            </p>
          ) : form.nim ? (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              {form.nim.length < 8
                ? `Minimal 8 digit (${form.nim.length}/8)`
                : form.nim.length > 12
                ? `Maksimal 12 digit`
                : `${form.nim.length} digit (valid)`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              Masukkan 8-12 digit angka
            </p>
          )}
          {form.nim && (
            <p className="text-xs text-gray-500">{form.nim.length}/12 digit</p>
          )}
        </div>
      </div>

      {/* Nama Mahasiswa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user mr-1 text-amber-600"></i>
          Nama Mahasiswa
        </label>
        <input
          type="text"
          name="nama_mhs"
          value={form.nama_mhs}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors uppercase-input"
          placeholder="Contoh: ANDI SANTOSO"
          style={{ textTransform: "uppercase" }}
        />
      </div>

      {/* Prodi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-graduation-cap mr-1 text-amber-600"></i>
          Prodi
        </label>
        <select
          name="prodi"
          value={form.prodi}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        >
          <option value="">Pilih Prodi</option>
          <option value="S1">S1</option>
          <option value="D3">D3</option>
        </select>
      </div>

      {/* Angkatan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-calendar-alt mr-1 text-amber-600"></i>
          Angkatan
        </label>
        <input
          type="text"
          name="angkatan"
          value={form.angkatan}
          onChange={handleLocalChange}
          onKeyDown={handleKeyDownAngkatan}
          onPaste={handlePasteAngkatan}
          autoComplete="off"
          maxLength="4"
          className={`w-full px-3 py-2 border rounded-lg shadow-sm bg-white 
            text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors
            ${angkatanError ? "border-red-500" : "border-gray-300"}`}
          placeholder="Contoh: 2023"
        />
        <div className="flex justify-between mt-1">
          {angkatanError ? (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {angkatanError}
            </p>
          ) : form.angkatan ? (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              {form.angkatan.length === 4
                ? "Format tahun valid"
                : `${form.angkatan.length}/4 digit`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              Masukkan 4 digit tahun
            </p>
          )}
          {form.angkatan && (
            <p className="text-xs text-gray-500">
              {form.angkatan.length}/4 digit
            </p>
          )}
        </div>
      </div>

      {/* Tempat Lahir */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-map-marker-alt mr-1 text-amber-600"></i>
          Tempat Lahir
        </label>
        <input
          type="text"
          name="tempat_lahir"
          value={form.tempat_lahir}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors uppercase-input"
          placeholder="Contoh: JAKARTA"
          style={{ textTransform: "uppercase" }}
        />
      </div>

      {/* Tanggal Lahir */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-birthday-cake mr-1 text-amber-600"></i>
          Tanggal Lahir
        </label>
        <div className="relative">
          <input
            type="date"
            name="tgl_lahir"
            value={form.tgl_lahir}
            onChange={handleLocalChange}
            autoComplete="off"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
            text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors [color-scheme:light] pr-10"
            placeholder="Pilih tanggal lahir"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <i className="fas fa-calendar text-gray-900"></i>
          </div>
        </div>
      </div>

      {/* Email + Suggest */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-envelope mr-1 text-amber-600"></i>
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors lowercase-input"
          placeholder="Contoh: nama@email.com"
        />

        {/* Suggest Box */}
        {showSuggest && form.email.includes("@") && (
          <div className="absolute z-50 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
            <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 font-medium">Pilih domain:</p>
            </div>
            {emailDomains
              .filter((d) => {
                const currentDomain = form.email.split("@")[1] || "";
                return d.toLowerCase().includes(currentDomain.toLowerCase());
              })
              .map((domain, idx) => (
                <div
                  key={idx}
                  onClick={() => applyEmailSuggestion(domain)}
                  className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-amber-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <i className="fas fa-at text-amber-500 mr-2 text-xs"></i>
                    <span className="font-medium">
                      {form.email.split("@")[0]}
                    </span>
                    <span className="text-amber-600">{domain}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Total Poin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-star mr-1 text-amber-600"></i>
          Total Poin
        </label>
        <input
          type="number"
          name="total_poin"
          value={form.total_poin}
          readOnly
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-gray-100 text-gray-900 text-sm cursor-not-allowed"
          placeholder="0"
        />
      </div>

      {/* Target Poin */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-bullseye mr-1 text-amber-600"></i>
          Target Poin
        </label>
        <input
          type="number"
          name="target_poin"
          value={form.target_poin}
          onChange={handleLocalChange}
          min="0"
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          placeholder="Masukkan target poin"
        />
      </div>
    </div>
  );
}
