import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
var LeaderboardPage = /** @class */ (function () {
    function LeaderboardPage(firestoreService) {
        this.firestoreService = firestoreService;
    }
    ;
    LeaderboardPage.prototype.ngOnInit = function () {
        var _this = this;
        //loads all the collection from firestore
        //sort this list by score
        //only show the first 10 results
        this.scoreItemCollection = this.firestoreService.collection('scoreList', function (ref) { return ref.orderBy('score', 'desc').limit(10); });
        this.scoreItemCollection.valueChanges().subscribe(function (res) {
            _this.scoreItems = res;
        });
    };
    LeaderboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-leaderboard',
            templateUrl: './leaderboard.page.html',
            styleUrls: ['./leaderboard.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], LeaderboardPage);
    return LeaderboardPage;
}());
export { LeaderboardPage };
//# sourceMappingURL=leaderboard.page.js.map