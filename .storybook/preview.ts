import type { Preview } from '@storybook/react'
import '../.storybook/styles.scss'
import '../app/styles/main.scss'
import '../app/styles/themes/themes.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const globalTypes = {
  scheme: {
    name: 'Scheme',
    description: 'Select light or dark theme',
    defaultValue: 'both',
    toolbar: {
      icon: 'mirror',
      items: ['light', 'dark', 'both'],
      dynamicTitle: true
    }
  }
}

export default preview
