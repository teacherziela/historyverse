# HISTORYVERSE 360 • Cikgu Zamzila

Portal pembelajaran Sejarah Tingkatan 1 dan Tingkatan 2 berasaskan gamifikasi,
peta interaktif, nota visual dan permainan pendidikan.

Portal murid: <https://portal-sejarah-zamzila.zam79.chatgpt.site>

## Fail yang selalu dikemas kini

| Bahagian | Lokasi |
|---|---|
| Senarai bab, nota, game dan pautan | `app/content.ts` |
| Paparan utama HISTORYVERSE | `app/page.tsx` |
| Warna, susun atur dan animasi | `app/globals.css` |
| Nota infografik | `public/infografik/` |
| Peta minda | `public/peta-minda/` |
| Peta, timeline dan aktiviti interaktif | `public/interaktif/` |
| Suara Cikgu Zamzila | `public/audio/` |
| Statistik pelawat | `app/api/stats/` dan `db/` |

## Cara tambah nota baharu

1. Buka folder `public/infografik/`.
2. Muat naik gambar nota dengan nama yang jelas, contohnya
   `t1-bab8-topik-8-4.webp`.
3. Buka `app/content.ts` dan tambah nota itu pada tingkatan serta bab yang betul.
4. Simpan perubahan dengan mesej ringkas, contohnya `Tambah nota 8.4`.

## Cara tambah game atau peta

1. Letakkan satu set fail dalam folder baharu di `public/interaktif/`.
2. Pastikan fail permulaan bernama `index.html`.
3. Tambahkan tajuk dan pautannya dalam `app/content.ts`.

## Jalankan di komputer

Memerlukan Node.js 22 atau lebih baharu.

```bash
npm ci
npm run dev
```

## Peringatan

- Jangan padam `.openai/hosting.json`; fail ini menyambungkan projek kepada Sites.
- Jangan letakkan kata laluan, token atau maklumat peribadi murid dalam GitHub.
- Buat satu perubahan kecil bagi setiap commit supaya mudah dipulihkan.

Kod sumber ini ialah salinan pembangunan HISTORYVERSE 360 versi 35.
