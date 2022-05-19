export default {
  preset: "@shelf/jest-mongodb",
  roots: ["./src"],
  collectCoverageFrom: ["./src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: { ".+\\.ts$": "ts-jest" },
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8"
}
