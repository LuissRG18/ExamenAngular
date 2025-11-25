import { Component } from '@angular/core';

@Component({
  selector: 'app-home-components',
  imports: [],
  templateUrl: './home-components.html',
  styleUrl: './home-components.css',
})
export class HomeComponents {
  onStartAdventure(): void {
    console.log('¡Aventura iniciada! Goku está listo para combatir...');
    alert('¡Bienvenido a tu aventura en Dragon Ball! 🐉');
  }
}
