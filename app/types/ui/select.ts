import { ButtonJustify, TFieldSize } from '@/types/ui/index'
import React from 'react'

export type TOption = {
  name: string
  title: string
}

export type TSelect = {
  value?: TOption[]
  isMulti?: boolean
  options: TOption[]
  size?: TFieldSize
  disabled?: boolean
  justify?: ButtonJustify
  children?: React.ReactNode
  onChange: (option: TOption) => void
  style?: React.CSSProperties
  placeholder?: string
}
