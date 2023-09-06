import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignUpDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signup(params: SignUpDto) {
    try {
      const hash = await argon.hash(params.password);
      
      const user = await this.prisma.user.create({
        data: {
          email: params.email,
          firstName: params.firstName,
          lastName: params.lastName,
          hash,
        },
      })

      const token = await this.signToken(user.id, user.email);

      return {
        access_token: token
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UnprocessableEntityException('Email taken');
        }
      }
    }
  }

  async signin(params: AuthDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: params.email
      }
    })

    const pwMatches = await argon.verify(user.hash, params.password);

    if (!pwMatches) {
      throw new NotFoundException(
        'Not found user',
      );
    }

    const token = await this.signToken(user.id, user.email);

    return {
      access_token: token
    };
  }

  async signToken (
    userId: number,
    email: string,
  ) {
    const payload = {
      id: userId,
      email: email
    }
    
    return this.jwt.signAsync(payload, {
      expiresIn: '2d',
      secret: this.config.get('JWT_SECRET')
    })
  }
}
