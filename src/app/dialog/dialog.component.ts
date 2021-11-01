import { Component, Inject, } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '../models/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  roles: string[] = ['Admin', 'User']
  formValidator: FormGroup
  matcher = new MyErrorStateMatcher

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogModel, private formbuilder: FormBuilder) {
    this.formValidator = this.formbuilder.group({
      firstName: [this.data.data?.firstName, [
        Validators.required,
        Validators.minLength(3)
      ]],
      lastName: [this.data.data?.lastName, [
        Validators.required,
        Validators.minLength(3)
      ]],
      title: [this.data.data?.title, [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [this.data.data?.email, [
        Validators.required,
        Validators.email
      ]],
      role: [this.data.data?.role, [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['']
    }, { validators: this.checkPasswords } )
  }  

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  get firstName() {
    return this.formValidator.get('firstName')
  }

  get lastName() {
    return this.formValidator.get('lastName')
  }

  get title() {
    return this.formValidator.get('title')
  }

  get role() {
    return this.formValidator.get('role')
  }

  get email() {
    return this.formValidator.get('email')
  }

  get password() {
    return this.formValidator.get('password')
  }

  get confirmPassword() {
    return this.formValidator.get('confirmPassword')
  }

  getErrorFirstName() {
    if (this.formValidator.get("firstName")?.hasError('required')) {
      return 'You must enter a value'
    }

    return this.formValidator.get("firstName") ? 'Min 3 Character' : ''
  }

  getErrorLastName() {
    if (this.formValidator.get("lastName")?.hasError('required')) {
      return 'You must enter a value'
    }

    return this.formValidator.get("lastName") ? 'Min 3 Character' : ''
  }

  getErrorTitle() {
    if (this.formValidator.get("title")?.hasError('required')) {
      return 'You must enter a value'
    }

    return this.formValidator.get("title") ? 'Min 3 Character' : ''
  }

  getErrorRole() {
    if (this.formValidator.get("role")?.hasError('required')) {
      return 'You must enter a value'
    }
    return ''
  }

  getErrorEmail() {
    if (this.formValidator.get("email")?.hasError('required')) {
      return 'You must enter a value'
    }

    return this.formValidator.get("email") ? 'Please enter a valid email address' : ''
  }

  getErrorPassword() {
    if (this.formValidator.get("password")?.hasError('required')) {
      return 'You must enter a value'
    }

    return this.formValidator.get("password") ? 'Min 6 Character' : ''
  }

  getErrorConfirmPassword() {
    return 'Your password and confirmation password do not match'
  }

  exitDialog() {
    this.dialogRef.close({result: false})
  }

  delete() {
    this.dialogRef.close({result: true, mode: this.data.mode, data: this.data.data!.id})
  }

  onSubmit(form: FormGroupDirective) {
    this.dialogRef.close({result: true, mode: this.data.mode, data: form.value})
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}