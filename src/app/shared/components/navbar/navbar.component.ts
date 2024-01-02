import { Component, OnInit } from '@angular/core';
import {
  Collapse,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {
    initTE({ Collapse });
  }

}

