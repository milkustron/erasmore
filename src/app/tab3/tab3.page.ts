import { Component } from '@angular/core';
import activities from '../../../resources/data/activities.json';

interface Event {
  id: number;
  name: string;
  description: string;
  specialPrice: string;
  information: string;
  experience: string;
  included: string;
  remember: string;
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

    let i: number = 0;

    for (const key in activities) {
      if (activities.hasOwnProperty(key)) {
        const item = activities[key as keyof typeof activities];
        if ('Special Price' in item.description_fields && 'Information' in item.description_fields && 'The Experience' in item.description_fields
          && 'Included' in item.description_fields && 'Remember' in item.description_fields) {
          const desc = item.description_fields['Description'];
          const specialPrice = item.description_fields['Special Price'];
          const information = item.description_fields['Information'];
          const experience = item.description_fields['The Experience'];
          const included = item.description_fields['Included'];
          const remember = item.description_fields['Remember'];
          const name = item;

          this.events.push({
            id: i,
            name: key,
            description: desc,
            specialPrice: specialPrice,
            information: information,
            experience: experience,
            included: included,
            remember: remember,
            imageUrl: `https://picsum.photos/300/200?random=2023-11-10`
          });
          
          i++;
        }    
      }
    }
  }

  

  changeEventCount(count: number) {
    this.numberOfEvents = count;
    this.generateEvents();
  }
}