"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleChangeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <>
            <Button size="icon" onClick={handleChangeTheme} variant={"outline"}>
                <Sun
                    id="icon-sun-mode-toggle"
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0 "
                />
                <Moon
                    id="icon-moon-mode-toggle"
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 "
                />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    );
}
