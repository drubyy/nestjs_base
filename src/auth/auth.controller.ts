import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, SignUpDto } from "./dto";

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() params: SignUpDto) {
    return this.authService.signup(params);
  }

  @Post('signin')
  signin(@Body() params: AuthDto) {
    return this.authService.signin(params);
  }
}