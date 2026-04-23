import { Component } from '@angular/core';

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly brandTitle = 'media alacarte';
  readonly tagline = 'The Future Media Hub';

  readonly quickLinksLeft: FooterLink[] = [
    { label: 'The Platform', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'Benefits', href: '#' },
    { label: 'Request a Demo', href: '#' }
  ];

  readonly quickLinksRight: FooterLink[] = [
    { label: 'Contact Us', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ];

  readonly socialLinks: SocialLink[] = [
    { label: 'LinkedIn', href: '#', icon: 'in' },
    { label: 'Twitter', href: '#', icon: '𝕏' }
  ];

  readonly addressLines: string[] = [
    'Makateb 2 Building Floor 4, Office 406',
    'Dubai Production City, Dubai',
    'United Arab Of Emirates'
  ];

  readonly email = 'admin@mediaalacarte.net';
}
