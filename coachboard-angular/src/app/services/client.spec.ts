/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { ClientService } from '../services/client';
import { Clients } from './client';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
