import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthorModel } from "../models/author/authorModel";
import { ApiResponse } from "../models/http/apiResponse";

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    private httpClient = inject(HttpClient);
    private api_url = environment.API_URL;
    private author_url = environment.AUTHOR.ALL_OR_CREATE;
    private url = this.api_url + this.author_url;

    getAuthors(): Observable<AuthorModel[]>{
        return this.httpClient.get<ApiResponse<AuthorModel[] | string>>(this.url)
            .pipe(
                map((response) => {
                    if (Array.isArray(response.data)) {
                        return response.data;
                    }
                    if (typeof response.data === 'string') {
                        const parsed = JSON.parse(response.data) as unknown;
                        return Array.isArray(parsed) ? (parsed as AuthorModel[]) : [];
                    }   
                    return [];
            }),
            catchError((error) => {                
                console.error('Error fetching author data:', error);
                return throwError(() => new Error('Failed to fetch author data. Please try again later.'));
            }

        ));
    }
}