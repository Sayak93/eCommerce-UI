import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/admin/product";
import { FormGroup, FormControl } from "@angular/forms";
import { HelperServiceService } from "../../helper-service.service";

@Component({
  selector: "app-product-dashboard",
  templateUrl: "./product-dashboard.component.html",
  styleUrls: ["./product-dashboard.component.css"]
})
export class ProductDashboardComponent implements OnInit {
  product: Product[];
  selectedProduct: Product;
  selected: Boolean;
  modal: Boolean;
  text: String;
  token: String;
  id: String;

  catagories = [{ p: "Shirt" }, { p: "Shoe" }];
  constructor(private helper: HelperServiceService) {}

  productForm = new FormGroup({
    _id : new FormControl(""),
    imgLink: new FormControl(""),
    productName: new FormControl(""),
    productPrice: new FormControl("")
  });
  ngOnInit() {
    this.text = "Add";
    this.modal = false;
    this.token = localStorage.getItem("token");
    this.id = localStorage.getItem("id");
    this.getProducts();
    this.selected = false;
    this.selectedProduct = {
      imgLink: "",
      productName: "",
      productPrice: 0
    };
  }

  getProducts() {
    this.helper.getProducts(this.token, this.id).subscribe(data => {
      if (data.message == "ok") {
        this.product = data.data;
      } else {
        alert("Failed");
      }
    });
  }
  select(data) {
    this.selectedProduct = data;
    this.selected = true;
    console.log(this.selectedProduct.imgLink);
  }
  onAdd() {
    if (this.text === "Add") {
      this.helper
        .addProduct(this.productForm.value, this.token, this.id)
        .subscribe(data => {
          this.modal = false;
          if (data.message == "ok") {
            alert("Product added");
            this.productForm.reset();
            this.getProducts();
          } else {
            alert("Failed");
          }
        });
    } else {
      this.onEdit();
    }
  }
  delete(data) {
    this.helper
      .deleteProduct(data, this.token, this.id)
      .subscribe(data => {
        if (data.message == "ok") {
          alert("Product deleted");
          this.getProducts();
        } else {
          alert("Failed");
        }
      });
  }
  prepareEdit(product) {
    this.text = "Edit";
    this.modal = true;
    delete product.__v;
    this.productForm.setValue(product);
  }

  prepareAdd() {
    this.text = 'Add';
    this.modal = true;
    this.productForm.reset();
  }

  onEdit() {
    this.helper
      .updateProduct(this.productForm.value, this.token, this.id)
      .subscribe(data => {
        if (data.message == "ok") {
          alert("edited added");
          this.text = "Add";
          this.modal = false;
          this.productForm.reset();
          this.getProducts();
        } else {
          alert("Failed");
        }
      });
  }
}
