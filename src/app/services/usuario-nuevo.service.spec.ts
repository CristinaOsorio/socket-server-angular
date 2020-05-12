import { TestBed } from '@angular/core/testing';

import { UsuarioNuevoService } from './usuario-nuevo.service';

describe('UsuarioNuevoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioNuevoService = TestBed.get(UsuarioNuevoService);
    expect(service).toBeTruthy();
  });
});
