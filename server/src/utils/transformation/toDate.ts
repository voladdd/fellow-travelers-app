import { BadRequestException } from '@nestjs/common';

export function toDate({ value, key }): Date {
  const date = new Date(value);
  if (date) {
    return date;
  } else {
    throw new BadRequestException(`${key} is not a valid Date`);
  }
}
