import { Job } from 'bullmq';
import { JOB_NAMES, QUEUE_NAMES } from 'src/common/constants/queueConstants';
import { ActivationJobData } from 'src/common/interface/activation-job-data.interface';
import { ResetPassJobData } from 'src/common/interface/reset-pass-job-data.interface';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { EmailService } from './email.service';

@Processor(QUEUE_NAMES.AUTH_QUEUE)
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }
  async process(job: Job<any>): Promise<void> {
    switch (job.name) {
      case JOB_NAMES.SEND_ACTIVATION_MAIL: {
        await this.emailService.sendActivationEmail(
          job.data as ActivationJobData,
        );
        break;
      }
      case JOB_NAMES.SEND_RESET_PASSWORD_MAIL: {
        await this.emailService.sendResetPassEmail(
          job.data as ResetPassJobData,
        );
        break;
      }
    }
  }
}
