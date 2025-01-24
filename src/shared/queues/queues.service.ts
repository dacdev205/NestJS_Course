import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { JOB_NAMES, QUEUE_NAMES } from 'src/common/constants/queueConstants';
import { ActivationJobData } from 'src/common/interface/activation-job-data.interface';
import { ResetPassJobData } from 'src/common/interface/reset-pass-job-data.interface';

@Injectable()
export class QeueuesService {
  constructor(
    @InjectQueue(QUEUE_NAMES.AUTH_QUEUE) private readonly authQueue: Queue,
  ) {}
  async addSendActiveCodeJob(activationJobData: ActivationJobData) {
    await this.authQueue.add(JOB_NAMES.SEND_ACTIVATION_MAIL, activationJobData);
  }
  async addSendResetPassCodeJob(resetPassJobData: ResetPassJobData) {
    await this.authQueue.add(
      JOB_NAMES.SEND_RESET_PASSWORD_MAIL,
      resetPassJobData,
    );
  }
}
