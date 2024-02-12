import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { env } from "src/shared/config/env";
import { IS_PUBLIC_KEY } from "src/shared/decorators/is.public";
import { UserRepository } from "../../shared/repositories/user.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private readonly userRepository: UserRepository) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getClass(), context.getHandler()])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwtSecret
      })
      const user = await this.userRepository.findUnique({
        where: {
          id: payload.sub
        }
      })
      if (!user) {
        throw new Error("user not exists")
      }
      if (!user.verified && !payload.account_verification) {
        throw new UnauthorizedException()
      }
      request["userId"] = payload.sub
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type == "Bearer" ? token : undefined
  }
}