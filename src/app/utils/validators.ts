import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

/**
* Valida que las contraseñas coincidan.
*
* @param {FormGroup} form - El formGroup que contiene los campos de contraseña.
* @returns {null | { mismatch: boolean }} - Retorna null si las contraseñas coinciden,
*                                           o un objeto con un error de coincidencia si no.
*/
export function passwordMatchValidator(form: FormGroup): ValidationErrors | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('passwordConfirmation')?.value;

  return password === confirmPassword ? null : { notMatching: true };
}
