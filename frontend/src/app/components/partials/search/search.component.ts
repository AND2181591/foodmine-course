import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm = '';

  activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  public search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }
}
