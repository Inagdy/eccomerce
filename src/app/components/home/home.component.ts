import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { GetAllCategoriesService } from '../../core/services/get-all-categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { SearchPipePipe } from '../../core/pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    CurrencyPipe,
    SearchPipePipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _GetAllCategoriesService = inject(GetAllCategoriesService);
  private _cartService = inject(CartService);
  private _toastr = inject(ToastrService);

  getAllInCart(data: string) {
    return this._cartService.addProductToCart(data).subscribe({
      next: (res) => {
        this._toastr.success(res.message, 'FreshCart');
      },
    });
  }

  getAllProducts!: Subscription;
  GetAllCategoriesService!: Subscription;
  productList: IProducts[] = [];
  categoriesList!: Icategory[];
  text: string = ' ';

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 700,
    items: 1,
    navText: ['', ''],
    nav: false,
  };

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
      1120: {
        items: 7,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.GetAllCategoriesService = this._GetAllCategoriesService
      .getCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList = res.data;
        },
      });

    this.getAllProducts = this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
    });
  }

  ngOnDestroy(): void {
    this.getAllProducts?.unsubscribe;
    this.GetAllCategoriesService?.unsubscribe;
  }
}
