import { QUEUE_NAMES } from 'src/common/constants/queueConstants';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QeueuesService } from './queues.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: QUEUE_NAMES.AUTH_QUEUE,
    }),
  ],
  providers: [QeueuesService],
  exports: [QeueuesService],
})
export class QueuesModule {}
