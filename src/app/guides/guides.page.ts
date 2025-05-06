import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guides',
  templateUrl: 'guides.page.html',
  styleUrls: ['guides.page.scss'],
  standalone: false,
})
export class GuidesPage {

  constructor(private router: Router) {}

  highlights = [
    {
      id: 1,
      title: 'Dunas de Maspalomas',
      image: 'assets/maspalomas.jpg',
      summary: 'An iconic natural wonder of Gran Canaria',
      longDescription: 'These dunes are a protected nature reserve...'
    },
    {
      id: 2,
      title: 'Roque Nublo',
      image: 'assets/roque.jpg',
      summary: 'Touch the clouds in the heart of the island',
      longDescription: 'Located in the heart of the island...'
    }
  ];

  goToDetails(id: number) {
    this.router.navigate(['/highlight-details', id]);
  }
}
