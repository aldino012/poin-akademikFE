import React from "react";

export default function TabDataLainnya({ form, handleChange }) {
  /**
   * Semua input dibuat uppercase
   * KECUALI:
   * - tlp_saya
   * - tlp_rumah
   * - jenis_kelamin (harus L / P)
   */
  const toUpper = (name, value) => {
    const skipUpper = ["tlp_saya", "tlp_rumah", "jenis_kelamin"];
    if (skipUpper.includes(name)) return value;
    return value?.toUpperCase?.() ?? value;
  };

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    let finalValue = value;

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
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors uppercase-input"
        />
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
        <input
          type="text"
          name="tlp_saya"
          value={form.tlp_saya || ""}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors"
        />
      </div>

      {/* ================= TELEPON RUMAH ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-phone mr-1 text-amber-600"></i>
          Telepon Rumah
        </label>
        <input
          type="text"
          name="tlp_rumah"
          value={form.tlp_rumah || ""}
          onChange={handleLocalChange}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          bg-white text-gray-900 text-sm focus:ring-2 focus:ring-amber-500 
          focus:border-amber-500 transition-colors"
        />
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
        ></textarea>
      </div>
    </div>
  );
}
