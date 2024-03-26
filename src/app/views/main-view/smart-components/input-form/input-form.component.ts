import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable, Subject, switchMap } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location.service';
import { initTE, Timepicker, Datepicker } from 'tw-elements';
@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {
  @Input() inputForm!: FormGroup;

  public selectedLocation!: number;
  public searchValue$!: Subject<string>;
  public searchedLocations!: any[];
  public searchedResults$!: Observable<any>;

  public locations = [
    {id: 1, name: 'London'},
    {id: 2, name: 'Berlin'},
    {id: 3, name: 'Paris'}
  ]

  constructor(private readonly _locationService: LocationService){
    this.searchValue$ = new Subject<string>();
  }

  ngOnInit(): void {
    initTE({ Input, Timepicker, Datepicker });

    this.searchedResults$ = this.searchValue$.pipe(switchMap(change => {
      return this._locationService.getMovieBySearch(change, this.pageNumber, this.searchFormGroup.get('type')!.value, this.searchFormGroup.get('year')!.value).pipe(map(res => {
        if(res.Response !== 'False') {
          const firstValue = {
            Title: change,
            Year: '',
            imdbID: '',
            Type: '',
            Poster: ''
          };
          res.Search.forEach(item => {
            this.searchedResults.push(item);
          });
          this.searchedResults[0] = firstValue;
          return res;
        } 
        return res;
      }));
    }));
  }

  onSelectSearch(event: { term: string; items: any[] }): void {
    this.searchValue$.next(event.term);
  }

  onScrollSearch(event: any): void {
    console.log(event);
  }
}
