// latihan git
// ============================================
// DATA PRODUK — sumber data utama untuk semua halaman
// ============================================
let dataProduk = [
  { nama: "Kemeja Linen", harga: 150000, deskripsi: "Bahan adem, cocok dipakai harian. Terbuat dari linen premium yang breathable, cocok untuk cuaca tropis Indonesia. Tersedia dalam beberapa warna netral yang mudah dipadupadankan.", gambar: "Kemeja Linen.png", badge: "Best Seller" },
  { nama: "Celana Chino", harga: 220000, deskripsi: "Nyaman dan stylish untuk kerja. Potongan slim-fit yang modern, cocok untuk gaya kasual maupun semi-formal. Bahan tebal namun tetap fleksibel bergerak.", gambar: "celana chino.png", badge: "" },
  { nama: "Tas Selempang", harga: 180000, deskripsi: "Muat banyak, tetap ringkas. Terbuat dari kulit sintetis berkualitas, tahan lama dan mudah dibersihkan. Cocok untuk kegiatan sehari-hari.", gambar: "Tas Selempang.png", badge: "Baru!" },
  { nama: "Jaket Kulit", harga: 200000, deskripsi: "Tahan lama, gaya edgy. Jaket kulit sintetis dengan jahitan rapi, memberikan kesan maskulin dan stylish untuk tampilan kasual kamu.", gambar: "Jaket Kulit.png", badge: "" },
  { nama: "Ikat Pinggang Kulit", harga: 120000, deskripsi: "Ikat pinggang kulit asli dengan gesper metal berkualitas. Cocok dipadukan dengan celana formal maupun kasual, tahan lama dan tidak mudah retak.", gambar: "Ikat pinggang kulit.jfif", badge: "" },
  { nama: "Jas Pria Formal", harga: 450000, deskripsi: "Jas formal potongan slim-fit untuk acara resmi, wawancara kerja, atau pesta pernikahan. Bahan halus dan nyaman dipakai seharian.", gambar: "jas pria formal.jfif", badge: "Baru!" },
  { nama: "Blazer Wanita", harga: 420000, deskripsi: "Blazer wanita dengan potongan modern dan elegan, cocok untuk kebutuhan kantor maupun acara semi-formal. Tersedia bahan yang adem dan tidak mudah kusut.", gambar: "Blazer wanita.jfif", badge: "" },
  { nama: "Sneakers Pria", harga: 280000, deskripsi: "Sepatu sneakers kasual dengan sol empuk dan desain minimalis. Cocok dipakai untuk aktivitas harian maupun jalan-jalan santai.", gambar: "Sepatu sneakers.jfif", badge: "Best Seller" },
  { nama: "Heels Wanita", harga: 250000, deskripsi: "Sepatu heels dengan hak setinggi 5cm, nyaman dipakai untuk acara formal maupun kerja. Desain elegan dengan bahan yang lembut di kaki.", gambar: "Sepatu heels.jfif", badge: "" },
  { nama: "Topi Baseball", harga: 85000, deskripsi: "Topi baseball dengan bahan katun berkualitas, cocok melindungi dari sinar matahari sekaligus melengkapi gaya kasual kamu sehari-hari.", gambar: "Topi baseball.jfif", badge: "" },
  { nama: "Kacamata Hitam", harga: 95000, deskripsi: "Kacamata hitam dengan perlindungan UV, desain unisex yang cocok untuk berbagai bentuk wajah. Tambahan aksesoris wajib untuk gaya kamu.", gambar: "kacamata hitam.jfif", badge: "Baru!" },
  { nama: "Dompet Kulit Pria", harga: 130000, deskripsi: "Dompet kulit dengan banyak slot kartu dan kompartemen uang. Desain simpel namun tetap terlihat premium untuk penggunaan sehari-hari.", gambar: "dompet kulit.jfif", badge: "" },
  { nama: "Syal Rajut", harga: 75000, deskripsi: "Syal rajut lembut yang cocok dipakai saat cuaca dingin atau sebagai aksesoris pelengkap outfit kamu. Tersedia dalam beberapa pilihan warna.", gambar: "Syal rajut.jfif", badge: "" },
  { nama: "Kaos Kaki Bundle", harga: 45000, deskripsi: "Bundle isi 3 pasang kaos kaki berbahan katun yang nyaman dan menyerap keringat. Cocok untuk aktivitas harian maupun olahraga ringan.", gambar: "Kaos Kaki Bundle.jfif", badge: "" }
];
// ============================================
// KERANJANG — ambil jumlah dari localStorage saat halaman dibuka
// ============================================
let jumlahKeranjang = localStorage.getItem("jumlahKeranjang");

