import { Component } from '@angular/core';

type SolutionCard = {
  icon: string;
  title: string;
  description: string;
  variant?: 'dark' | 'highlight';
};

@Component({
  selector: 'app-solutions',
  standalone: true,
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent {
  readonly featuredImage =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80';

  readonly cards: SolutionCard[] = [
    {
      icon: '📣',
      title: 'Campaign Planning',
      description:
        'Plan and optimize your ad campaigns with data-driven insights and seamless collaboration for maximum impact.',
      variant: 'dark'
    },
    {
      icon: '▶',
      title: 'Media Buying',
      description:
        'Effortlessly book media slots with AI-powered automation, ensuring cost efficiency and better reach.',
      variant: 'dark'
    },
    {
      icon: 'Ad',
      title: 'Ad Distribution',
      description:
        'Distribute ads across multiple channels while ensuring precise targeting and real-time tracking.',
      variant: 'highlight'
    },

  ];
}
