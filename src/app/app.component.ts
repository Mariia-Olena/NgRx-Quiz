import { Component, inject } from '@angular/core';
import { SharedModule } from './shared.module';
import { AppStore } from './store/app.store';
import { BusyComponent } from './components/busy/busy.component';

@Component({
  selector: 'app-root',
  imports: [SharedModule, BusyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly store = inject(AppStore);
}