if (jumlahKeranjang === null) {
  jumlahKeranjang = 0;
} else {
  jumlahKeranjang = Number(jumlahKeranjang);
}

let tampilanJumlah = document.querySelector("#jumlah-keranjang");

if (tampilanJumlah) {
  tampilanJumlah.textContent = jumlahKeranjang;
}

// ============================================
// FUNGSI UTAMA: Tambah produk ke keranjang
// Dipakai di SEMUA tombol "Tambah ke Keranjang" di seluruh halaman,
// baik yang statis maupun yang dibuat lewat innerHTML.
// ============================================
function tambahKeKeranjang(namaProduk, hargaProduk) {
 

  let daftarKeranjang = localStorage.getItem("daftarKeranjang");
  if (daftarKeranjang === null) {
    daftarKeranjang = [];
  } else {
    daftarKeranjang = JSON.parse(daftarKeranjang);
  }
let  itemAda = daftarKeranjang.find(function (item) {
  return item.nama === namaProduk;});
  if (itemAda) {
    itemAda.qty = itemAda.qty + 1;
  } else {
    daftarKeranjang.push({ nama: namaProduk, harga: hargaProduk, qty : 1 });
    jumlahKeranjang = jumlahKeranjang + 1;
  if (tampilanJumlah) {
    tampilanJumlah.textContent = jumlahKeranjang;
  }
  localStorage.setItem("jumlahKeranjang", jumlahKeranjang);
}
  localStorage.setItem("daftarKeranjang", JSON.stringify(daftarKeranjang));

  let toast = document.querySelector("#toast-notif");
  if (toast) {
    toast.textContent = namaProduk + " ditambahkan ke keranjang!";
    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");
    }, 2000);
  }
}

// Fungsi bantu: pasang event listener klik ke sekumpulan tombol "Tambah ke Keranjang".
// Dipanggil ulang tiap kali ada tombol baru yang dibuat lewat innerHTML.
function pasangEventTombolTambah() {
  let semuaTombolTambah = document.querySelectorAll(".btn-tambah");

  semuaTombolTambah.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      let namaProduk = tombol.getAttribute("data-nama");
      let hargaProduk = Number(tombol.getAttribute("data-harga"));
      tambahKeKeranjang(namaProduk, hargaProduk);
    });
  });
}

// ============================================
// HALAMAN CHECKOUT — kirim pesanan ke WhatsApp
// ============================================
let formCheckout = document.querySelector("#form-checkout");

if (formCheckout) {
  formCheckout.addEventListener("submit", function (event) {
    event.preventDefault();

    let nama = document.querySelector("#nama").value;
    let alamat = document.querySelector("#alamat").value;
    let produk = document.querySelector("#produk").value;

    let pesan = "Halo, saya mau pesan:%0A" +
                "Nama: " + nama + "%0A" +
                "Alamat: " + alamat + "%0A" +
                "Produk: " + produk;

    let nomorWhatsApp = "6281364814243";
    let linkWhatsApp = "https://wa.me/" + nomorWhatsApp + "?text=" + pesan;

    window.open(linkWhatsApp, "_blank");
  });
}

// Isi otomatis field "Produk yang Dipesan" berdasarkan isi keranjang
let inputProduk = document.querySelector("#produk");

if (inputProduk) {
  let daftarKeranjang = localStorage.getItem("daftarKeranjang");

  if (daftarKeranjang !== null) {
    daftarKeranjang = JSON.parse(daftarKeranjang);

    let namaSemuaProduk = daftarKeranjang.map(function (item) {
      return item.nama;
    });

    inputProduk.value = namaSemuaProduk.join(", ");
  }
}

// ============================================
// HALAMAN KERANJANG SAYA — tampilkan isi keranjang, hitung total, hapus item
// ============================================
let daftarKeranjangDiv = document.querySelector("#daftar-keranjang");

