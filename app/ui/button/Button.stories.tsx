import type { Meta, StoryObj } from '@storybook/react'
import Button from '@/ui/button/Button'
import { withColorScheme } from '../../../.storybook/utils/withColorScheme'

const meta: Meta = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [withColorScheme]
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Click me!',
    type: 'primary',
    size: 'medium'
  }
}

export const PrimaryDisabled: Story = {
  args: {
    text: 'Click me!',
    type: 'primary',
    size: 'medium',
    disabled: true
  }
}

export const Secondary: Story = {
  args: {
    text: 'Click me!',
    size: 'medium',
    type: 'secondary'
  }
}

export const Ghost: Story = {
  args: {
    text: 'Click me!',
    type: 'ghost'
  }
}

export const Transparent: Story = {
  args: {
    text: 'Click me!',
    type: 'transparent'
  }
}
