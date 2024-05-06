import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', () => {
    const canActivateResult = authGuard.canActivate();
    expect(canActivateResult).toBe(true);
  });

  // Add more test cases as needed
});

