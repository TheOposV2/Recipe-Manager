import { ResolveFn } from '@angular/router';
import { delay, map, of } from 'rxjs';

export const recipePageResolver: ResolveFn<boolean> = (route, state) => {
  console.log("Resolver called");
 return of(null) 
  .pipe(
    delay(1000),
    map(() => true) 
  );
};
