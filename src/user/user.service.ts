import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./user.serializer";
import { serialize, deserialize } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await serialize(await this.prisma.user.findMany());

    return deserialize(UserEntity, users)
  }

  async getUser(id: number) {
    const user = await serialize(await this.prisma.user.findUniqueOrThrow({
      where: {
        id: parseInt(String(id))
      }
    }));

    return deserialize(UserEntity, user)
  }
}
