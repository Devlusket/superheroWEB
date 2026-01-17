import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adventure } from './models/adventure.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('superhero');

  adventures = signal<Adventure[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdventures(); // Comentado para usar dados mock
    // this.adventures.set([]);
  }

  fetchAdventures() {
    console.log('Fetching adventures...');
    this.http.get<Adventure[]>('/api/traveladventures').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.adventures.set(data);
      },
      error: (error) => {
        console.error('Error fetching adventures:', error);
      },
    });
  }
}
