// Import halaman LoginPage
import LoginPage from "../pages/LoginPage"

describe('Forgot Password', () => {
  it('should request password reset', () => {

    // 1. Kunjungi halaman "Forgot Password" OrangeHRM
    // URL ini langsung menuju ke form request reset password
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')

    // 2. Isi field username dengan "Admin"
    // Selector input[name="username"] mengacu pada kolom username
    cy.get('input[name="username"]').type('Admin')

    // 3. Klik tombol "Reset Password"
    // Tombol ini bertipe submit sehingga akan mengirimkan form
    cy.get('button[type="submit"]').click()

    // 4. Verifikasi bahwa URL sudah berpindah ke halaman "sendPasswordReset"
    // Hal ini menandakan bahwa request reset berhasil diproses oleh sistem
    cy.url().should('include', '/auth/sendPasswordReset')

    // 5. Pastikan pesan konfirmasi muncul di halaman
    // Pesan default dari OrangeHRM demo: "Reset Password link sent successfully"
    // dengan ini kita tahu user mendapatkan feedback bahwa reset password sudah dikirim
    cy.contains('Reset Password link sent successfully').should('be.visible')
  })
})
