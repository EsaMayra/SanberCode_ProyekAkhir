# OrangeHRM Cypress POM + Intercept

Automasi E2E untuk website **OrangeHRM Demo** menggunakan **Cypress**, **Page Object Model (POM)**, dan **`cy.intercept`**.

## Fitur yang di-otomasi
- Login (sukses & gagal) — menggunakan intercept untuk request autentikasi
- Forgot Password — menggunakan intercept untuk request reset
- Dashboard > Directory — navigasi, pencarian, dan reset dengan intercept untuk request data direktori

## Struktur Proyek
```text
cypress/
  e2e/
    login.cy.js
    forgot_password.cy.js
    directory.cy.js
  pages/
    LoginPage.js
    ForgotPasswordPage.js
    DashboardPage.js
    DirectoryPage.js
  support/
    commands.js
    e2e.js
cypress.config.js
cypress.env.json
package.json
```

## Menjalankan secara lokal
1. Install dependencies
   ```bash
   npm install
   ```
2. (Opsional) ubah kredensial demo di `cypress.env.json`:
   ```json
   { "username": "Admin", "password": "admin123" }
   ```
3. Jalankan Cypress
   ```bash
   npm run cypress:open
   # atau headless
   npm run cypress:run
   ```

## Publish ke GitHub
```bash
git init
git add .
git commit -m "Add Cypress POM + intercept for OrangeHRM demo"
git branch -M main
git remote add origin https://github.com/<username>/orangehrm-cypress-pom-intercept.git
git push -u origin main
```

Setelah itu, salin **link GitHub**-nya dan tempel pada kolom jawaban tugas Anda.
