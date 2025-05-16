import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true
})
export class PreparationTimePipe implements PipeTransform {

transform(value: number, ...args: unknown[]): string {
   return `${value} minut`
}

}
