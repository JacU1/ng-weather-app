import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WeatherDataService } from './services/weather-data.service';



@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, FooterComponent],
  providers: [WeatherDataService]
})
export class SharedModule { }
