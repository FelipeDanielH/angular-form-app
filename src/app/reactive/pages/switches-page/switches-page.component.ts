import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['', Validators.required ],
    wantNotifications: [false, Validators.required ],
    termsAndConditions: [false, Validators.requiredTrue ] //revisar en el html el error que da
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {}

    for( const key of Object.keys(errors) ){
      switch( key ){
        case 'required':
          return 'Este campo es requerido'
      }

      return null;
    }

    return ''
  }

  constructor(private fb: FormBuilder){}

  onSave() {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value)
  }
}
