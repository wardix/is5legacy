import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.employeesService.authenticate(username, password);
    return user;
  }

  async loginUser(user: any) {
    const payload = { user: user.id };
    const now = new Date();
    const period = +this.configService.get('JWT_EXPIRES');
    const expired = new Date(now);
    expired.setDate(expired.getDate() + period);
    return {
      created: now,
      expired: expired,
      token: this.jwtService.sign(payload),
    };
  }
}
