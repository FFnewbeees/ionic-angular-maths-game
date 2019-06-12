import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { FirestoreService } from '../services/data/firestore.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
var HomePage = /** @class */ (function () {
    function HomePage(dialogs, firestoreService, loadingCtrl, datePipe) {
        this.dialogs = dialogs;
        this.firestoreService = firestoreService;
        this.loadingCtrl = loadingCtrl;
        this.datePipe = datePipe;
        this.score = 0;
        this.time = 60;
        this.questionNumber = 1;
        //flag to control if still playing game
        this.started = false;
        //for stop timer
        this.stop = false;
        //for check box
        this.correct = false;
        this.question = {
            firstNumber: 0,
            secondNumber: 0,
            answer: 0
        };
        var tempDate = new Date();
        this.myDate = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
    }
    HomePage.prototype.ngOnInit = function () {
        //setting up for game
        this.score = 0;
        this.time = 60;
        this.questionNumber = 1;
        this.userInput = "";
    };
    HomePage.prototype.startGame = function () {
        this.ngOnInit();
        this.startTimer();
        this.generateQuestion();
        this.started = true;
    };
    HomePage.prototype.startTimer = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.time > 0) {
                _this.time--;
            }
            else {
                _this.time = 0;
                _this.started = false;
                //some bugs here
                clearInterval(_this.interval);
                _this.stop = false;
                //show dialog when game finish
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
                this.started = false;
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
    HomePage.prototype.addPlayerScore = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create()];
                    case 1:
                        loading = _a.sent();
                        this.firestoreService.addPlayerScore(this.playerName, this.score, this.myDate)
                            .then(function (response) {
                            console.log(response);
                            loading.dismiss();
                        })
                            .catch(function (error) {
                            console.log(error);
                        });
                        return [4 /*yield*/, loading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.showDialog = function () {
        var _this = this;
        this.dialogs.prompt('Please enter your name', // message
        'Congratulation', // title
        ['Ok', 'Skip'], // buttonLabels
        '' // defaultText
        ).then(function (res) {
            console.log(res);
            _this.playerName = res.input1;
            if (_this.playerName != null && res.buttonIndex == 1) {
                //store these data into firebase
                _this.addPlayerScore();
            }
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Dialogs,
            FirestoreService,
            LoadingController,
            DatePipe])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map