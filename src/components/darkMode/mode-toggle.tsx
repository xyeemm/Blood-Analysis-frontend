import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/darkMode/darkMode"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {/* Sun */}
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />

      {/* Moon */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}