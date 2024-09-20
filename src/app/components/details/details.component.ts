import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IspecificItem } from '../../core/interfaces/ispecific-item';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _getSpecificCategories = inject(ProductsService);
  productID!: string;

  specificItem: IspecificItem | null = null;

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (p) => {
        let productID = p.get('productId');
        // console.log(p);

        this._getSpecificCategories.getSpecificProducts(productID).subscribe({
          next: (res) => {
            this.specificItem = res.data;
            console.log(res.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
}
