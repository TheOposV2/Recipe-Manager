import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty',
  standalone: true
})
export class DifficultyPipe implements PipeTransform {

transform(value: 'easy' | 'medium' | 'hard', ...args: unknown[]): string {
    switch (value) {
         case 'easy':
            return 'łatwy';
         case 'medium':
            return 'średnio trudny';
         case 'hard':
            return 'trudny'
         }
      }

}
