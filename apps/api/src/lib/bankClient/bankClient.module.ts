import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import TellerClient from './teller/client';

export const BANK_CLIENT = Symbol.for('BANK_CLIENT');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: BANK_CLIENT,
      useFactory: (configService: ConfigService) => {
        // Get certificate and private key from config service and convert to Buffer
        const cert = Buffer.from(
          configService.getOrThrow<string>('TELLER_CERTIFICATE'),
          'base64',
        );
        const key = Buffer.from(
          configService.getOrThrow<string>('TELLER_PRIVATE_KEY'),
          'base64',
        );

        if (cert.length === 0 || key.length === 0) {
          throw new Error('Teller credentials missing in ConfigService');
        }

        // Return the initialized class
        return new TellerClient({
          cert,
          key,
          applicationId: configService.getOrThrow<string>(
            'TELLER_APPLICATION_ID',
          ),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [BANK_CLIENT],
})
export class BankClientModule {}
export type BankClient = InstanceType<typeof TellerClient>;
