"use client";

import React from "react";
import PropTypes from "prop-types";

export default function TabsInfo({ mahasiswa, kegiatan, master }) {
  return (
    <div className="p-6 space-y-6">
      {/* Identitas Mahasiswa */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-user-graduate mr-2 text-blue-600"></i>
          Identitas Mahasiswa
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              NIM
            </label>
            <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
              {mahasiswa.nim || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Nama Lengkap
            </label>
            <p className="text-sm font-semibold text-gray-800 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
              {mahasiswa.nama_mhs || mahasiswa.nama || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Angkatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {mahasiswa.angkatan || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Program Studi
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {mahasiswa.prodi || mahasiswa.program_studi || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Informasi Kegiatan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-sm">
          <i className="fas fa-calendar-check mr-2 text-blue-600"></i>
          Informasi Kegiatan
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tanggal Pengajuan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tanggal_pengajuan || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tanggal Pelaksanaan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tanggal_pelaksanaan || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tingkat
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tingkat || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Tempat
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {kegiatan.tempat || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Kode Kegiatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {master.kode_keg || "-"}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Jenis Kegiatan
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200">
              {master.jenis_kegiatan || "-"}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Rincian Acara
            </label>
            <p className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-200 min-h-[60px]">
              {kegiatan.rincian_acara || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

TabsInfo.propTypes = {
  mahasiswa: PropTypes.object.isRequired,
  kegiatan: PropTypes.object.isRequired,
  master: PropTypes.object.isRequired,
};
