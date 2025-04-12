import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StageNameService {
  getStageName(stage: number): string {
    switch (stage) {
      case 1:
        return 'Preparation';
      case 2:
        return 'Trip Day';
      case 3:
        return 'Settling In';
      case 4:
        return 'Settled';
      case 5:
        return 'Departure';
      default:
        return 'Could not load name';
    }
  }
}