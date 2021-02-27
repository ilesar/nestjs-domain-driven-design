import { UnauthorizedException } from '@nestjs/common';

export class AuthenticationExeception extends UnauthorizedException {
  constructor() {
    super(
      'The email or password you entered did not match our records. Please, double-check and try again.',
    );
  }
}
