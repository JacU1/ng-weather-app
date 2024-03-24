import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { View } from 'ol';
import Map from 'ol/Map';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  public currentLocation$: Subject<GeolocationPosition> = new Subject<GeolocationPosition>();
  public map!: Map;

  constructor(){}

  ngOnInit(): void {
    this.getCurrentLocation();
    this.currentLocation$.subscribe(res => {
      this.initmap(res.coords.latitude, res.coords.longitude);
    })
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((values) => {
        this.currentLocation$.next(values);
      },this.showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
    }
  }

  initmap(lat: number, lon: number): void {
    useGeographic();
    const place = [lon, lat];

    this.map = new Map({
      view: new View({
        center: place,
        zoom: 9,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }

  mapchangehandler(lon: string, lat: string) : void {

    const oldmap = document.getElementById('ol-map');
    const newmap = document.createElement('div');
    newmap.setAttribute('id','map');
    newmap.setAttribute('style','height: 500px; width: 40%;')

    // document.getElementById('maps-contaier-class').replaceChild(newmap,oldmap);

    // this.initmap(lon,lat,'map');
  }

}
