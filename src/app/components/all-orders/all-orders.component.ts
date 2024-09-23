import { AfterContentChecked, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponents implements OnInit {
  private readonly _CartService = inject(CartService);
  public cartOwner!: string;

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartOwner = res.data.cartOwner;
        console.log(this.cartOwner);
      },
      complete: () => {
        this._CartService.getUserOrders(this.cartOwner).subscribe({
          next: (res) => {
            console.log(res[0]);
          },
        });
      },
    });
  }
}
