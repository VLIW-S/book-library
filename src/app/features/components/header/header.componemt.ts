import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatButtonModule, RouterLink, MatButtonModule],
  templateUrl: './header.componemt.html',
  styleUrl: './header.componemt.scss'
})
export class HeaderComponemt {
  title = input.required<string>();
  actionLink = input<string[] | null>(null);
  actionLabel = input<string | null>(null);
}
