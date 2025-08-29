const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
  video: false
})
