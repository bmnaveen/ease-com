import { Inject, Injectable } from '@nestjs/common';
import { UnknownCourierError, AppError } from 'src/common/errors/app-error';
import { COURIER_ADAPTERS, ICourierAdapter } from './courier.interface';

@Injectable()
export class CourierRegistryService {
  private adapters: Map<string, ICourierAdapter> = new Map();

  constructor(@Inject(COURIER_ADAPTERS) adapters: ICourierAdapter[]) {
    for (const adapter of adapters) {
      this.adapters.set(adapter.key.toLowerCase(), adapter);
    }
  }

  supported(): string[] {
    return Array.from(this.adapters.keys());
  }

  getAdapter(key: string): ICourierAdapter {
    const adapter = this.adapters.get(key.toLowerCase());
    if (!adapter) {
      throw new UnknownCourierError(key, this.supported());
    }
    return adapter;
  }

  has(key: string): boolean {
    return this.adapters.has(key.toLowerCase());
  }
}
