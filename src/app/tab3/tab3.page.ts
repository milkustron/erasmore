import { Component } from '@angular/core';
import activities from '../../../resources/data/activities.json';
import { Router } from '@angular/router';

interface Event {
  id: number;
  name: string;
  description: string;
  data?: string[];
  image: string;
}

type dtp = {
  name: string;   
  content: string;
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
  dataToPass: dtp[][]=[];  //format will be: name, image dir and desc fields 
  img: string = '';

  constructor(private router: Router) {
    this.generateEvents();
  }

  generateEvents() {
    this.events = [];

    let i: number = 0;

    for (const key in activities) {
      if (activities.hasOwnProperty(key)) {
          const item = activities[key as keyof typeof activities];
          const desc = item.description_fields['Description'];
          let img = `assets/activities/${key}/thumbnail.jpg`;
          //let image = this.setImage(key);

          
          const img_dir = `assets/activities/${key}/gallery/`;
          
          let activityArr: dtp[] = [];
          activityArr.push({name: "Name", content: key});
          activityArr.push({name: "Images", content: img_dir});

          if (item.description_fields && typeof item.description_fields === 'object') {
              const fields = item.description_fields as Record<string, string>;
              Object.entries(fields).forEach(([key, value]) => {
                activityArr.push({name: key, content: value});
              });
          }
          
          this.events.push({
            id: i,
            name: key,
            description: desc,
            image: img
          });

          this.dataToPass.push(activityArr);
          i++;
          
      }
    }
  }

  async setImage(key: string) {
    const jpgPath = `assets/activities/${key}/thumbnail.jpg`;
    const pngPath = `assets/activities/${key}/thumbnail.png`;

    try {
      const res = await fetch(jpgPath, { method: 'HEAD' });
      this.img = res.ok ? jpgPath : pngPath;
    } catch (e) {
      this.img = pngPath;
    }
  }

  changeEventCount(count: number) {
    this.numberOfEvents = count;
    this.generateEvents();
  }

  goToChildPage(eventId: number) {
    const dataToPass = this.dataToPass[eventId];
    this.router.navigate(['/event',eventId], { state: { data: dataToPass } });
  }

  
}