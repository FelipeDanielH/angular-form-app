import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase()
    if (value === 'strider') {
      return {
        noStrider: true
      }
    }
    return null
  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if( fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ notEqual: true })
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);

      return null
    }
  }

  // Explicacion de chatGPT al metodo:

  /*
    En el código que has proporcionado, estás creando una función anónima que actúa como un validador personalizado para el FormGroup. Esta función es creada dentro de isFieldOneEqualFieldTwo, y se devuelve como el validador personalizado para el FormGroup.
    La función anónima que se devuelve toma un argumento formGroup, que es el FormGroup al que se aplica el validador personalizado. Dentro de esta función, estás utilizando el método formGroup.get(field1) y formGroup.get(field2) para acceder a los controles del FormGroup utilizando los nombres de campo field1 y field2.
    Esto es posible porque cuando defines la función anónima como un validador personalizado, Angular la invocará automáticamente con el FormGroup al que se aplica el validador. Por lo tanto, puedes acceder a los controles del FormGroup a través de formGroup.get(field1) y formGroup.get(field2) porque esos nombres de campo se pasan como argumentos a la función isFieldOneEqualFieldTwo.
    En resumen, Angular se encarga de proporcionar el FormGroup al que se aplica el validador personalizado como un argumento a la función anónima, lo que te permite acceder a los campos específicos dentro de esa función. Esto es una característica fundamental de cómo funcionan los validadores personalizados en Angular.
  */
}
