import {Component, EventEmitter, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() searchText = '';
  @Input() searchTrigger = new EventEmitter<string>();

  loading = false;

  typeTimeout = setTimeout(() => {}, 0);

  constructor() {}

  keyUp(event: Event){
    this.loading = true;
    this.searchText = (event.target as HTMLInputElement).value;
    clearTimeout(this.typeTimeout);
    this.typeTimeout = setTimeout(() => {
      this.searchTrigger.emit(this.searchText);
      this.loading = false;
    }, 500);
  }

  keyDown(event: Event){
    this.loading = true;
  }
}
