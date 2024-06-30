import { castToAnother } from './api'

// export function prepareSelectData() {
//   return data.map(item => {

//     return {
//
//     }
//   })
// }

export function prepareOption(data) {
  if (typeof data === 'object') {
    return castToAnother(data, {
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
