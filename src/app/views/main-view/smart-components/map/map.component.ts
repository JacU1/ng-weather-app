import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { View } from 'ol';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { take } from 'rxjs';
import { LocationProperties } from 'src/app/shared/models/location';
import { LocationService } from 'src/app/shared/services/location.service';
import { config } from 'src/app/shared/config'
import { Coord } from 'src/app/shared/models/weather';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() set location(value: Coord) {
    this.mapchangehandler(value.lat, value.lon);
  }
  public map?: Map;

  constructor() {}

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
      target: 'ol-map',
    });
  }

  mapchangehandler(lon: number, lat: number): void {
    const oldmap = document.getElementById('ol-map');
    const newmap = document.createElement('div');

    newmap.setAttribute('id', 'ol-map');
    newmap.setAttribute('style', 'height: 30vh; width: 100%;');

    document.getElementById('map-contaier')!.replaceChild(newmap, oldmap!);
    this.initmap(lon, lat);
  }
}
