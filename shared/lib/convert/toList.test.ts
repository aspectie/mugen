import { describe } from 'jest-circus'
import { expect, test } from '@jest/globals'
import { COMMA } from '@shared/constants'
import { toList } from './'

describe('toList', () => {
  test('returns list with values', () => {
    expect(
      toList(
        [
          {
            value: 'a'
          },
          {
            value: 'b'
          },
          {
            value: 'c'
          }
        ],
        'value',
        COMMA
      )
    ).toBe('a, b, c')
  })

  test('returns list with values of existing keys in objects', () => {
    expect(
      toList(
        [
          {
            value: 'a'
          },
          {
            other: 'b'
          }
        ],
        'other',
        COMMA
      )
    ).toBe('b')
  })

  test('returns empty string if there are no objects with passed key', () => {
    expect(
      toList(
        [
          {
            value: 'a'
          }
        ],
        'other',
        COMMA
      )
    ).toBe('')
  })
})
