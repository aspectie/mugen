import { ButtonJustify, TFieldSize } from '@/types/ui/index'
import React from 'react'
import { TSelectedOptions } from '@/types/ui/filter'

export type TOption = {
  name: string
  title: string
  id?: number
}

export type TSelect = {
  optionName?: string
  options: TOption[]
  isMulti?: boolean
  size?: TFieldSize
  disabled?: boolean
  justify?: ButtonJustify
  children?: React.ReactNode
  style?: React.CSSProperties
  placeholder?: string
  onClick: (option: TOption, id: string) => void
  selectedOptions: TSelectedOptions
}
