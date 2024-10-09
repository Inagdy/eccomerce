import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  cart: Cart = {} as Cart;


  ngOnInit(): void {
    this._CartService.getAllItemsOnTheCart().subscribe({
      next: (res) => {
        this.cart = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletItem(data: string): void {
    this._CartService.deleteSpecificItem(data).subscribe({
      next: (res) => {
        this.cart = res.data;
      },
    });
  }

  deleteCart(): void {
    this._CartService.clearUsercart().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.cart = {} as Cart;
        }
      },
    });
  }
  addItemtocart(productId: string, numberOfitems: number) {
    this._CartService
      .updateCartProductQuantity(productId, numberOfitems)
      .subscribe({
        next: (res) => {
          this.cart = res.data;


        },
      });
  }
}
