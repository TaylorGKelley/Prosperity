import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailtrapClient } from 'mailtrap';
import { MailService } from './mail.service';

export const MAIL_MODULE = Symbol.for('MAIL_MODULE');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MAIL_MODULE,
      useFactory: (configService: ConfigService) => {
        return new MailtrapClient({
          token: configService.get<string>('MAILTRAP_TOKEN') as string,
        });
      },
      inject: [ConfigService],
    },
    MailService,
  ],
  exports: [MAIL_MODULE, MailService],
})
export class MailModule {}

