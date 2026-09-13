# Panduan Asset Gambar Proyek Portfolio

Folder ini adalah tempat menyimpan screenshot, mockup, atau diagram arsitektur untuk masing-masing proyek di website portfolio.

## Struktur Folder:
```
public/
  projects/
    pandawa/
      cover.png         <- Gambar utama / mockup proyek PANDAWA
      screen-1.png      <- (Opsional) Screenshot tambahan
    ayohiling/
      cover.png         <- Gambar utama / mockup Ayo Hiling
    basoin/
      cover.png         <- Gambar utama / mockup BasoIn Web-GIS
    perumda/
      cover.png         <- Gambar utama / dashboard EGRC Tirta Raharja
    smart-archery/
      cover.png         <- Gambar utama / mockup SmartArchery (YOLO11 Pose)
      architecture.png  <- Diagram alur deteksi & integrasi pelatih
    belanja-yuk/
      cover.png         <- Gambar utama / diagram pipeline Belanja Yuk!
      arch.png          <- Diagram arsitektur pipeline data
```

## Spesifikasi Rekomendasi Gambar:
1. **Format File**: `.png`, `.jpg`, atau `.webp` (rekomendasi `.webp` atau `.png` beresolusi tajam).
2. **Aspek Rasio**: `16:9` (Contoh ukuran: `1920x1080` atau `1280x720`).
3. **Ukuran File**: Usahakan di bawah `1 MB` per gambar agar loading website tetap secepat kilat.

## Cara Mengaitkan Gambar ke Proyek:
Buka file `src/data.ts`, lalu pada bagian proyek yang bersangkutan, isi atau ganti property `coverImage`:
```typescript
coverImage: '/projects/belanja-yuk/cover.png',
```
*Catatan: Jika gambar belum dimasukkan atau file belum ada, sistem portfolio otomatis menampilkan kartu ilustrasi teknis/skematik yang tetap terlihat profesional.*