if (daftarKeranjangDiv) {
  let dataKeranjang = localStorage.getItem("daftarKeranjang");

  if (dataKeranjang !== null) {
    dataKeranjang = JSON.parse(dataKeranjang);
  } else {
    dataKeranjang = [];
  }

  let totalHarga = 0;

  if (dataKeranjang.length === 0) {
    daftarKeranjangDiv.innerHTML = "<p class='keranjang-kosong'>Keranjang kamu masih kosong. Yuk mulai belanja!</p>";

    let tombolCheckoutLink = document.querySelector("#btn-checkout-link");
    if (tombolCheckoutLink) {
      tombolCheckoutLink.style.display = "none";
    }
  } else {
    dataKeranjang.forEach(function (item, index) {
      totalHarga = totalHarga + item.harga * item.qty;

      let hargaFormat = "Rp" + item.harga.toLocaleString("id-ID");

      let htmlItem = "<div class='item-keranjang'>" +
                        "<div class='item-keranjang-info'>" +
                          "<h4>" + item.nama + "</h4>" +
                          "<p>" + hargaFormat + " x " + item.qty +"</p>" +
                        "</div>" +
                        "<button class='btn-hapus' data-index='" + index + "'>Hapus</button>" +
                      "</div>";

      daftarKeranjangDiv.innerHTML += htmlItem;
    });
  }

  let totalHargaFormat = "Rp" + totalHarga.toLocaleString("id-ID");
  document.querySelector("#total-harga").textContent = totalHargaFormat;

  // Pasang tombol hapus per item
  let tombolHapus = document.querySelectorAll(".btn-hapus");

  tombolHapus.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      let indexHapus = Number(tombol.getAttribute("data-index"));

      dataKeranjang.splice(indexHapus, 1);

      localStorage.setItem("daftarKeranjang", JSON.stringify(dataKeranjang));
      localStorage.setItem("jumlahKeranjang", dataKeranjang.length);

      location.reload();
    });
  });
}

// ============================================
// HALAMAN DETAIL PRODUK — baca nama produk dari URL, tampilkan detailnya
// ============================================
let detailContainer = document.querySelector("#detail-produk-container");

if (detailContainer) {
  let paramURL = new URLSearchParams(window.location.search);
  let namaProdukDicari = paramURL.get("nama");

  let produkDitemukan = dataProduk.find(function (produk) {
    return produk.nama === namaProdukDicari;
  });

  if (produkDitemukan) {
    let hargaFormat = "Rp" + produkDitemukan.harga.toLocaleString("id-ID");

    let badgeHTML = "";
    if (produkDitemukan.badge !== "") {
      badgeHTML = "<span class='badge'>" + produkDitemukan.badge + "</span>";
    }

    detailContainer.innerHTML =
      badgeHTML +
      "<img src='" + produkDitemukan.gambar + "' alt='" + produkDitemukan.nama + "'>" +
      "<h2>" + produkDitemukan.nama + "</h2>" +
      "<p class='detail-produk-harga'>" + hargaFormat + "</p>" +
      "<p class='detail-produk-deskripsi'>" + produkDitemukan.deskripsi + "</p>" +
      "<button class='btn-tambah' data-nama='" + produkDitemukan.nama + "' data-harga='" + produkDitemukan.harga + "'>Tambah ke Keranjang</button>";

    // PENTING: tombol baru saja dibuat lewat innerHTML di atas,
    // jadi perlu dipasangi event listener sekarang juga.
    pasangEventTombolTambah();
  } else {
    detailContainer.innerHTML = "<p>Produk tidak ditemukan.</p>";
  }
}

// ============================================
// HALAMAN PRODUK — tampilkan semua produk, dengan fitur urutkan berdasarkan harga
// ============================================
let produkContainer = document.querySelector("#produk-container");

function tampilkanProduk(daftarProduk) {
  produkContainer.innerHTML = "";

  daftarProduk.forEach(function (produk) {
    let hargaFormat = "Rp" + produk.harga.toLocaleString("id-ID");

    let badgeHTML = "";
    if (produk.badge !== "") {
      badgeHTML = "<span class='badge'>" + produk.badge + "</span>";
    }

    let cardHTML =
      "<div class='produk-card'>" +
        badgeHTML +
        "<img src='" + produk.gambar + "' alt='" + produk.nama + "'>" +
        "<h3><a href='detail-produk.html?nama=" + produk.nama + "'>" + produk.nama + "</a></h3>" +
        "<p class='deskripsi'>" + produk.deskripsi.split(".")[0] + ".</p>" +
        "<p class='harga'>" + hargaFormat + "</p>" +
        "<button class='btn-tambah' data-nama='" + produk.nama + "' data-harga='" + produk.harga + "'>Tambah ke Keranjang</button>" +
      "</div>";

    produkContainer.innerHTML += cardHTML;
  });

  // Tombol-tombol baru saja dibuat lewat innerHTML,
  // jadi perlu dipasangi event listener setiap kali fungsi ini dipanggil.
  pasangEventTombolTambah();
}

if (produkContainer) {
  tampilkanProduk(dataProduk);

  let dropdownUrutkan = document.querySelector("#urutkan");
  dropdownUrutkan.addEventListener("change", function () {
    let pilihan = dropdownUrutkan.value;
    let produkTerurut = [...dataProduk];

    if (pilihan === "termurah") {
      produkTerurut.sort(function (a, b) {
        return a.harga - b.harga;
      });
    } else if (pilihan === "termahal") {
      produkTerurut.sort(function (a, b) {
        return b.harga - a.harga;
      });
    }

    tampilkanProduk(produkTerurut);
  });
}