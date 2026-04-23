import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MediaComponent } from './components/media/media.component';
import { ServicesComponent } from './components/services/services.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { InteractiveStatsComponent } from './components/interactive-stats/interactive-stats.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MediaComponent,
    ServicesComponent,
    SolutionsComponent,
    InteractiveStatsComponent,
    StatisticsComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'media-landing-page';
}
