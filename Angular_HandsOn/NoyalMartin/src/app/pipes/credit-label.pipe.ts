import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  // takes a credits number and turns it into a readable string
  transform(value: any): string {
    if (value === null || value === undefined) {
      return 'No Credits';
    }
    if (value === 0) {
      return 'No Credits';
    }
    const num = Number(value);
    if (isNaN(num)) return 'No Credits';
    return num === 1 ? '1 Credit' : `${num} Credits`;
  }
}
