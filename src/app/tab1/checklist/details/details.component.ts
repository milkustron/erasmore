import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [IonicModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() description: string | undefined;
  @Input() link: string | undefined;
  
  checkLink(): boolean{
    if(this.link){
      return true;
    } else {
      return false;
    }
  }

  closeDetails(): void {
	  this.close.emit();
  }
   
  open(){
    window.open(this.link, '_blank');
  }
}