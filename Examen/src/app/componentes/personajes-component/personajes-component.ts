import { Component, inject, OnInit } from '@angular/core';
import { DBInterface, ApiResponse, Links } from '../../common/dbinterface';
import { DBapiService } from '../../servicios/dbapi-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-personajes-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './personajes-component.html',
  styleUrl: './personajes-component.css',
})
export class PersonajesComponent implements OnInit {
  allPersonajes: DBInterface[] = [];
  links: Links = { first: '', previous: '', next: '', last: '' };
  currentPage: number = 1;

  private readonly apiService: DBapiService = inject(DBapiService);

  constructor() {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1) {
    this.apiService.getPersonajes(page).subscribe({
      next: (data: ApiResponse) => {
        this.allPersonajes = data.items;
        this.links = data.links;
        this.currentPage = data.meta.currentPage;
      },
      error: (error: any) => {
        console.log('Error mostrando los personajes:', error);
      },
      complete: () => {
        console.log('Estos son todos los personajes');
      }
    });
  }

  nextPage() {
    if (this.links.next) {
      this.apiService.getPersonajesByUrl(this.links.next).subscribe({
        next: (data: ApiResponse) => {
          this.allPersonajes = data.items;
          this.links = data.links;
          this.currentPage = data.meta.currentPage;
        },
        error: (error: any) => {
          console.log('Error cargando página siguiente:', error);
        }
      });
    }
  }

  previousPage() {
    if (this.links.previous) {
      this.apiService.getPersonajesByUrl(this.links.previous).subscribe({
        next: (data: ApiResponse) => {
          this.allPersonajes = data.items;
          this.links = data.links;
          this.currentPage = data.meta.currentPage;
        },
        error: (error: any) => {
          console.log('Error cargando página anterior:', error);
        }
      });
    }
  }
}
