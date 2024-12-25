import { Injectable, BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: any) {}

  transform(value: any) {
    try {
      const parsedData = this.schema.parse(value);
      return parsedData;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw error;
    }
  }
}
