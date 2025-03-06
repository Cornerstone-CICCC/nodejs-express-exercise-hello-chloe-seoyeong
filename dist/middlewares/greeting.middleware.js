"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeting = greeting;
function greeting(req, res, next) {
    console.log("Welcome to express exercise!");
    next();
}
