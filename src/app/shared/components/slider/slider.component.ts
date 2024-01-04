import { Component, OnInit } from '@angular/core';
import {
  Carousel,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Carousel });
  }
}
