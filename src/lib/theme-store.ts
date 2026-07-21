type Listener = () => void;
type Theme = "light" | "dark";

const listeners = new Set<Listener>();

export function subscribeTheme(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function getThemeServerSnapshot() {
  return false;
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  root.style.colorScheme = next;
  localStorage.setItem("theme", next);
  listeners.forEach((listener) => listener());
}
