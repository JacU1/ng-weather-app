import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherDataService } from './services/weather-data.service';
import { SliderComponent } from './components/slider/slider.component';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { AccordionComponent } from './components/accordion/accordion.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, SliderComponent,AccordionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    KelvinToCelsiusPipe
  ],
  exports: [NavbarComponent, FooterComponent, SliderComponent, TranslateModule, KelvinToCelsiusPipe, AccordionComponent],
  providers: [WeatherDataService, LocationService]
})
export class SharedModule { }
