import { Component, Input, Output, EventEmitter, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Clients, ClientService } from '../../services/client';


export type ModalMode = 'add' | 'edit';

@Component({
  selector:   'app-client-modal',
  standalone: true,
  imports:    [FormsModule],
  templateUrl: './client-modal.html',
  styleUrl:    './client-modal.css'
})
export class ClientModal implements OnInit {

  clientService = inject(ClientService);

  @Input() mode:   ModalMode = 'add';
  @Input() client: Clients | null = null;

  @Output() closed  = new EventEmitter<void>();
  @Output() saved   = new EventEmitter<void>();

  goals = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Toning'];

  form = signal({
    name:         '',
    email:        '',
    phone:        '',
    goal:         'Weight Loss',
    calories:     2000,
    weight:       70,
    weightUnit:   'kg',
    notes:        '',
    restrictions: '',
  });

  ngOnInit() {
    if (this.mode === 'edit' && this.client) {
      this.form.set({
        name:         this.client.name,
        email:        this.client.email,
        phone:        this.client.phone,
        goal:         this.client.goal,
        calories:     this.client.calories,
        weight:       this.client.weight,
        weightUnit:   this.client.weightUnit,
        notes:        this.client.notes,
        restrictions: this.client.restrictions.join(', '),
      });
    }
  }

  updateField(field: string, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  get title() {
    return this.mode === 'add' ? 'Add New Client' : 'Edit Client';
  }

  save() {
    const f = this.form();
    if (!f.name.trim()) return;

    const restrictions = f.restrictions
      .split(',')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const { status, statusColor } = ClientService.getStatus(
      this.mode === 'edit' && this.client ? this.client.adherence : 50
    );

    const avatar = ClientService.getAvatar(f.name);

    const payload = {
      name:             f.name,
      email:            f.email,
      phone:            f.phone,
      goal:             f.goal,
      calories:         Number(f.calories),
      weight:           Number(f.weight),
      weightUnit:       f.weightUnit,
      notes:            f.notes,
      restrictions,
      avatar,
      status,
      statusColor,
      adherence:        this.mode === 'edit' && this.client ? this.client.adherence : 50,
      lastCheckin:      'Never',
      sessions:         this.mode === 'edit' && this.client ? this.client.sessions  : 0,
      streak:           this.mode === 'edit' && this.client ? this.client.streak    : 0,
      weeklyAdherence:  this.mode === 'edit' && this.client ? this.client.weeklyAdherence : Array(8).fill(50),
      weeklyWeight:     this.mode === 'edit' && this.client ? this.client.weeklyWeight    : Array(8).fill(Number(f.weight)),
      weeklySessions:   this.mode === 'edit' && this.client ? this.client.weeklySessions  : Array(8).fill(0),
    };

    if (this.mode === 'add') {
      this.clientService.addClient(payload);
    } else if (this.client) {
      this.clientService.updateClient(this.client.id, payload);
    }

    this.saved.emit();
  }

  close() {
    this.closed.emit();
  }
}