import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { IcartProduct } from '../../core/interfaces/icart-product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponents implements OnInit {
  private readonly _CartService = inject(CartService);
  public cartOwner!: Icart;
  public cartdetails !:IcartProduct[];



  ngOnInit():void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartOwner =res;
       
      },
      complete: () => {
        this._CartService.getUserOrders(this.cartOwner.data.cartOwner).subscribe({
          next: (res) => {
             this.cartdetails=res

             console.log(this.cartdetails);
             
          },
        });
      },
    });
  }
}


