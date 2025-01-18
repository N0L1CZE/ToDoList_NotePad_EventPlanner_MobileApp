import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MojeAplikace',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Zobrazí splash screen na 3 sekundy
      launchAutoHide: true, // Automaticky skrýt splash screen
      backgroundColor: '#910814', // Barva pozadí splash screenu
      androidScaleType: 'CENTER_CROP', // Typ škálování pro Android
      showSpinner: true, // Zobrazí spinner (načítací indikátor)
      iosSpinnerStyle: 'small', // Styl spinneru pro iOS
      androidSpinnerStyle: 'large', // Styl spinneru pro Android
      spinnerColor: '#ffffff', // Barva spinneru
    },
  },
};

export default config;
