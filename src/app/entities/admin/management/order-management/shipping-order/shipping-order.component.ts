import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shipping-order",
  templateUrl: "./shipping-order.component.html",
  styleUrls: ["./shipping-order.component.scss"]
})
export class ShippingOrderComponent implements OnInit {
  @ViewChild("formSignUp", { static: false }) formSignUp: NgForm;
  @ViewChild("formEdit", { static: false }) formEdit: NgForm;
  constructor(private _dataService: DataService, private router: Router) {}

  ordertList: any = [];
  productsList: any = [];
  idProductEdit;
  totalPage: any = [];
  currentPage;
  times = 1;
  editflag: boolean = false;
  orderID;
  editOrderObj: any = {
    id: 0,
    orderId: 0,
    productId: 0,
    productNumber: 0,
    confirm: false,
    shipping: false,
    success: false,
    name: "",
    phone: "",
    address: "",
    email: "",
    userId: null
  };
  ngOnInit() {
    this.getAllOrder(1);
    if (sessionStorage.getItem("productsList")) {
      this.productsList = JSON.parse(sessionStorage.getItem("productsList"));
    } else {
      this.getAllProduct();
    }
  }

  getAllProduct() {
    const uri = `admin/getAllProductAdmin`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        for (let item of data.data) {
          this.productsList.push(item);
        }
        sessionStorage.setItem(
          "productsList",
          JSON.stringify(this.productsList)
        );

        console.log(this.productsList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllOrder(page) {
    const uri = `admin/getPurchasesShippingAdmin`;
    let message = {
      page
    };
    this.currentPage = page;

    this._dataService.post(uri, message).subscribe(
      (data: any) => {
        this.ordertList = data.data.data;
        console.log(data.data.data);
        console.log(this.ordertList);

        if (this.ordertList.length === 0 && page !== 1) {
          this.getAllOrder(page - 1);
        }

        let i = 1;
        this.totalPage = [];
        while (i <= data.data.numPage) {
          this.totalPage.push(i);
          i++;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  DeleteOrder(id) {
    console.log(id);
    const uri = `admin/order/${id}`;
    this._dataService.delete(uri).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
      },
      (err: any) => {
        alert(err.error.errors[0].errorMessage);
      }
    );
  }
  EditProduct(item) {
    console.log(item);
    this.editflag = true;
    this.idProductEdit = item.id;

    this.orderID = item.order_id;
    this.formEdit.setValue({
      name: item.name,
      phone: item.phone,
      email: item.email,
      address: item.address,
      productId: item.product_id,
      productNumber: item.product_number,
      types: item.confirm
    });
    this.editflag = true;
    console.log(this.formEdit.value);

    this.editOrderObj.id = item.id;
    this.editOrderObj.orderId = item.order_id;
    this.editOrderObj.productId = item.product_id;
    this.editOrderObj.userId = item.user;
  }

  _handleOnSubmitEditForm() {
    console.log(this.formEdit.value);
    this.editOrderObj.productNumber = this.formEdit.value.productNumber;
    console.log(this.formEdit.value.types);

    if (this.formEdit.value.types === 0 || this.formEdit.value.types === "0") {
      this.editOrderObj.confirm = true;
      this.editOrderObj.shipping = false;
      this.editOrderObj.success = false;
    } else if (
      this.formEdit.value.types === "1" ||
      this.formEdit.value.types === 1
    ) {
      this.editOrderObj.confirm = true;
      this.editOrderObj.shipping = true;
      this.editOrderObj.success = false;
    } else {
      this.editOrderObj.confirm = true;
      this.editOrderObj.shipping = true;
      this.editOrderObj.success = true;
    }

    this.editOrderObj.name = this.formEdit.value.name;
    this.editOrderObj.phone = this.formEdit.value.phone;
    this.editOrderObj.address = this.formEdit.value.address;
    this.editOrderObj.email = this.formEdit.value.email;
    console.log(this.editOrderObj);

    const uri = `admin/order/editPurchasesAdmin`;

    this._dataService.put(uri, this.editOrderObj).subscribe(
      (data: any) => {
        this.getAllOrder(this.currentPage);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
