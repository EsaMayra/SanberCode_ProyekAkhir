// Import LoginPage untuk digunakan pada loginUI command
import LoginPage from '../pages/LoginPage'

// ✅ Custom command untuk login via UI menggunakan Page Object Model
Cypress.Commands.add('loginUI', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  const login = new LoginPage()
  cy.visit('/web/index.php/auth/login')          // buka halaman login
  login.typeUsername(username)                   // isi username
  login.typePassword(password)                   // isi password
  login.submit()                                 // klik login
})

// ✅ Custom command untuk login dengan session agar lebih cepat (caching session)
// Cocok untuk banyak test agar tidak perlu login berulang kali
Cypress.Commands.add('loginSession', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  cy.session([username, password], () => {
    cy.visit('/web/index.php/auth/login')
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password, { log: false }) // password tidak ditampilkan di log

    // Intercept request API login
    cy.intercept('POST', /auth\/validate|authentication|login/i).as('loginReq')

    // Klik tombol login
    cy.get('button[type="submit"]').click()

    // Tunggu response login dari API
    cy.wait('@loginReq', { timeout: 15000 })

    // Pastikan URL berubah ke dashboard
    cy.url().should('include', '/dashboard')
  })
})

// ✅ Custom command login sederhana (tanpa intercept/session)
// Bisa dipakai untuk test ringan
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/web/index.php/auth/login')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})
