module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**", "!src/database/migrations/**"],
  coverageDirectory: "./tests/coverage",
  coverageProvider: "v8",
  testMatch: ["**/tests/**/*.test.js?(x)"],
};
