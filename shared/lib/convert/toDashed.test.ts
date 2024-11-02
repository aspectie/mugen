import { toDashed } from './'
import { expect, test } from '@jest/globals'
import { describe } from 'jest-circus'

describe('toDashed', () => {
  test('should return dashed-value', () => {
    expect(toDashed('Test Value')).toBe('test-value')
  })

  test('should return empty string', () => {
    expect(toDashed(' ')).toBe('')
  })

  test('should return many-same-dashed value', () => {
    expect(toDashed('many-already-dashed')).toBe('many-already-dashed')
  })
})
