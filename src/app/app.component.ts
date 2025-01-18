import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Ukázka manuálního zobrazení a skrytí splash screenu
    SplashScreen.show({
      showDuration: 3000, // Doba zobrazení splash screenu (3 sekundy)
      autoHide: false, // Nevypínat automaticky, kontrolujeme manuálně
      fadeInDuration: 500, // Plynulý přechod při zobrazení (v ms)
      fadeOutDuration: 500, // Plynulý přechod při skrytí (v ms)
    });

    // Skrytí splash screenu po uplynutí zadaného času
    setTimeout(() => {
      SplashScreen.hide(); // Skrýt splash screen
    }, 3000);
  }
}
