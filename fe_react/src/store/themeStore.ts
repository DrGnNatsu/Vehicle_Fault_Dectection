import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: (checked?: boolean) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: (checked) => {
        const newValue = checked !== undefined ? checked : !get().isDarkMode;
        set({ isDarkMode: newValue });
        document.documentElement.classList.toggle('dark', newValue);
      },
      initTheme: () => {
        const isDark = get().isDarkMode;
        document.documentElement.classList.toggle('dark', isDark);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
