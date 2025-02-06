import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ehr-demo';

  constructor(private primeng: PrimeNG) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element && element.classList.toggle('dark-theme');
  }
}
