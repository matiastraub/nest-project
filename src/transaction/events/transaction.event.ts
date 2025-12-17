import { OnEvent } from '@nestjs/event-emitter';

export class TransactionEvents {
  @OnEvent('transaction.created')
  handleCreated(payload: any) {
    console.log('Transaction created:', payload.id);
  }
}
