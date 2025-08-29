// Load custom commands and suppress uncaught exceptions that are irrelevant to tests
import './commands'

// Fail tests on any uncaught exception by default
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // return false
})
