'use client';

import { useEffect, useSyncExternalStore } from 'react';

function getThemeSnapshot(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ?? 'light';
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function setThemeValue(value: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem('theme', value);
  listeners.forEach((l) => l());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setThemeValue(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeValue('dark');
    }
  }, []);

  const toggle = () => {
    setThemeValue(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span className="theme-toggle__icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
