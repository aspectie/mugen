import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '@/ui/checkbox/Checkbox'

const meta = {
  title: 'ui/Checkbox',
  component: Checkbox,
  tags: ['autodocs']
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Check me!',
    id: '1',
    isChecked: false,
    onChange: () => {
      console.log('Ты кликнул!')
    }
  }
}

export const Checked: Story = {
  args: {
    text: 'Check me!',
    id: '1',
    isChecked: true,
    onChange: () => {
      console.log('Ты кликнул!')
    }
  }
}
