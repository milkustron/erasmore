import { Injectable } from '@angular/core';
import { ChecklistItem } from '../tab1/checklist/checklist-item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  url = 'http://localhost:3000/todo';

  async getChecklistByStage(stage: string): Promise<ChecklistItem[]> {
    const response = await fetch(`${this.url}?stage=${encodeURIComponent(stage)}`);
    return await response.json() ?? [];
  }

  async getChecklist(): Promise<ChecklistItem[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  

  constructor() { }
}
