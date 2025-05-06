import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight-details',
  standalone: false,
  templateUrl: './highlight-details.page.html',
  styleUrls: ['./highlight-details.page.scss'],
})
export class HighlightDetailsPage {
  highlight: any;

  highlights = [
    {
      id: 1,
      title: 'Dunas de Maspalomas',
      image: 'assets/maspalomas.jpg',
      description: 'The Maspalomas Dunes are one of Gran Canaria’s most breathtaking landscapes. Located on the southern coast of the island, this protected nature reserve spans over 400 hectares of golden sand sculpted by the wind into ever-changing shapes. The dunes feel like a small desert by the sea, offering a surreal mix of arid beauty and coastal serenity. Visitors can walk barefoot through the soft sand, watch the sunset over the Atlantic, or explore nearby Maspalomas Beach, the lighthouse, and the lagoon that serves as a stopover for migratory birds. Whether you\'re looking for a peaceful stroll or a stunning photo backdrop, the dunes are an unforgettable experience.'
    },
    {
      id: 2,
      title: 'Roque Nublo',
      image: 'assets/roque.jpg',
      description: 'Standing at 1,813 meters above sea level, Roque Nublo (or "Cloud Rock") is one of the highest points on Gran Canaria and a symbol of the island\'s volcanic origin. This dramatic volcanic rock formation rises 80 meters tall and is surrounded by a rugged, otherworldly landscape of pine forests, deep ravines, and panoramic views. The hike to Roque Nublo is moderately easy and takes about 1 hour round trip, starting from La Goleta. Along the trail, hikers are rewarded with spectacular views of Pico de las Nieves, Tamadaba, and on clear days, even Mount Teide in Tenerife. It’s the perfect spot for nature lovers, photographers, and anyone craving fresh mountain air.'
    }
  ];

  constructor(private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.highlight = this.highlights.find(h => h.id === id);
  }
}