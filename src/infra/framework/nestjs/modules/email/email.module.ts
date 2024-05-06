import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { env } from '@package/config/env';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.emailHost,
        auth: {
          user: env.emailUserSecret,
          pass: env.emailPassSecret,
        }
      }
    }),
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
