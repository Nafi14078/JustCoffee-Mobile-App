import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  dark: false,
  colors: {
    background: '#fff',
    text: '#151212',
    card: '#f5f5f5',
    border: '#e6e6e6',
    primary: '#a9745b',
  },
};
const darkTheme = {
  dark: true,
  colors: {
    background: '#151212',
    text: '#fff',
    card: '#2c2c2c',
    border: '#333',
    primary: '#a9745b',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
