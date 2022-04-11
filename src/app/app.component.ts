import { NgModule, Component, ViewChild, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxButtonModule,
  DxFormModule,
  DxAutocompleteModule,
  DxFormComponent
} from "devextreme-angular";
import notify from "devextreme/ui/notify";

import { Customer, Service } from "./app.service";

const sendRequest = function (value) {
  const validEmail = "test@dx-email.com";
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value === validEmail);
    }, 1000);
  });
};

@Component({
  selector: "demo-app",
  providers: [Service],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  password = "";

  passwordOptions: any = {
    mode: "password",
    value: this.password
  };

  customer: Customer;

  ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/;

  macRegex = /^([0-9A-Fa-f]{2}[-]){5}([0-9A-Fa-f]{2})$/;

  countries: string[];

  cities: string[];

  maxDate: Date = new Date();

  cityPattern = "^[^0-9]+$";

  namePattern: any = /^[^0-9]+$/;

  phonePattern: any = /^[02-9]\d{9}$/;

  phoneRules: any = {
    X: /[02-9]/
  };

  buttonOptions: any = {
    text: "Register",
    type: "success",
    useSubmitBehavior: true
  };

  passwordComparison = () => this.form.instance.option("formData").Password;

  checkComparison() {
    return true;
  }

  constructor(service: Service) {
    this.maxDate = new Date(
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 21)
    );
    this.countries = service.getCountries();
    this.cities = service.getCities();
    this.customer = service.getCustomer();
  }

  asyncValidation(params) {
    return sendRequest(params.value);
  }

  onFormSubmit = function (e) {
    notify(
      {
        message: "You have submitted the form",
        position: {
          my: "center top",
          at: "center top"
        }
      },
      "success",
      3000
    );

    e.preventDefault();
  };
}

@NgModule({
  imports: [
    BrowserModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxAutocompleteModule,
    DxFormModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
