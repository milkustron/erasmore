import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage implements OnInit {

  eventId: string | null = null;

  receivedData: any;
  bannerImage: string | null = null;
  eventDescription: string | null = null;
  experience: string | null = null;
  included: string | null = null;
  eventName: string | null = null;
  specialPrice: string | null = null;
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router // You can inject Router even if you're not using it in constructor
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.receivedData = nav?.extras?.state?.['data'];
    this.bannerImage = this.getContent(this.receivedData, "Images") + "main.jpg";
    this.eventName = this.getContent(this.receivedData, "Name") || null;;
    this.eventDescription = this.getContent(this.receivedData, "Description") || null;;
    this.specialPrice = this.getContent(this.receivedData, "Special Price") || null;;
    this.experience = this.getContent(this.receivedData, "The Experience") || null;;
    this.included = this.getContent(this.receivedData, "Included") || null;;

  }

  getContent(items: { name: string, content: string }[], name: string): string | undefined {
   
    const found = items.find(item => item.name === name);
    return found?.content;
  }

  getRandomImages(directory: string){
    
  }


}
