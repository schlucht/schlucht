import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors
  } from '@angular/forms';
  
  import { inject } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  
  import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    map,
    of,
    switchMap,
    timer
  } from 'rxjs';
  
  export function emailExistsValidator(): AsyncValidatorFn {
  
    const http = inject(HttpClient);
  
    return (
      control: AbstractControl
    ) => {
  
      if (!control.value) {
        return of(null);
      }
  
      return timer(500).pipe(
  
        switchMap(() =>
          http.get<{ exists: boolean }>(
            `http://www.schmidschlucht.ch/api/auth/testEmail?email=${control.value}`
          )
        ),
  
        map(response =>
          response.exists
            ? { emailExists: true }
            : null
        ),
  
        catchError(() => of(null))
      );
    };
  }