import { StoryObj, Meta } from '@storybook/react'
import Input from '@/ui/input/Input'

const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '320px' }}>
        <Story></Story>
      </div>
    )
  ]
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    inputType: 'text'
  }
}
