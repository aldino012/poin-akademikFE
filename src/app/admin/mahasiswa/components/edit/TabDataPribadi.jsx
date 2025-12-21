import React, { useState } from "react";

export default function TabDataPribadi({ form, handleChange }) {
  const [showSuggest, setShowSuggest] = useState(false);

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
    const skip = ["email", "tgl_lahir", "prodi", "nim"];
    if (skip.includes(name)) return value;
    return value.toUpperCase();
  };

  /** --- NIM FILTER (HANYA ANGKA) --- */
  const filterNIM = (value) => value.replace(/[^0-9]/g, "");

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // khusus NIM → numeric only
    if (name === "nim") {
      const numeric = filterNIM(value);
      handleChange({ target: { name, value: numeric } });
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          placeholder="Hanya angka"
        />
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
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        />
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
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Tanggal Lahir */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-birthday-cake mr-1 text-amber-600"></i>
          Tanggal Lahir
        </label>
        <input
          type="date"
          name="tgl_lahir"
          value={form.tgl_lahir}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
          text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors [color-scheme:light]"
        />
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
          placeholder="email@example.com"
        />

        {/* Suggest Box */}
        {showSuggest && (
          <ul className="absolute z-50 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow">
            {emailDomains
              .filter((d) => d.includes(form.email.split("@")[1] || ""))
              .map((domain, idx) => (
                <li
                  key={idx}
                  onClick={() => applyEmailSuggestion(domain)}
                  className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {form.email.split("@")[0]}
                  {domain}
                </li>
              ))}
          </ul>
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
        />
      </div>
    </div>
  );
}
