class DirectoryPage {
  // Method untuk setup intercept agar Cypress bisa "mengintip"
  // request API saat melakukan pencarian employee di menu Directory
  interceptDirectory() {
    cy.intercept('GET', '/web/index.php/api/v2/directory/employees*').as('getEmployees')
  }

  // Ambil elemen header dari halaman Directory
  header() {
    return cy.get('h6.oxd-text--h6')
  }

  // Input untuk mengetik nama employee (autocomplete search)
  nameInput() {
    return cy.get('input[placeholder="Type for hints..."]')
  }

  // Tombol untuk melakukan pencarian
  searchBtn() {
    return cy.get('button[type="submit"]')
  }

  // Mengambil daftar card hasil pencarian employee
  // timeout diperpanjang (20 detik) untuk mengantisipasi loading lama
  cards() {
    return cy.get('.oxd-grid-item.oxd-grid-item--gutters', { timeout: 20000 })
  }

  // Fungsi untuk mencari employee berdasarkan nama
  searchByName(name) {
    // Setup intercept dulu biar bisa menunggu API response
    this.interceptDirectory()

    // Ketik sebagian nama agar muncul suggestion dropdown
    this.nameInput().clear().type(name.substring(0, 5))

    // Klik salah satu suggestion sesuai nama yang diinput
    cy.contains('.oxd-autocomplete-dropdown', name, { timeout: 10000 }).click()

    // Klik tombol search
    this.searchBtn().click()

    // Tunggu response dari API pencarian employee
    cy.wait('@getEmployees', { timeout: 15000 })
  }
}

export default DirectoryPage
