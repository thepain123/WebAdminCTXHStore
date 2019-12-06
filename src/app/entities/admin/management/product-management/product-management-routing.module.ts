import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductManagementComponent } from "./product-management.component";

const routes: Routes = [
  {
    path: "",
    component: ProductManagementComponent,
    children: [{ path: "", component: ProductManagementComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule {}
