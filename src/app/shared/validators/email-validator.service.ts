import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {
      console.log({email});

      if( email === 'felipe@gmail.com'){
        subscriber.next({ emailTaken: true })
        subscriber.complete();
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000)
    );

    return httpCallObservable
  }
}




































// otra forma de hacerlo (para futuras consultas)
/*   validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value

    console.log({email})

    return of({
      emailTaken: true
    }).pipe(
      delay(2000)
    )
  } */

  // otra referencia personal
/*   validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value

    console.log({email})

    return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
    .pipe(
      map(resp => {
        return (resp.length === 0)
          ? null
          : { emailTaken: true}
      })
    )
  } */
