import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private translateService = inject(TranslateService);
  handleChangeLang(lang: string) {
    this.translateService.use(lang);
  }
}
