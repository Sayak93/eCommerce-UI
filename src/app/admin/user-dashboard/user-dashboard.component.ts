import { Component, OnInit } from "@angular/core";
import { User } from "src/app/admin/user";
import { FormGroup, FormControl } from "@angular/forms";
import { HelperServiceService } from "src/app/helper-service.service";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit {
  users: User[];
  selectedUser: User;
  selected: Boolean;
  User: User[] = [ ];
  public token: String;
  public id: String;
  modal: Boolean;
  text: String;

  userForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl(""),
    _id: new FormControl("")
  });

  constructor(private helper: HelperServiceService) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.id = localStorage.getItem("id");
    this.selected = false;
    this.getUsers();
    this.selectedUser = {
      name : "",
      email: "",
      role: "",
      _id: '',
      password: ''
    };
  }

  getUsers() {
    this.helper.getUser(this.token, this.id).subscribe(
      users => {
        this.users = users.data;
      }
    );
  }
  select(data) {
    this.selectedUser = data;
    this.selected = true;
  }
  onAdd() {
    if (this.text === "Add") {
      this.helper
        .addUser(this.userForm.value, this.token, this.id)
        .subscribe(data => {
          this.modal = false;
          if (data.message == "ok") {
            alert("User added");
            this.userForm.reset();
            this.getUsers();
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
      .deleteUser(data, this.token, this.id)
      .subscribe(data => {
        if (data.message == "ok") {
          alert("User deleted");
          this.getUsers();
        } else {
          alert("Failed");
        }
      });
  }
  onEdit() {
    this.helper
      .updateUser(this.userForm.value, this.token, this.id)
      .subscribe(data => {
        if (data.message == "ok") {
          alert("edited added");
          this.text = "Add";
          this.modal = false;
          this.userForm.reset();
          this.getUsers();
        } else {
          alert("Failed");
        }
      });
  }

  prepareEdit(user) {
    this.text = "Edit";
    this.modal = true;
    delete user.__v;
    this.userForm.setValue(user);
    this.userForm.patchValue({
      'role': user.role
    });
    this.userForm.get("role").setValue(user.role);

  }

  prepareAdd() {
    this.text = 'Add';
    this.modal = true;
    this.userForm.reset();
  }
}
