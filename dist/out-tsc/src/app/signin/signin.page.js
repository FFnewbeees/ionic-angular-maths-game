import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
var SigninPage = /** @class */ (function () {
    function SigninPage(authService, formBuilder, router) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.router = router;
    }
    SigninPage.prototype.ngOnInit = function () {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    };
    SigninPage.prototype.signIn = function (formData) {
        var _this = this;
        this.authService.signIn(formData.email, formData.password)
            .then(function (response) {
            console.log(response);
            _this.router.navigate(['/home']);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SigninPage = tslib_1.__decorate([
        Component({
            selector: 'app-signin',
            templateUrl: './signin.page.html',
            styleUrls: ['./signin.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            FormBuilder,
            Router])
    ], SigninPage);
    return SigninPage;
}());
export { SigninPage };
//# sourceMappingURL=signin.page.js.map