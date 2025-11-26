import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DBInterface } from '../../common/dbinterface';
import { DBapiService } from '../../servicios/dbapi-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personaje-detalles-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './personaje-detalles-component.html',
  styleUrl: './personaje-detalles-component.css',
})
export class PersonajeDetallesComponent implements OnInit {
  personaje: DBInterface | null = null;
  
  private readonly apiService: DBapiService = inject(DBapiService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPersonaje(id);
    }
  }

  loadPersonaje(id: string) {
    this.apiService.getPersonaje(id).subscribe({
      next: (data: DBInterface) => {
        this.personaje = data;
      },
      error: (error: any) => {
        console.log('Error cargando el personaje:', error);
      },
      complete: () => {
        console.log('Personaje cargado correctamente');
      }
    });
  }

  calcularPorcentajeKi(ki: string, maxKi: string): number {
    const kiNum = parseFloat(ki.replace(/[,.]/g, ''));
    const maxKiNum = parseFloat(maxKi.replace(/[,.]/g, ''));
    if (maxKiNum > 0) {
      return (kiNum / maxKiNum) * 100;
    }
    return 0;
  }
}
