class DashboardPage {
  // Pastikan URL dashboard benar
  urlShouldBeDashboard() {
    cy.url().should('include', '/dashboard/index')
  }

  // Dropdown user di kanan atas (ikon profile)
  userDropdown() {
    return cy.get('.oxd-userdropdown')
  }

  // Menu Directory
  directoryMenu() {
    return cy.get('a[href*="/directory"]')
  }
}

export default DashboardPage
