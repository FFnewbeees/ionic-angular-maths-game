import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AlertController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(dialogs, alertController) {
        this.dialogs = dialogs;
        this.alertController = alertController;
        this.score = 0;
        this.time = 3;
        this.questionNumber = 1;
        this.started = false;
        //for stop time
        this.stop = false;
        //for check box
        this.correct = false;
        this.question = {
            firstNumber: 0,
            secondNumber: 0,
            answer: 0
        };
    }
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.startGame = function () {
        this.startTimer();
        this.started = true;
        this.generateQuestion();
    };
    HomePage.prototype.startTimer = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.time > 0) {
                _this.time--;
            }
            else {
                _this.time = 0;
                _this.stop = true;
                _this.started = false;
                _this.showDialog();
            }
        }, 1000);
    };
    HomePage.prototype.stopGame = function () {
        clearInterval(this.interval);
        this.stop = true;
    };
    HomePage.prototype.continueGame = function () {
        this.stop = false;
        this.startTimer();
    };
    HomePage.prototype.generateQuestion = function () {
        this.question.firstNumber = Math.floor(Math.random() * 100) + 1;
        this.question.secondNumber = Math.floor(Math.random() * 100) + 1;
        this.question.answer = this.question.firstNumber + this.question.secondNumber;
        this.correct = false;
        console.log(this.question.answer);
    };
    HomePage.prototype.checkAnswer = function () {
        var _this = this;
        if (parseInt(this.userInput) == this.question.answer) {
            this.score += 5;
            this.correct = true;
            //clear input area
            this.userInput = "";
            if (this.time > 0) {
                //set 1 sec delay
                setTimeout(function () {
                    _this.generateQuestion();
                    _this.questionNumber++;
                }, 1000);
            }
            else {
                //end game
                this.stop = true;
                this.started = false;
                this.showDialog();
            }
        }
        else {
            //incorrect answer
            this.message = "Incorrect!  Try Again";
            setTimeout(function () {
                _this.message = "";
            }, 1000);
            //clear input area
            this.userInput = "";
        }
    };
    HomePage.prototype.showDialog = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dialogs;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Congratulations",
                            subHeader: "",
                            message: "Please Enter Your Name",
                            buttons: [
                                {
                                    text: 'Skip',
                                    role: 'skip',
                                    handler: function (data) {
                                        console.log('skiped');
                                    }
                                },
                                {
                                    text: 'OK',
                                    handler: function (data) {
                                        if (data != null)
                                            console.log(JSON.stringify(data));
                                        console.log("name:" + data.username + " score:" + _this.score);
                                    }
                                }
                            ],
                            inputs: [
                                {
                                    name: 'username',
                                    placeholder: "username"
                                }
                            ]
                        })];
                    case 1:
                        dialogs = _a.sent();
                        return [4 /*yield*/, dialogs.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Dialogs, AlertController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map