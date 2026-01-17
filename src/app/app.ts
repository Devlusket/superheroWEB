import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adventure } from './models/adventure.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.http.get<Adventure[]>('http://localhost:8080/api/traveladventures').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.adventures.set(data);
      },
      error: (error) => {
        console.error('Error fetching adventures:', error);
      },
    });
  }


  deleteAdventure(id: number) {
    this.http.delete(`http://localhost:8080/api/traveladventures/${id}`).subscribe({
      next: () => {
        console.log(`Adventure with id ${id} deleted.`);
        this.fetchAdventures(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting adventure:', error);
      },
    });
  }



  form: Partial<Adventure> = {}

  createAdventure() {
    this.http.post<Adventure>('http://localhost:8080/api/traveladventures', this.form).subscribe({
      next: (data) => {
        console.log('Adventure created:', data);
        this.fetchAdventures(); // Refresh the list after creation
        this.form = {}; // Clear the form
      },
      error: (error) => {
        console.error('Error creating adventure:', error);
      },
    });
  }


  updateAdventure(id: number) {
    this.http.put<Adventure>(`http://localhost:8080/api/traveladventures/${id}`, this.form).subscribe({
      next: (data) => {
        console.log('Adventure updated:', data);
        this.fetchAdventures(); // Refresh the list after update
        this.form = {}; // Clear the form
      },
      error: (error) => {
        console.error('Error updating adventure:', error);
      },
    });
  }

  saveAdventure(adventure: Adventure) {
  this.http
    .put<Adventure>(
      `http://localhost:8080/api/traveladventures/${adventure.id}`,
      adventure
    )
    .subscribe({
      next: () => {
        this.editingId.set(null);
        this.fetchAdventures();
      },
      error: (err) => {
        console.error('Error updating adventure:', err);
      },
    });
}
  editingId = signal<number | null>(null);
  startEdit(id: number) {
    this.editingId.set(id);
  }
  cancelEdit() {
    this.editingId.set(null);
  }

  


}