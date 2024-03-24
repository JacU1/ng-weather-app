import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherDataService } from './services/weather-data.service';
import { SliderComponent } from './components/slider/slider.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, SliderComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, FooterComponent, SliderComponent],
  providers: [WeatherDataService]
})
export class SharedModule { }
