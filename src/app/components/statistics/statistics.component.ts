import { Component } from '@angular/core';

type StatisticItem = {
  value: string;
  label: string;
};

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  readonly stats: StatisticItem[] = [
    {
      value: '110+',
      label: 'Top Agencies Trust Media LaCarte'
    },
    {
      value: '1M',
      label: 'Advertisers Reaching the Right Audience'
    },
    {
      value: '98.99%',
      label: 'Seamless Media Transactions for Owners'
    }
  ];
}
