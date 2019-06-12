import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
var FirestoreService = /** @class */ (function () {
    function FirestoreService(firestore) {
        this.firestore = firestore;
    }
    FirestoreService.prototype.addPlayerScore = function (playerName, score, date) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.firestore.collection('scoreList').add({ playerName: playerName, score: score, date: date })
                .then(function (response) { resolve(response); })
                .catch(function (error) { reject(error); });
        });
    };
    FirestoreService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], FirestoreService);
    return FirestoreService;
}());
export { FirestoreService };
//# sourceMappingURL=firestore.service.js.map