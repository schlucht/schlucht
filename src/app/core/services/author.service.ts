import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    private httpClient = inject(HttpClient);
    private api_url = environment.API_URL;
}