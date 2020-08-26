import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';

import { UserService } from './users.service';
import { of } from 'rxjs';

const mockUsers = {
  users: [
    {
      firstName: 'Nasr',
      lastName: 'Aldin',
      email: 'admin@gmail.com',
      username: 'admin',
      password: '$2a$10$XsTNjzrDB8Phm/3oUBH2Wu6Jb2OPeojNqI5KOmyq3at4umubKyUiy',
      role: 'admin',
      city: 'Abu Dhabi',
      id: 1,
    },
    {
      firstName: 'Nasr Aldin',
      lastName: 'Aldin',
      email: 'user@gmail.com',
      username: 'user',
      password: '$2a$10$sO8RcIKnyWOghqjz7jhFM.cCbaii7e0ievlbGsTsE2HUDlpWQfoT6',
      role: '',
      city: 'Abu Dhabi',
      id: 2,
    },
    {
      email: 'ahmed@gmail.com',
      password: '$2a$10$MFH9ode2qBsYbt7HZZ0OTurLNw/bqbgy5dVnG8Y8fkQXhrhHUjOY.',
      username: 'ahmed',
      role: '',
      firstName: 'Ahmed',
      lastName: 'Mohamed',
      city: 'Dubai',
      id: 3,
    },
  ],
};

describe('Service: UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
  });

  beforeEach(inject(
    [UserService, HttpTestingController],
    (service$: UserService, httpMock$: HttpTestingController) => {
      service = service$;
      httpMock = httpMock$;
    },
  ));

  it('get: should return a user', () => {
    service.get(1).subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user.firstName).toBe('Nasr');
    });
  });

  it('getAll: should return a users list', () => {
    service.getAll().subscribe((users) => {
      expect(users.length).toBe(3);
    });
  });

  it('save: should return a user', () => {
    service.save(mockUsers.users[0]).subscribe((user) => {
      expect(user).toBeTruthy();
    });
  });

  it('update: should return a user', () => {
    service.update(1, mockUsers.users[0]).subscribe((user) => {
      expect(user).toBeTruthy();
    });
  });

  it('delete: should return a user', () => {
    service.delete(1).subscribe((user) => {
      expect(user).toBeTruthy();
    });
  });

  it('should destruct user key into uers list', async(() => {
    const users = [mockUsers];
    const httpMock$ = { get: jest.fn(() => of({ users })) };
    service.getAll().subscribe((data) => {
      expect(httpMock$.get).toHaveBeenCalledWith('../../../api/db.json');
      expect(data).toBe(users);
    });
  }));
});
