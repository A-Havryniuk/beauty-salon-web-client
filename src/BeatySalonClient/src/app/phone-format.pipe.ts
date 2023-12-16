// phone-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    const cleaned = ('' + value).replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formatted;
  }
}
