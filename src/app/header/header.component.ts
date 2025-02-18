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
  yearList: string[] = Array.from({ length: 2025 - 1960 + 1 }, (_, i) => (1960 + i).toString());
  genreList: string[] = [
    "ანიმაცია", "ბიოგრაფია", "დეტექტივი", "დოკუმენტური", "დრამა", "ვესტერნი",
    "კრიმინალური", "კომედია", "ისტორიული", "მელოდრამა", "მისტიური", "მიუზიკლი",
    "ეროტიული", "მძაფრსიუჟეტიანი", "საახალწლო", "რომანტიკული", "ზღაპრული",
    "სათავგადასავლო", "საომარი", "საოჯახო", "საშინელება", "სპორტული",
    "ტრილერი", "საბავშვო", "ფანტასტიკა"
  ];
  isGenreListVisible = false;
  selectedYear: string | null = null;

  selectYear(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = target.value;
    this.router.navigate(['/movies/', this.selectedYear]);
    this.isGenreListVisible = false;
  }

  showGenres(show: boolean) {
    this.isGenreListVisible = show;
  }

  onMoviesClick(event: MouseEvent) {
    // Check if the click was directly on `.movies`, not a child element
    if (event.target === event.currentTarget) {
      this.redirectToMovie();
    }
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
