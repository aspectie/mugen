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

export type TFilterSelects = {
  [selectName: string]: TOption[]
}

export type TFilterParams = {
  params?: TFilterSelects
  search?: string
}
