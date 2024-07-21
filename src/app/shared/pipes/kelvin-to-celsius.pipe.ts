import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius',
  standalone: true,
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(kelvin: number): number {
    if (kelvin < 0) {
      throw new Error('Temperatura w kelwinach nie może być mniejsza niż 0');
    }
    const celsius = kelvin - 273.15;
    return Math.round(celsius);
  }
}
