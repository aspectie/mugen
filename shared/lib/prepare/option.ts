import { toAnotherObject } from '../convert'

export function prepareOption(data: unknown) {
  if (typeof data === 'object') {
    return toAnotherObject(data, {
      title: 'title',
      name: 'name',
      id: 'id'
    })
  }
  if (typeof data === 'string') {
    return {
      name: data
    }
  }
}
