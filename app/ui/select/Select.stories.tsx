import type { Meta, StoryObj } from '@storybook/react'
import Select from '@/ui/select/Select'

const meta = {
  title: 'ui/select',
  component: Select,
  tags: ['autodocs']
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: [],
    onChange: () => {}
  }
}
