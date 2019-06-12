import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LeaderboardPage } from './leaderboard.page';
var routes = [
    {
        path: '',
        component: LeaderboardPage
    }
];
var LeaderboardPageModule = /** @class */ (function () {
    function LeaderboardPageModule() {
    }
    LeaderboardPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LeaderboardPage]
        })
    ], LeaderboardPageModule);
    return LeaderboardPageModule;
}());
export { LeaderboardPageModule };
//# sourceMappingURL=leaderboard.module.js.map