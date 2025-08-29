class LoginPage {
  // Locator field username
  usernameField() {
    return cy.get('input[name="username"]')
  }

  // Locator field password
  passwordField() {
    return cy.get('input[name="password"]')
  }

  // Locator tombol submit (login)
  submitBtn() {
    return cy.get('button[type="submit"]')
  }

  // Action: isi username
  typeUsername(username) {
    this.usernameField().clear().type(username)
  }

  // Action: isi password
  typePassword(password) {
    this.passwordField().clear().type(password)
  }

  // Action: klik login (dibuat wrapper biar lebih clean)
  submit() {
    this.submitBtn().click()
  }
}

export default LoginPage
