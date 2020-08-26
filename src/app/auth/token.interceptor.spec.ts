import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenInterceptor } from './token.interceptor';

jest.mock('./token.interceptor.ts');

describe('TokenInterceptor', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenInterceptor],
    });
    service = TestBed.inject(TokenInterceptor);
  });

  it('should be created', inject(
    [TokenInterceptor],
    (configService: TokenInterceptor) => {
      expect(configService).toBeTruthy();
    },
  ));

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
