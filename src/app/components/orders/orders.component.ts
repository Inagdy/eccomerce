import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _toastr =inject(ToastrService)

  cartId: string | null = ' ';

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartId');
      },
    });
  }

  orderSubmit(): void {
    console.log(this.orders.value);
    this._CartService.checkOut(this.orders.value, this.cartId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status ==="success") {
          window.open(res.session.url ,'_self')
          
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
