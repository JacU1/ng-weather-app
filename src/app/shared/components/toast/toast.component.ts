import { Component, OnInit } from '@angular/core';
import {
  Toast,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Toast });    
  }
}
