import { Button } from 'shared/ui'
import { MoonIcon, SunIcon } from '@/assets/icons'
import { Theme, useTheme } from '../lib/useTheme'

export function ThemeToggle() {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme(prevTheme =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    )
  }

  return (
    <Button
      type="transparent"
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? (
        <SunIcon className="fill-white stroke-white hover:fill-accent-100 hover:stroke-accent-100" />
      ) : (
        <MoonIcon className="fill-white hover:fill-accent-100" />
      )}
    </Button>
  )
}
