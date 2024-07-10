import Button from '@/ui/button/Button'
import { ThemeToggleIcon } from '@/assets/icons'

const ThemeToggle = () => {
  return (
    <Button>
      <ThemeToggleIcon className="bg-black-100 dark:bg-white" />
    </Button>
  )
}

export default ThemeToggle
