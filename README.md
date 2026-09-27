# Website Undangan Pernikahan Digital (Modern Minimalis)

Website undangan pernikahan statis dengan tema modern minimalis, dominan warna putih berpadu dengan aksen hangat stone & champagne gold, serta langsung memutarkan lagu **Payung Teduh - Akad** saat diakses.

## Fitur Utama

1. **Pemutaran Audio Otomatis & Pemutar Musik Melayang**:
   - Memutarkan lagu *Payung Teduh - Akad* (tersedia format `.m4a` dan `.webm` lokal beresolusi tinggi).
   - Gerbang pembuka (*Cover Gate / Sampul Pembuka*) interaktif dengan tombol **"Buka Undangan"** yang memastikan audio terputar mulus sesuai aturan keamanan browser (*Autoplay Policy*).
   - Widget piringan hitam melayang (*floating vinyl disc*) interaktif di sudut kanan bawah dengan animasi rotasi dan indikator gelombang suara (*equalizer*), dapat di-pause dan di-play kembali kapan saja.

2. **Logo & Monogram Proporsional**:
   - Monogram **R & A** dibuat dengan emblem kapsul proporsional berkunci `white-space: nowrap` agar huruf dan simbol ampersand selalu berdampingan secara horizontal, tidak terpotong atau bertumpuk ke bawah di layar mana pun (baik smartphone kecil maupun monitor lebar).
   - Judul nama mempelai (`Raditya & Amanda`) dilindungi dengan pemisahan kata fleksibel agar nama tidak terpotong canggung saat dibuka di ponsel.

3. **Ikon Profil Mempelai Minimalis**:
   - Foto mempelai pria dan wanita telah digantikan dengan ikon siluet profil minimalis (*custom vector medallion* bergaya modern kontemporer) yang bersih, elegan, dan estetik.

4. **Halaman / Bagian Susunan Acara (Rundown)**:
   - Dilengkapi sistem tab interaktif tanpa *reload* halaman:
     - **Hari Pertama: Akad Nikah** (Sabtu, 24 Oktober 2026) mencakup registrasi, khutbah nikah, ijab qabul, hingga prosesi sungkeman.
     - **Hari Kedua: Resepsi Pernikahan** (Minggu, 25 Oktober 2026) mencakup penyambutan tamu, kirab pengantin, santap siang, hingga sesi foto bersama.

5. **Halaman / Bagian Dokumentasi & Galeri Foto**:
   - Galeri foto dokumentasi momen bernuansa minimalis estetis.
   - Dilengkapi penampil modal foto (*Lightbox Modal*) interaktif saat foto diklik, lengkap dengan keterangan momen dan tombol tutup (dapat ditutup juga dengan tombol Escape pada keyboard).

6. **Desain Mobile-First (Sangat Nyaman di Layar HP/Smartphone)**:
   - Tata letak responsif dengan *fluid typography* (`clamp()`) yang menyesuaikan ukuran layar tanpa merusak proporsi teks.
   - Bilah navigasi bawah (*Bottom Navigation Bar*) melayang khusus di perangkat seluler dengan 5 menu cepat (Beranda, Mempelai, Acara, Galeri, RSVP) serta area sentuh jari yang nyaman (minimal 44px).
   - Tidak ada *horizontal overflow* atau teks terpotong.

7. **Personalisasi Nama Tamu Dinamis (URL Parameter)**:
   - Tambahkan parameter `?to=Nama+Tamu`:
     - Contoh: `index.html?to=Budi+Santoso`
     - Contoh: `index.html?to=Keluarga+Besar+Bpk+Hendra`
   - Nama tamu akan otomatis tampil di kartu sampul pembuka dan langsung mengisi kolom nama pada formulir RSVP.

8. **Hitung Mundur (*Live Countdown Timer*)**:
   - Menghitung mundur secara *real-time* menuju hari H pernikahan (Hari, Jam, Menit, Detik).

9. **Konfirmasi Kehadiran (RSVP) & Buku Tamu Digital Interaktif**:
   - Formulir RSVP dengan pilihan status kehadiran (Hadir, Berhalangan, Masih Ragu), jumlah tamu, serta pesan ucapan doa restu.
   - Tersimpan langsung di peramban pengunjung (*localStorage*) dan tampil secara instan di daftar *Doa Restu*.

10. **Amplop Digital & Kado Fisik**:
    - Informasi transfer Bank BCA dan Bank Mandiri.
    - Tombol **"Salin Nomor Rekening"** dan **"Salin Alamat"** 1-klik dengan notifikasi *toast*.

11. **Integrasi Google Maps & Kalender**:
    - Sematan peta interaktif The Glass House Jakarta dan tombol rute Google Maps.
    - Tombol **"Simpan ke Kalender"** (*Google Calendar*) untuk hari Akad dan Resepsi.

## Cara Menjalankan

Buka berkas `index.html` langsung di peramban web apa pun, atau jalankan server lokal:

```bash
# Menggunakan Python
python3 -m http.server 8080
```

Buka di browser:
- `http://localhost:8080/index.html`
- `http://localhost:8080/index.html?to=Bapak+Joko+Santoso`
