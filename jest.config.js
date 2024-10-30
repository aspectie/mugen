export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', 'pages', 'routes'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
