import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedGenres: string[] = [];
  genreList: string[] = [
    "ანიმაცია", "ბიოგრაფია", "დეტექტივი", "დოკუმენტური", "დრამა", "ვესტერნი",
    "კრიმინალური", "კომედია", "ისტორიული", "მელოდრამა", "მისტიური", "მიუზიკლი",
    "ეროტიული", "მძაფრსიუჟეტიანი", "საახალწლო", "რომანტიკული", "ზღაპრული",
    "სათავგადასავლო", "საომარი", "საოჯახო", "საშინელება", "სპორტული",
    "ტრილერი", "საბავშვო", "ფანტასტიკა"
  ];
  isGenreListVisible = false;

  showGenres(show: boolean) {
    this.isGenreListVisible = show;
  }

  redirectToGenre(genre: string, event: MouseEvent) {
    event.stopPropagation(); // Stop the event from propagating to the parent
    this.router.navigate(['/movies/', genre]);
    this.isGenreListVisible = false;
  }

  redirectToMovie() {
    this.router.navigate(['/movies']); // Pass only one genre
    this.isGenreListVisible = false;
  }


  constructor(private router: Router){}
    isMenuOpen = false;

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }

    redirect(link: String){
        this.router.navigate([link])
    }

}
