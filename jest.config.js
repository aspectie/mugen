import tsConfig from './tsconfig.json' with { type: 'json' }
import { pathsToModuleNameMapper } from 'ts-jest'

export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', 'pages', 'routes'],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
