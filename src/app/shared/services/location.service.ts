import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocationRoot } from '../models/location';

@Injectable()
export class LocationService {

  constructor(private readonly _http: HttpClient) { }

  public getLocation(location: string): Observable<LocationRoot> {
    return this._http.get<LocationRoot>(`${environment.autocompleteAPIUrl}${location}&apiKey=${environment.autocompleteAPIKey}`)
  }
}
