module.exports = () => {
  const rootDir = process.env.INIT_CWD;
  return {
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
        diagnostics: false,
      },
      SpreadsheetApp: {},
    },
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'json', 'd.ts', 'ts', 'tsx'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    rootDir,
  };
};
