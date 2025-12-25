import React, { useState } from "react";

export default function TabDataLainnya({ form, handleChange }) {
  const [thnLulusError, setThnLulusError] = useState("");
  const [tlpSayaError, setTlpSayaError] = useState("");
  const [tlpRumahError, setTlpRumahError] = useState("");

  /**
   * Semua input dibuat uppercase
   * KECUALI:
   * - tlp_saya
   * - tlp_rumah
   * - jenis_kelamin (harus L / P)
   * - thn_lulus (hanya angka)
   */
  const toUpper = (name, value) => {
    const skipUpper = ["tlp_saya", "tlp_rumah", "jenis_kelamin", "thn_lulus"];
    if (skipUpper.includes(name)) return value;
    return value?.toUpperCase?.() ?? value;
  };

  /** --- Filter hanya angka --- */
  const filterAngka = (value) => value.replace(/[^0-9]/g, "");

  /** --- Prevent paste non numeric --- */
  const handlePasteAngka = (e, fieldName) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) {
      e.preventDefault();
      if (fieldName === "thn_lulus") {
        setThnLulusError("Hanya angka yang diperbolehkan");
      } else if (fieldName === "tlp_saya") {
        setTlpSayaError("Hanya angka yang diperbolehkan");
      } else if (fieldName === "tlp_rumah") {
        setTlpRumahError("Hanya angka yang diperbolehkan");
      }
    }
  };

  /** --- Prevent non numeric keyboard --- */
  const handleKeyDownAngka = (e, fieldName) => {
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
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      if (fieldName === "thn_lulus") {
        setThnLulusError("Hanya angka yang diperbolehkan");
      } else if (fieldName === "tlp_saya") {
        setTlpSayaError("Hanya angka yang diperbolehkan");
      } else if (fieldName === "tlp_rumah") {
        setTlpRumahError("Hanya angka yang diperbolehkan");
      }
    } else {
      // Reset error jika input valid
      if (fieldName === "thn_lulus") setThnLulusError("");
      if (fieldName === "tlp_saya") setTlpSayaError("");
      if (fieldName === "tlp_rumah") setTlpRumahError("");
    }
  };

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    let finalValue = value;

    // ===============================
    // 🔥 KHUSUS TAHUN LULUS (hanya angka)
    // ===============================
    if (name === "thn_lulus") {
      const numeric = filterAngka(value);

      // Validasi panjang (4 digit untuk tahun)
      if (numeric.length > 0 && numeric.length !== 4) {
        setThnLulusError("Tahun lulus harus 4 digit");
      } else {
        setThnLulusError("");
      }

      // Batasi maksimal 4 digit
      finalValue = numeric.slice(0, 4);
      handleChange({
        target: { name, value: finalValue },
      });
      return;
    }

    // ===============================
    // 🔥 KHUSUS TELEPON SAYA (hanya angka)
    // ===============================
    if (name === "tlp_saya") {
      const numeric = filterAngka(value);

      // Validasi panjang (minimal 10 digit untuk nomor Indonesia)
      if (numeric.length > 0 && numeric.length < 10) {
        setTlpSayaError(`Minimal 10 digit (${numeric.length}/10)`);
      } else if (numeric.length > 15) {
        setTlpSayaError("Maksimal 15 digit");
      } else {
        setTlpSayaError("");
      }

      finalValue = numeric.slice(0, 15);
      handleChange({
        target: { name, value: finalValue },
      });
      return;
    }

    // ===============================
    // 🔥 KHUSUS TELEPON RUMAH (hanya angka)
    // ===============================
    if (name === "tlp_rumah") {
      const numeric = filterAngka(value);

      // Validasi panjang (minimal 7 digit untuk telepon rumah)
      if (numeric.length > 0 && numeric.length < 7) {
        setTlpRumahError(`Minimal 7 digit (${numeric.length}/7)`);
      } else if (numeric.length > 15) {
        setTlpRumahError("Maksimal 15 digit");
      } else {
        setTlpRumahError("");
      }

      finalValue = numeric.slice(0, 15);
      handleChange({
        target: { name, value: finalValue },
      });
      return;
    }

    // ===============================
    // 🔥 KHUSUS JENIS KELAMIN
    // ===============================
    if (name === "jenis_kelamin") {
      finalValue = value; // HARUS "L" atau "P"
    } else {
      finalValue = toUpper(name, value);
    }

    handleChange({
      target: {
        name,
        value: finalValue,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ================= PEKERJAAN ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-briefcase mr-1 text-amber-600"></i>
          Pekerjaan
        </label>
        <input
          type="text"
          name="pekerjaan"
          value={form.pekerjaan || ""}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors uppercase-input"
          placeholder="Contoh: PEGAWAI SWASTA"
          style={{ textTransform: "uppercase" }}
        />
      </div>

      {/* ================= ASAL SEKOLAH ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-school mr-1 text-amber-600"></i>
          Asal Sekolah
        </label>
        <input
          type="text"
          name="asal_sekolah"
          value={form.asal_sekolah || ""}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors uppercase-input"
          placeholder="Contoh: SMA NEGERI 1 JAKARTA"
          style={{ textTransform: "uppercase" }}
        />
      </div>

      {/* ================= TAHUN LULUS ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-calendar-check mr-1 text-amber-600"></i>
          Tahun Lulus
        </label>
        <input
          type="text"
          name="thn_lulus"
          value={form.thn_lulus || ""}
          onChange={handleLocalChange}
          onKeyDown={(e) => handleKeyDownAngka(e, "thn_lulus")}
          onPaste={(e) => handlePasteAngka(e, "thn_lulus")}
          autoComplete="off"
          maxLength="4"
          className={`w-full px-3 py-2 border rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors
          ${thnLulusError ? "border-red-500" : "border-gray-300"}`}
          placeholder="Contoh: 2021"
        />
        <div className="flex justify-between mt-1">
          {thnLulusError ? (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {thnLulusError}
            </p>
          ) : form.thn_lulus ? (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              {form.thn_lulus.length === 4
                ? "Format tahun valid"
                : `${form.thn_lulus.length}/4 digit`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center">
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

      {/* ================= JENIS KELAMIN ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-user-check mr-1 text-amber-600"></i>
          Jenis Kelamin
        </label>

        <select
          name="jenis_kelamin"
          value={form.jenis_kelamin || ""}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors"
        >
          <option value="">-- PILIH --</option>
          <option value="L">LAKI-LAKI</option>
          <option value="P">PEREMPUAN</option>
        </select>
      </div>

      {/* ================= TELEPON SAYA ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-mobile-alt mr-1 text-amber-600"></i>
          Telepon Saya
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 text-sm">+62</span>
          </div>
          <input
            type="text"
            name="tlp_saya"
            value={form.tlp_saya || ""}
            onChange={handleLocalChange}
            onKeyDown={(e) => handleKeyDownAngka(e, "tlp_saya")}
            onPaste={(e) => handlePasteAngka(e, "tlp_saya")}
            autoComplete="off"
            maxLength="15"
            className={`w-full pl-12 px-3 py-2 border rounded-lg shadow-sm 
            bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
            focus:border-amber-500 transition-colors
            ${tlpSayaError ? "border-red-500" : "border-gray-300"}`}
            placeholder="81234567890"
          />
        </div>
        <div className="flex justify-between mt-1">
          {tlpSayaError ? (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {tlpSayaError}
            </p>
          ) : form.tlp_saya ? (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              {form.tlp_saya.length < 10
                ? `Minimal 10 digit (${form.tlp_saya.length}/10)`
                : `${form.tlp_saya.length} digit (valid)`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              Hanya angka (minimal 10 digit)
            </p>
          )}
          {form.tlp_saya && (
            <p className="text-xs text-gray-500">
              {form.tlp_saya.length}/15 digit
            </p>
          )}
        </div>
      </div>

      {/* ================= TELEPON RUMAH ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-phone mr-1 text-amber-600"></i>
          Telepon Rumah
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 text-sm">+62</span>
          </div>
          <input
            type="text"
            name="tlp_rumah"
            value={form.tlp_rumah || ""}
            onChange={handleLocalChange}
            onKeyDown={(e) => handleKeyDownAngka(e, "tlp_rumah")}
            onPaste={(e) => handlePasteAngka(e, "tlp_rumah")}
            autoComplete="off"
            maxLength="15"
            className={`w-full pl-12 px-3 py-2 border rounded-lg shadow-sm 
            bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
            focus:border-amber-500 transition-colors
            ${tlpRumahError ? "border-red-500" : "border-gray-300"}`}
            placeholder="0211234567"
          />
        </div>
        <div className="flex justify-between mt-1">
          {tlpRumahError ? (
            <p className="text-xs text-red-600 flex items-center">
              <i className="fas fa-exclamation-circle mr-1"></i>
              {tlpRumahError}
            </p>
          ) : form.tlp_rumah ? (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              {form.tlp_rumah.length < 7
                ? `Minimal 7 digit (${form.tlp_rumah.length}/7)`
                : `${form.tlp_rumah.length} digit (valid)`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center">
              <i className="fas fa-info-circle mr-1"></i>
              Hanya angka (minimal 7 digit)
            </p>
          )}
          {form.tlp_rumah && (
            <p className="text-xs text-gray-500">
              {form.tlp_rumah.length}/15 digit
            </p>
          )}
        </div>
      </div>

      {/* ================= ALAMAT ================= */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-map-marker-alt mr-1 text-amber-600"></i>
          Alamat
        </label>
        <textarea
          name="alamat"
          value={form.alamat || ""}
          onChange={handleLocalChange}
          rows="3"
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors resize-none uppercase-input"
          placeholder="Contoh: JL. SUDIRMAN NO. 123, KELURAHAN MENTENG, KECAMATAN MENTENG, JAKARTA PUSAT"
          style={{ textTransform: "uppercase" }}
        ></textarea>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500 flex items-center">
            <i className="fas fa-info-circle mr-1"></i>
            Masukkan alamat lengkap
          </p>
          {form.alamat && (
            <p className="text-xs text-gray-500">
              {form.alamat.length} karakter
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
