import type { Meta, StoryObj } from '@storybook/react'
import Heading from './Heading'
import { withColorScheme } from '../../../.storybook/utils/withColorScheme'

const meta = {
  title: 'ui/Heading',
  component: Heading,
  tags: ['autodocs'],
  decorators: [withColorScheme]
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'h3',
    children: 'Hello, my name is Heading!'
  }
}
