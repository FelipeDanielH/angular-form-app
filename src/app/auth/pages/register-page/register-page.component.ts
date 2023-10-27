import { EmailValidator } from './../../../shared/validators/email-validator.service'
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validators.service';


@Component({
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastNamePattern)] ],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.cantBeStrider] ],
    password: ['', [Validators.required, Validators.minLength(6), ] ],
    password2: ['', [Validators.required] ]
  },{
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]

  });

  constructor (
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidator
    ){}

  isValidField( field: string ){
    return this.validatorService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
