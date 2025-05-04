import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { TagsService } from "../../services/tags.service";
import { ArticleListConfig } from "../../models/article-list-config.model";
import { AsyncPipe, NgClass, NgForOf } from "@angular/common";
import { ArticleListComponent } from "../../components/article-list.component";
import { tap } from "rxjs/operators";
import { UserService } from "../../../../core/auth/services/user.service";
import { RxLet } from "@rx-angular/template/let";
import { IfAuthenticatedDirective } from "../../../../core/auth/if-authenticated.directive";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [
    NgClass,
    ArticleListComponent,
    AsyncPipe,
    RxLet,
    NgForOf,
    IfAuthenticatedDirective,
    RouterLink,
  ],
  standalone: true,
})
export default class HomeComponent implements OnInit {
  isAuthenticated = false;
  listConfig: ArticleListConfig = {
    type: "all",
    filters: {},
  };
  tags$ = inject(TagsService)
    .getAll()
    .pipe(tap(() => (this.tagsLoaded = true)));
  tagsLoaded = false;
  destroyRef = inject(DestroyRef);

  sampleArticles = [
    {
      id: 9001,
      slug: "angular-architecture",
      titre: "Mastering Angular Architecture",
      description: "A deep dive into scalable component-driven architecture.",
      tagList: ["Angular", "Architecture", "BestPractices"],
    },
    {
      id: 9002,
      slug: "rxjs-streams",
      titre: "Understanding RxJS Streams",
      description: "Reactive programming made simple with real examples.",
      tagList: ["RxJS", "Observables", "Streams"],
    },
    {
      id: 9003,
      slug: "forms-guide",
      titre: "Forms in Angular: Reactive vs Template",
      description: "Learn the pros and cons of both approaches.",
      tagList: ["Forms", "ReactiveForms", "UX"],
    },
    {
      id: 9004,
      slug: "routing-deepdive",
      titre: "Angular Routing Deep Dive",
      description: "Everything you need to know about Angular router.",
      tagList: ["Routing", "Guards", "LazyLoading"],
    },
    {
      id: 9005,
      slug: "performance-boost",
      titre: "Boosting Angular Performance",
      description: "Tips to make your Angular app blazing fast.",
      tagList: ["Performance", "Optimization", "Angular"],
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated
      .pipe(
        tap((isAuthenticated) => {
          if (isAuthenticated) {
            this.setListTo("feed");
          } else {
            this.setListTo("all");
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(
        (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated),
      );
  }

  setListTo(type: string = "", filters: Object = {}): void {
    if (type === "feed" && !this.isAuthenticated) {
      void this.router.navigate(["/login"]);
      return;
    }

    this.listConfig = { type: type, filters: filters };
  }
}
