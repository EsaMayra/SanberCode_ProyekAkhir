import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'

describe('Login - OrangeHRM Demo', () => {
  const login = new LoginPage()
  const dashboard = new DashboardPage()

  it('should login successfully with valid credentials (UI + intercept)', () => {
    // 1: Buka halaman login OrangeHRM demo
    // Menggunakan baseUrl + path auth/login
    cy.visit('/web/index.php/auth/login')

    // 2: Setup intercept untuk memantau request login
    // Saat user men-submit login form, sistem akan memanggil endpoint POST /auth/validate
    // Intercept ini diberi alias @loginRequest agar mudah ditunggu/diakses nanti
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    // 3: Input username dan password yang valid
    // Username & password diambil dari konfigurasi Cypress.env
    // supaya tidak hardcode di dalam test
    login.typeUsername(Cypress.env('username'))
    login.typePassword(Cypress.env('password'))

    // Klik tombol submit untuk login
    login.submit()

    // 4: Tunggu response dari API login
    // - Jika sukses, biasanya response adalah 302 (redirect) → menuju dashboard
    // - Kadang ada implementasi yang langsung 200 (OK)
    // Jadi test ini mengizinkan keduanya agar lebih fleksibel
    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    // 5: Validasi bahwa user berhasil masuk ke dashboard
    // Mengecek URL sudah sesuai dengan halaman dashboard
    dashboard.urlShouldBeDashboard()

    // Mengecek elemen UI tertentu (misalnya user dropdown di pojok kanan atas)
    // untuk memastikan halaman dashboard benar-benar sudah dimuat
    dashboard.userDropdown().should('exist')
  })

  it('should show error on invalid password', () => {
    // 1: Buka halaman login OrangeHRM demo
    cy.visit('/web/index.php/auth/login')

    // 2: Input username valid, tapi password salah
    // Tujuannya untuk memicu pesan error "Invalid credentials"
    login.typeUsername(Cypress.env('username'))
    login.typePassword('wrongpass')

    // Klik tombol submit untuk mencoba login
    login.submit()

    // 3: Validasi pesan error muncul di layar
    // Menggunakan regex agar lebih fleksibel (case-insensitive)
    cy.contains(/Invalid credentials/i).should('be.visible')
  })
})
