import { TOption } from './select'

export enum FilterType {
  detailed = 'detailed',
  small = 'small'
}

export type TFilterType = `${FilterType}`

export type TFilterSelection = {
  title: string
  name: string
  options: TOption[]
}

export type TSelectedOptions = {
  [key: string]: TOption[]
}
