import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ThemeToggleBtn = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 dark:scale-0 transition-all" />
      <Moon className="absolute h-5 w-5 scale-0 dark:scale-100 transition-all" />
    </Button>
  );
};

export default ThemeToggleBtn;
