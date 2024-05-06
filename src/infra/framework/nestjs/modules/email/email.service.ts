import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { env } from '../../../../../package/config/env';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService, private readonly jwtService: JwtService) { }

    async sendAccountVerification(to: string, user: string, userId: string) {
        try {
            const token = await this.generateJWT(userId)
            await this.mailerService.sendMail({
                to,
                from: env.emailSender,
                subject: env.emailSubject,
                text: `
            Olá ${user},

            Agradecemos por se cadastrar em nosso serviço! Estamos animados por tê-lo(a) conosco.
            
            Para concluir o processo de criação de conta e garantir a segurança da sua conta, precisamos que você clique no link abaixo para confirmar seu endereço de e-mail:
            
            tonored.com.br/account-verification?token=${token}
            
            Certifique-se de clicar no link acima dentro das próximas 24 horas. Se você não reconhecer esta atividade, por favor, entre em contato conosco imediatamente.
            
            Equipe Tonored
            `
            });
            return {
                success: true
            };
        } catch (error) {
            console.log("🚀 ~ error:", error)
            return {
                success: false,
                error: error.message
            }
        }
    }

    private async generateJWT(userId: string) {
        return this.jwtService.signAsync({ sub: userId, account_verification: true })
    }
}
