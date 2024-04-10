import { TOption } from './select'

export enum FilterType {
  detailed = 'detailed',
  small = 'small'
}

export type TFilterType = `${FilterType}`

export type TFilterSelection = {
  name: string
  options: TOption[]
}
