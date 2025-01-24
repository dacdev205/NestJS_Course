import * as nodemailer from 'nodemailer';
import { ActivationJobData } from 'src/common/interface/activation-job-data.interface';
import { EmailJobData } from 'src/common/interface/email-job-data.interface';
import { ResetPassJobData } from 'src/common/interface/reset-pass-job-data.interface';
import { contentEmail } from 'src/content/email';
import { Injectable } from '@nestjs/common';
import { HandlebarsService } from './../handlebar/handlebar.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly handlebarsService: HandlebarsService) {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        service: process.env.TRANSPORT_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    }
  }

  async sendResetPassEmail(resetPassJobData: ResetPassJobData): Promise<void> {
    try {
      const { to, resetCode } = resetPassJobData;
      const templateContent = await this.handlebarsService.compileTemplate(
        contentEmail.sendResetPassCode.content,
        { resetCode },
      );
      const emailJobData: EmailJobData = {
        to: to,
        subject: contentEmail.sendResetPassCode.subject,
        html: templateContent,
      };
      await this.transporter.sendMail({
        from: `"Support" <${process.env.MAIL_FROM}>`,
        to: emailJobData.to,
        subject: emailJobData.subject,
        html: emailJobData.html,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email`, error);
    }
  }
  async sendActivationEmail(
    activationJobData: ActivationJobData,
  ): Promise<void> {
    try {
      const { to, activationCode } = activationJobData;
      const templateContent = await this.handlebarsService.compileTemplate(
        contentEmail.sendActivationCode.content,
        { activationCode },
      );
      const emailJobData: EmailJobData = {
        to: to,
        subject: contentEmail.sendActivationCode.subject,
        html: templateContent,
      };
      await this.transporter.sendMail({
        from: `"Support" <${process.env.MAIL_FROM}>`,
        to: emailJobData.to,
        subject: emailJobData.subject,
        html: emailJobData.html,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Error sending email`, error);
    }
  }
}
