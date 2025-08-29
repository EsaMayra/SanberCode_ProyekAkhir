Proyek akhir ini adalah implementasi pengujian otomatis (automation testing) menggunakan Cypress pada aplikasi [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/).  
Pengujian dilakukan dengan metode UI Testing dan API Intercept untuk memverifikasi fitur-fitur utama pada aplikasi.

---

## 📌 Fitur yang Diuji

### 1. Login
- Login berhasil (UI + Intercept) dengan kredensial valid.
- Login gagal dengan password salah (muncul error message).
- Login dengan Session menggunakan `cy.session()` agar login tidak perlu diulang di setiap test case.

### 2. Forgot Password
- Request reset password dengan mengisi username/email.
- Validasi pesan sukses: "Reset Password link sent successfully".

### 3. Directory (Employee Search)
- Melakukan pencarian karyawan berdasarkan nama.
- Memastikan data dari API ditampilkan di UI (card hasil pencarian).
- Menggunakan intercept untuk menunggu response dari endpoint `GET /directory/employees`.
