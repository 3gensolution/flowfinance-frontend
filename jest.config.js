const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/*.spec.js",
    "**/tests/**/*.test.ts",
    "**/tests/**/*.spec.ts",
    "**/tests/**/*.test.tsx",
    "**/tests/**/*.spec.tsx",
  ],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/common/(.*)$": "<rootDir>/src/common/$1",
    "^@/ui/(.*)$": "<rootDir>/src/ui/$1",
    "^@flxfleet-frontend-apps/component-library$":
      "<rootDir>/__mocks__/flxfleetComponentLibrary.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!@flxfleet-frontend-apps/component-library)"],
};

module.exports = createJestConfig(customJestConfig);
