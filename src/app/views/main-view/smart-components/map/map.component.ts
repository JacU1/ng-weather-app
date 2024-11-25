import { defaults } from './../../../../shared/defaults';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Input,
  signal,
} from '@angular/core';
import { View } from 'ol';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Coord } from 'src/app/shared/models/weather';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  location = input<Coord>();

  map?: Map;
  defaults = defaults;

  constructor() {
    effect(() => {
      if(this.location()) this.mapchangehandler(this.location()?.lon, this.location()?.lat)
    });
  }

  initmap(lon?: number, lat?: number): void {
    useGeographic();
    const center = lon && lat ? [lon, lat] : defaults.center;
    this.map = new Map({
      view: new View({
        center: center,
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

  mapchangehandler(lon?: number, lat?: number): void {
    const oldmap = document.getElementById('ol-map');
    const newmap = document.createElement('div');

    newmap.setAttribute('id', 'ol-map');
    newmap.setAttribute('style', 'height: 30vh; width: 100%;');

    document.getElementById('map-contaier')!.replaceChild(newmap, oldmap!);
    this.initmap(lon, lat);
  }
}
