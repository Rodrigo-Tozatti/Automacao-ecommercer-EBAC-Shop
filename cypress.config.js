const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'o5cvxh',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },reporterOptions: {
      reportDir: "cypress/report/mochawesome-report",
      overwrite: true,
      html: true,
      json: false,
      timestamp: "mmddyyyy_HHMMss",
    },

    baseUrl: 'http://lojaebac.ebaconline.art.br/'
  },
});
