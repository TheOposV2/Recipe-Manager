import { ResolveFn } from '@angular/router';
import { delay, map, of } from 'rxjs';
 // Resolver function that simulates loading by adding a 1s delay
export const recipePageResolver: ResolveFn<boolean> = (route, state) => {
  console.log("Resolver called");
 return of(null).pipe( 
    delay(1000), // Delay the stream by 1 second
    map(() => true) // Return true after delay
  );
};
