# Ruang Peperiksaan HISTORYVERSE

Paparan masuk di GitHub Pages; aplikasi peperiksaan di Google Apps Script, terikat kepada Google Sheets persendirian. Tiada Sites diperlukan. Kod ini belum disambungkan kepada deployment Apps Script.

## Persediaan sekali sahaja

1. Cipta Google Sheet persendirian baharu. Jangan kongsi dengan murid.
2. Buka **Extensions → Apps Script**. Salin `apps-script/Code.gs`, cipta fail HTML `Student` dan `Teacher` daripada fail yang dibekalkan. Paparkan fail manifest dalam Project Settings dan gunakan `appsscript.json`.
3. Dalam editor, jalankan `setup_`, benarkan akses akaun guru, kemudian muat semula Google Sheet.
4. Buka menu **Peperiksaan → Panel guru**. Panel hanya menerima akaun guru yang menjalankan persediaan. Tiada kata laluan atau token guru pada GitHub.
5. Import fail soalan JSON yang dibekalkan secara peribadi. **Jangan muat naik soalan, skema, helaian jawapan atau fail import ke repositori awam.**
6. Masukkan 20 jawapan objektif rasmi. Semak semua kandungan, termasuk bahan rangsangan yang ditukar kepada teks. Fail Word asal tidak diubah.
7. Soalan 5 ialah 20 markah, Soalan 6 asal 22 markah. Tetapan asal 6(a)=6 dikekalkan sehingga guru mengesahkan penyelarasan kepada 4. Aktivasi disekat selagi jumlah tidak setara (20).
8. Tetapkan masa mula Malaysia, kod masuk dan pengesahan kertas. Jangan aktifkan peperiksaan sebenar sebelum ujian percubaan berasingan.
9. **Deploy → New deployment → Web app**: Execute as **Me**, access **Anyone** jika polisi akaun membenarkan murid masuk tanpa akaun. Hanya aplikasi murid dibuka; Sheet kekal persendirian. Jika sekolah mengehadkan tetapan ini, gunakan akses domain dan uji akaun murid sebenar.
10. Salin URL `/exec` ke `config.js`, kemudian push GitHub. Buka `/peperiksaan/` pada GitHub Pages. Jangan gantikan `index.html` utama Historyverse (fail sedia ada ialah game Melaka).

## Penandaan

Dalam Google Sheet, pilih **Peperiksaan → Panel guru → Tanda jawapan**. Pilih murid; setiap jawapan struktur dan esei dipaparkan di bawah soalan, dengan kotak markah guru. Objektif dikira di pelayan menggunakan skema persendirian. Esei ditanda mengikut pilihan murid sahaja. Markah kosong bermaksud belum ditanda, berbeza daripada sifar. Jumlah dan peratus akhir muncul setelah 15 pecahan struktur/esei lengkap ditanda. Rekod tersedia pada tab **Markah** dan boleh dieksport sebagai CSV melalui panel.

## Masa dan simpanan

- A: minit 0–15; B: 15–55; C: 55–85. Pelayan menyekat simpanan selepas masa setiap bahagian.
- Tempoh 85–90 boleh digunakan untuk pengesahan penerimaan sahaja; jawapan tidak boleh diubah selepas minit 85. Simpanan yang telah diterima kekal tersedia kepada guru walaupun murid tidak menekan Hantar.
- Murid boleh bergerak ke soalan sebelumnya/seterusnya dalam bahagian aktif. Struktur memaparkan satu soalan utama bersama a–c; esei memaparkan satu soalan pilihan bersama a–c.
- Jawapan disimpan selepas jeda menaip, sebelum navigasi, atau apabila Simpan sekarang ditekan. Teks disimpan secara setempat sementara menunggu pelayan; kegagalan penghantaran dipaparkan dengan jelas.
- Satu nama dan kelas menghasilkan satu percubaan. Gunakan satu tab/peranti. Kegagalan peranti memerlukan bantuan guru; sistem tidak memberikan semula token sesi berdasarkan nama sahaja.
- Pendaftaran pertama mengunci jadual dan kertas. Untuk sesi seterusnya, sediakan helaian dan projek Apps Script baharu; jangan ubah tetapan secara manual ketika peperiksaan berjalan.

## Ujian dan batasan

Jalankan `node --test peperiksaan/tests/exam.test.mjs` tanpa pemasangan pakej. Ujian merangkumi masa serentak, skop bahagian, kerahsiaan skema, kebenaran guru, simpanan lapuk, pendua pendaftaran, penandaan dan jumlah esei.

Masih perlu ujian integrasi Google sebenar: telefon/laptop, akses tanpa akaun, import, pendaftaran, simpanan semasa sambungan terputus, penandaan guru dan muat turun. Jalankan raptai menggunakan helaian berasingan dan bilangan murid yang mewakili kelas untuk mengukur had kelajuan/kuota Apps Script. Jangan dakwa bebas tiru; jadual serentak tidak menghalang penggunaan peranti lain.

Rujukan rasmi: [Web apps](https://developers.google.com/apps-script/guides/web), [komunikasi HTML dan fungsi persendirian](https://developers.google.com/apps-script/guides/html/communication), [identiti pengguna](https://developers.google.com/apps-script/reference/base/session).
