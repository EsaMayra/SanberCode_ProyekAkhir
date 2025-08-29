// Import class dari Page Object Model (POM) untuk Dashboard dan Directory
import DashboardPage from '../pages/DashboardPage'
import DirectoryPage from '../pages/DirectoryPage'

// Inisialisasi objek dari masing-masing page
const dashboard = new DashboardPage()
const directory = new DirectoryPage()

// Test suite untuk Directory di OrangeHRM
describe('OrangeHRM Directory Test', () => {

  // beforeEach akan dijalankan sebelum setiap test case
  beforeEach(() => {
    // Login menggunakan custom command (didefinisikan di support/commands.js)
    // Agar setiap test case sudah dalam kondisi login
    cy.login('Admin', 'admin123')
  })

  // Test case: Membuka menu Directory dan melakukan pencarian karyawan
  it('should open Directory and search employee by name with intercept', () => {
    
    // 1: Buka halaman Dashboard setelah login
    cy.visit('/web/index.php/dashboard/index')

    // 2: Klik menu Directory di sidebar
    dashboard.directoryMenu().click()

    // Verifikasi URL sudah berubah ke halaman directory
    cy.url().should('include', '/directory')

    // 3: Setup intercept untuk memantau request API ke endpoint directory
    // Saat kita melakukan pencarian, aplikasi akan memanggil API employees
    cy.intercept('GET', '**/api/v2/directory/employees*').as('getEmployees')

    // 4: Isi field search dengan nama employee
    // Fungsi searchByName() sudah dibuat di POM DirectoryPage
    directory.searchByName('Peter Mac Anderson')

    // 5: Tunggu request API selesai dan pastikan status respons 200 (OK)
    cy.wait('@getEmployees')
      .its('response.statusCode')
      .should('eq', 200)

    // 6: Verifikasi hasil pencarian ditampilkan di UI
    // Pastikan card employee muncul sesuai hasil API
    directory.cards().should('exist')
  })
})
