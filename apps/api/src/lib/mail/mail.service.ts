import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailtrapClient } from 'mailtrap';
import { render } from '@react-email/render';
import { MAIL_MODULE } from './mail.module';
import { ForgotPasswordTemplate } from './templates/forgot-password';
import { EmailVerificationTemplate } from './templates/email-verification';
import * as React from 'react';

@Injectable()
export class MailService {
  private readonly senderEmail: string;

  constructor(
    @Inject(MAIL_MODULE) private readonly mailClient: MailtrapClient,
    private readonly configService: ConfigService,
  ) {
    this.senderEmail = this.configService.get<string>('MAILTRAP_SENDER_EMAIL') || 'hello@prosperity.app';
  }

  async sendForgotPasswordEmail(email: string, url: string) {
    const html = await render(React.createElement(ForgotPasswordTemplate, { url }));

    await this.mailClient.send({
      from: { email: this.senderEmail, name: 'Prosperity' },
      to: [{ email }],
      subject: 'Identity Recovery Protocol',
      html,
    });
  }

  async sendVerificationEmail(email: string, url: string) {
    const html = await render(React.createElement(EmailVerificationTemplate, { url }));

    await this.mailClient.send({
      from: { email: this.senderEmail, name: 'Prosperity' },
      to: [{ email }],
      subject: 'Establish Identity Verification',
      html,
    });
  }
}
