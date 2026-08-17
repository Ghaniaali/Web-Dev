import { Component, signal, computed, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService, Clients } from '../../services/client';
import { ClientModal, ModalMode } from '../../components/client-modal/client-modal';

@Component({
  selector:    'app-clients',
  standalone:  true,
  imports:     [NgStyle, ClientModal],
  templateUrl: './clients.html',
  styleUrl:    './clients.css'
})
export class ClientsPage {

  private clientService = inject(ClientService);
  private router        = inject(Router);

  // ✅ CORRECT: Use the signal directly, not a snapshot
  clients     = this.clientService.clients;

  searchQuery = signal('');
  filterGoal  = signal('All');
  showModal   = signal(false);
  modalMode   = signal<ModalMode>('add');
  editTarget  = signal<Clients | null>(null);

  goals = ['All', 'Weight Loss', 'Muscle Gain', 'Endurance', 'Toning'];

  // ✅ CORRECT: Computed reads from the live signal
  filteredClients = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const goal  = this.filterGoal();

    return this.clients().filter(client => {
      const matchesSearch = query === '' || client.name.toLowerCase().includes(query);
      const matchesGoal   = goal === 'All' || client.goal === goal;
      return matchesSearch && matchesGoal;
    });
  });

  get totalCount()    { return this.clients().length; }
  get onTrackCount()  { return this.clients().filter(c => c.status === 'On Track').length; }
  get atRiskCount()   { return this.clients().filter(c => c.status === 'At Risk').length; }
  get offTrackCount() { return this.clients().filter(c => c.status === 'Off Track').length; }

  setSearch(val: string) { this.searchQuery.set(val); }
  setFilter(goal: string) { this.filterGoal.set(goal); }

  viewProfile(client: Clients) {
    this.router.navigate(['/clients', client.id]);
  }

  openAddModal() {
    this.modalMode.set('add');
    this.editTarget.set(null);
    this.showModal.set(true);
  }

  openEditModal(client: Clients, e: Event) {
    e.stopPropagation();
    this.modalMode.set('edit');
    this.editTarget.set(client);
    this.showModal.set(true);
  }

  deleteClient(client: Clients, e: Event) {
    e.stopPropagation();
    if (confirm(`Remove ${client.name}?`)) {
      this.clientService.deleteClient(client.id);
    }
  }

  onModalSaved()  { this.showModal.set(false); }
  onModalClosed() { this.showModal.set(false); }
}