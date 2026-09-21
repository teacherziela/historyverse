# AGENTS.md — HISTORYVERSE 360 (Cikgu Zamzila)

## Peranan
Anda ialah pembantu pembangunan HISTORYVERSE 360. Utamakan kestabilan portal murid, kemas kini kecil yang selamat, dan jangan padam kandungan yang sudah berfungsi.

## Sumber utama
- Repo utama: teacherziela/historyverse
- Game Bab 10: https://teacherziela.github.io/misi-borneo/
- Repo game Bab 10: teacherziela/misi-borneo

## Peraturan penting
1. Sebelum mengubah portal, baca fail berkaitan dahulu.
2. Jangan ubah reka bentuk, kandungan, pautan atau fungsi lain jika pengguna hanya meminta satu pembaikan kecil.
3. Jangan gantikan pautan GitHub Pages yang masih berfungsi dengan pautan chatgpt.site sementara.
4. Jangan gunakan semula pautan mati:
   - https://game-bab10-sejarah.zam79.chatgpt.site/
5. Untuk Bab 10 Tingkatan 2, gunakan:
   - https://teacherziela.github.io/misi-borneo/
6. Jangan padam statistik, nota, peta minda, game lain, atau kandungan murid tanpa arahan jelas.
7. Jika mengubah soalan Sejarah, rujuk buku teks KSSM yang tersedia dalam projek dan kekalkan fakta tepat.
8. Untuk game, utamakan paparan landscape, mobile-friendly, kawalan jelas, dan pengalaman murid sederhana/lemah.

## Fail utama HISTORYVERSE
- page.tsx — paparan portal dan senarai game
- content.ts — bab, nota interaktif, latihan dan pautan kandungan
- globals.css — tema dan susun atur portal
- public/interaktif/ atau fail interaktif berkaitan — aktiviti/game dalaman jika tersedia

## Aliran kerja Codex
Apabila menerima arahan kemas kini:
1. Kenal pasti repo dan fail yang tepat.
2. Buat perubahan minimum sahaja.
3. Semak semula pautan yang disentuh.
4. Jalankan semakan/build jika persekitaran menyokongnya.
5. Jika build gagal kerana konfigurasi hosting sedia ada, jangan rosakkan struktur portal; laporkan punca.
6. Commit dengan mesej pendek dan jelas.
7. Selepas commit, nyatakan dengan tepat sama ada perubahan hanya berada di GitHub atau sudah live.

## Deployment
- Repo/game yang menggunakan GitHub Pages akan dikemas kini melalui Pages selepas push apabila Pages telah dikonfigurasi.
- HISTORYVERSE versi chatgpt.site TIDAK boleh dianggap auto-deploy hanya kerana GitHub berubah.
- Jangan beritahu pengguna bahawa portal live sudah berubah sehingga deployment live benar-benar disahkan.
- Jika mahu deployment automatik sepenuhnya, gunakan hosting yang disambungkan terus kepada branch main GitHub (contohnya Netlify/Vercel/Cloudflare) dan uji fungsi dinamik sebelum menukar portal utama.

## Gaya perubahan
- Kekalkan identiti HISTORYVERSE 360 Cikgu Zamzila.
- Tema utama: ungu/puteri/istana/sejarah digital apabila sesuai.
- Bahasa antara muka: Bahasa Melayu yang ringkas dan mesra murid.
- Jangan cipta semula keseluruhan projek jika patch kecil mencukupi.
