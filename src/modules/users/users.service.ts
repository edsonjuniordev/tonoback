import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) { }

  async getUserById(userId: string) {
    const user = await this.userRepository.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true
      }
    })

    return user
  }
}
