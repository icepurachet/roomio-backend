import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OwnersService } from 'src/owners/owners.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ access_token: string }> {
    const owner = await this.ownersService.findByUsername(username);

    if (!owner) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: owner.owner_id, username: owner.username, role: 'owner'};
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
