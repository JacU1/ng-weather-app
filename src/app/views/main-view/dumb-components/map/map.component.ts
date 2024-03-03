import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { View } from 'ol';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {
    this.initmap();
  }

  initmap(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
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
