window.addEventListener("load", function () {
  // Tunggu semua font, gambar, dan layout benar-benar siap
  setTimeout(function () {
    const container = document.querySelector(".cv-container");
    const closingSection = document.querySelector("#closingSection");

    if (!container || !closingSection) return;

    /* ================= HITUNG POSISI ================= */

    const containerRect = container.getBoundingClientRect();
    const closingRect = closingSection.getBoundingClientRect();

    const relativeTop = closingRect.top - containerRect.top;

    // 1 halaman A4 ≈ 297mm ≈ 1122px (rasio aman)
    const PAGE_HEIGHT_PX = 297 * 3.78;

    /* ================= LOGIKA PEMINDAHAN ================= */

    // Jika bagian penutup sudah terlalu ke bawah halaman pertama
    if (relativeTop > PAGE_HEIGHT_PX * 0.85) {
      /* ================= PAGE BREAK ================= */

      // Paksa closing section pindah halaman
      closingSection.style.pageBreakBefore = "always";
      closingSection.style.breakBefore = "page";

      /* ================= TAMBAH KOP HALAMAN BARU ================= */

      const newKop = document.createElement("div");
      newKop.className = "kop-header";
      newKop.innerHTML = '<img src="kop2.png" class="kop-img" alt="Kop Surat">';

      /* ================= WRAPPER KONTEN HALAMAN BARU ================= */

      const wrapper = document.createElement("div");
      wrapper.className = "content-wrapper"; // ✅ PAKAI CSS, BUKAN STYLE INLINE

      /* ================= SUSUN ULANG DOM ================= */

      const parent = closingSection.parentNode;

      parent.insertBefore(newKop, closingSection);
      parent.insertBefore(wrapper, closingSection);

      wrapper.appendChild(closingSection);
    }
  }, 300); // delay diperpanjang agar layout stabil
});
