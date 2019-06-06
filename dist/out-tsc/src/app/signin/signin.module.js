import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SigninPage } from './signin.page';
var routes = [
    {
        path: '',
        component: SigninPage
    }
];
var SigninPageModule = /** @class */ (function () {
    function SigninPageModule() {
    }
    SigninPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [SigninPage]
        })
    ], SigninPageModule);
    return SigninPageModule;
}());
export { SigninPageModule };
//# sourceMappingURL=signin.module.js.map