import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator/currentUser.decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAll() {
    return this.userService.getAll();
  }
  
  @Get('/:id')
  show(@Param('id') id) {
    return this.userService.getUser(id);
  }

  @Get('/me')
  getMe(@GetUser() user: User) {
    return user
  }
}