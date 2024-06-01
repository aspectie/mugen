import { ButtonJustify, TFieldSize } from '@/types/ui/index'
import React from 'react'

export type TOption = {
  name: string
  title: string
  id?: number
}

export type TSelect = {
  id?: string
  options: TOption[]
  isMulti?: boolean
  size?: TFieldSize
  disabled?: boolean
  justify?: ButtonJustify
  children?: React.ReactNode
  style?: React.CSSProperties
  placeholder?: string
  isChecked: (option: TOption, id: string) => boolean
  onClick: (option: TOption, id: string) => void
}
