import Button from '@/ui/button/Button'
import { ThemeToggleIcon } from '@/assets/icons'
import { useTheme } from '@/context/ThemeContext'

const ThemeToggle = () => {
  const { toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme}>
      <ThemeToggleIcon />
    </Button>
  )
}

export default ThemeToggle
