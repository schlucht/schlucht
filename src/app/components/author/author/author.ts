import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../../core/services/author.service';
import { AuthorModel } from '../../../core/models/author/authorModel';

@Component({
  selector: 'ots-author-component',
  imports: [ReactiveFormsModule],
  templateUrl: './author.html',
  styleUrl: './author.css',
})
export class AuthorComponent {

  authorService = inject(AuthorService)
  authors = signal<AuthorModel[]>([{
    id: 1,
    firstname: 'Max',
    lastname: 'Mustermann',
    country: 'Deutschland',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
  }]);

  isSubmitting = computed(() => false);
    authorForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),      
      country: new FormControl('', []),   
      description: new FormControl('', []),  
    },     
  );
    onSubmit(){
      console.log(this.authorForm.invalid)
      if(this.authorForm.invalid){      
        console.log('invalid');
      }
      return false;
    }
}
