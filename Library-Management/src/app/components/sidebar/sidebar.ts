import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

   @Input() isOpen: boolean = false;
  @Output() sidebarClose = new EventEmitter<void>();

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.sidebarClose.emit();
    }
  }

  closeSidebar() {
    this.isOpen = false;
    this.sidebarClose.emit();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isOpen = false; // Close sidebar after navigation
    this.sidebarClose.emit(); // Emit close event
  }
}