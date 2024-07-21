import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { LocationFeatures, LocationProperties } from 'src/app/shared/models/location';
import { Coord } from 'src/app/shared/models/weather';
import { LocationService } from 'src/app/shared/services/location.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { initTE, Timepicker, Datepicker } from 'tw-elements';
@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule, CommonModule, SharedModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {
  @Input() inputForm!: FormGroup;

  @Output() onShowData: EventEmitter<Coord>;

  public selectedLocation!: LocationProperties;
  public searchValue$!: Subject<string>;
  public searchedLocations!: any[];
  public searchedResults$!: Observable<LocationFeatures[]>;

  constructor(private readonly _locationService: LocationService){
    this.searchValue$ = new Subject<string>();
    this.onShowData = new EventEmitter<Coord>();
  }

  ngOnInit(): void {
    initTE({ Input, Timepicker, Datepicker });
    this.searchedResults$ = this.searchValue$.pipe(switchMap(change => {
      return this._locationService.getLocation(change).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(location => {
          return location.features;
        }))
    }));
  }

  onSelectSearch(event: { term: string; items: any[] }): void {
    this.searchValue$.next(event.term);
  }

  onScrollSearch(event: any): void {
    console.log(event);
  }

  onClearClick(): void {
    this.searchValue$.next('-');
  }

  clearInputs(): void {
    this.inputForm.reset();
  }

  showData(): void {
    this.onShowData.emit({lat: this.selectedLocation.lat, lon: this.selectedLocation.lon});
  }
}
