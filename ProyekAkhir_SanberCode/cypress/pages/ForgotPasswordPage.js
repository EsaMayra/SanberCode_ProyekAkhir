class ForgotPasswordPage {
  // Input username untuk reset password
  usernameInput() { return cy.get('input[name="username"], input.oxd-input') }

  // Tombol reset/search untuk kirim request reset password
  resetBtn() { return cy.contains('button', /reset|search/i) }

  // Tombol cancel
  cancelBtn() { return cy.contains('button', /cancel/i) }

  // Pesan sukses setelah request berhasil (alert konfirmasi)
  successAlert() { return cy.contains(/link has been sent|reset password link/i) }

  // Akses langsung halaman forgot password
  visit() { cy.visit('/web/index.php/auth/requestPasswordResetCode') }

  // Proses request reset password berdasarkan username
  requestReset(username) {
    // Intercept request API untuk reset password
    cy.intercept('POST', /sendPasswordReset|requestPasswordReset|resetRequest/i).as('resetReq')

    // Isi username lalu klik reset
    this.usernameInput().clear().type(username)
    this.resetBtn().click()

    // Tunggu API response (reset link terkirim)
    cy.wait('@resetReq', { timeout: 15000 })
  }
}

export default ForgotPasswordPage
