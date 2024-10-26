import { toAnotherObject } from '../convert'
import { TOption } from '@shared/ui'

export function prepareOption<T>(data: T): TOption {
  if (data && typeof data === 'object') {
    return prepareOptionFromObj(data)
  }
  if (typeof data === 'string') {
    return {
      name: data,
      title: data
    }
  }
  throw new Error('Invalid data type')
}

export function prepareOptionFromObj(data: object): TOption {
  const res = toAnotherObject(data, {
    title: 'title',
    name: 'name',
    id: 'id'
  })

  if (!res.id) {
    delete res.id
  }

  if (!res.title) {
    res.title = res.name
  }

  return res
}
