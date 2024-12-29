const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  workers: 10, // Parallel execution
  timeout: 0, // Disable test timeout
  use: {
    headless: true,
    trace: 'on-first-retry', // Capture trace for failed tests
    screenshot: 'only-on-failure', // Take screenshots for failed tests
  },
});
