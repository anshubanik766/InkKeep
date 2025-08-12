import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="setting-item">
        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
