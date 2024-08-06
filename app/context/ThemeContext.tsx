import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface ThemeContext {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider />')
  }
  return context
}

export { ThemeProvider, useTheme }
