"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const tracking_1 = require("@glimmer/tracking");
// import {
//   createStorage,
//   getValue,
//   setValue,
// } from 'ember-tracked-storage-polyfill';
class Foo {
    constructor(value) {
        this.value = value;
    }
    read() {
        return this.value;
    }
    write(v) {
        this.value = v;
    }
}
__decorate([
    tracking_1.tracked
], Foo.prototype, "value", void 0);
exports.adapter = {
    create(value) {
        return new Foo(value);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsZ0RBQTRDO0FBQzVDLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsY0FBYztBQUNkLGNBQWM7QUFDZCwyQ0FBMkM7QUFFM0MsTUFBTSxHQUFHO0lBR1AsWUFBWSxLQUFRO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBSTtRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQWJVO0lBQVIsa0JBQU87a0NBQVU7QUFlUCxRQUFBLE9BQU8sR0FBb0I7SUFDdEMsTUFBTSxDQUFJLEtBQVE7UUFDaEIsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0aXZlQWRhcHRlciwgUmVhY3RpdmVTaWduYWwgfSBmcm9tICdAZGF0YS1lZGVuL3JlYWN0aXZpdHknO1xuaW1wb3J0IHsgdHJhY2tlZCB9IGZyb20gJ0BnbGltbWVyL3RyYWNraW5nJztcbi8vIGltcG9ydCB7XG4vLyAgIGNyZWF0ZVN0b3JhZ2UsXG4vLyAgIGdldFZhbHVlLFxuLy8gICBzZXRWYWx1ZSxcbi8vIH0gZnJvbSAnZW1iZXItdHJhY2tlZC1zdG9yYWdlLXBvbHlmaWxsJztcblxuY2xhc3MgRm9vPFQ+IHtcbiAgQHRyYWNrZWQgdmFsdWU6IFQ7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFQpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWFkKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgd3JpdGUodjogVCkge1xuICAgIHRoaXMudmFsdWUgPSB2O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGFwdGVyOiBSZWFjdGl2ZUFkYXB0ZXIgPSB7XG4gIGNyZWF0ZTxUPih2YWx1ZTogVCk6IFJlYWN0aXZlU2lnbmFsPFQ+IHtcbiAgICByZXR1cm4gbmV3IEZvbyh2YWx1ZSk7XG4gIH0sXG59O1xuIl19