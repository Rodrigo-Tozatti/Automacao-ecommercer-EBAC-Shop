const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'o5cvxh',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesome-report",
      overwrite: false,
      //reportFilename: "index",
      html: true,
      json: false,
      timestamp: "dd-mm-yyyy_HH-MM",
    },

    baseUrl: 'http://lojaebac.ebaconline.art.br/'
  },
});
