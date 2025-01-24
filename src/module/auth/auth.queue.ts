import { ActivationJobData } from 'src/common/interface/activation-job-data.interface';
import { QeueuesService } from 'src/shared/queues/queues.service';
import { Injectable } from '@nestjs/common';
import { ResetPassJobData } from './../../common/interface/reset-pass-job-data.interface';

@Injectable()
export class AuthQueue {
  constructor(private readonly queueService: QeueuesService) {}
  async addSendActiveCodeJob(
    activationJobData: ActivationJobData,
  ): Promise<void> {
    await this.queueService.addSendActiveCodeJob(activationJobData);
  }
  async addSendResetPassCodeJob(
    resetPassJobData: ResetPassJobData,
  ): Promise<void> {
    await this.queueService.addSendResetPassCodeJob(resetPassJobData);
  }
}
