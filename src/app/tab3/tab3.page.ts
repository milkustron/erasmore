import { Component } from '@angular/core';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  imageUrl: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  events: Event[] = [];
  numberOfEvents: number = 10; // Default number of events

  constructor() {
    this.generateEvents();
  }

  generateEvents() {
    this.events = [];
    const sampleNames = [
      'Tech Conference',
      'Music Festival',
      'Art Exhibition',
      'Food Fair',
      'Sports Tournament',
      'Book Launch',
      'Charity Gala',
      'Film Premiere'
    ];
    
    const sampleDescriptions = [
      'Join us for an exciting day of learning and networking',
      'Experience the best music from around the world',
      'Discover amazing artworks from talented artists',
      'Taste delicious cuisines from different cultures',
      'Watch thrilling matches between top competitors',
      'Meet the author and get your copy signed',
      'Support a good cause while enjoying great entertainment',
      'Be the first to see this highly anticipated movie'
    ];

    for (let i = 1; i <= this.numberOfEvents; i++) {
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const randomDesc = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
      
      this.events.push({
        id: i,
        name: randomName,
        description: randomDesc,
        date: new Date(2023, 10, i).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        imageUrl: `https://picsum.photos/300/200?random=${i}`
      });
    }
  }

  changeEventCount(count: number) {
    this.numberOfEvents = count;
    this.generateEvents();
  }
}