import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('Service: AccountService', () => {
  let httpMock: HttpTestingController;
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AccountService],
    });
  });

  beforeEach(inject(
    [AccountService, HttpTestingController],
    (service$: AccountService, httpMock$: HttpTestingController) => {
      service = service$;
      httpMock = httpMock$;
    },
  ));

  it('login: should return a user login', () => {
    service.login('nasr@gmail.com', 'Passw0rd').subscribe((users) => {
      expect(users).toBeTruthy();
    });
  });

  it('login: should to be defined', () => {
    expect(service.logout).toBeDefined();
    expect(service.userValue).toBeDefined();
  });

  it('should run #logout()', async () => {
    expect(service.logout).toBeTruthy();
  });

  it('should run #parseJwt()', async () => {
    expect(service.parseJwt).toBeDefined();
    service.parseJwt('token');
  });
});
