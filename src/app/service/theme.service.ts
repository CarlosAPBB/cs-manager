import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly lightTheme = 'assets/themes/saga-blue.css';
  private readonly darkTheme = 'assets/themes/vela-blue.css';
  private readonly themeKey = 'user-theme';

  constructor() {
    this.loadUserTheme();
  }

  switchTheme(isDarkMode: boolean): void {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    const selectedTheme = isDarkMode ? this.darkTheme : this.lightTheme;

    themeLink.href = selectedTheme;
    this.saveUserTheme(isDarkMode);
  }

  private loadUserTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey);
    const isDarkMode = storedTheme === 'dark';
    this.switchTheme(isDarkMode);
  }

  private saveUserTheme(isDarkMode: boolean): void {
    localStorage.setItem(this.themeKey, isDarkMode ? 'dark' : 'light');
  }

  isDarkMode(): boolean {
    return localStorage.getItem(this.themeKey) === 'dark';
  }
}
