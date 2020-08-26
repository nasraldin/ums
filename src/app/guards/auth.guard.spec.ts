import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('./auth.guard.ts');

describe('AuthGuard', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard],
    });
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', inject([AuthGuard], (configService: AuthGuard) => {
    expect(configService).toBeTruthy();
  }));

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
