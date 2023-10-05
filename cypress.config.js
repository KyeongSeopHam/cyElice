const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'sjwo6q',
  e2e: {
    baseUrl: 'https://accounts.elice.io/',
    supportFile: false
    },
  },
);
