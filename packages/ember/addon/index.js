var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { tracked } from '@glimmer/tracking';
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
    tracked
], Foo.prototype, "value", void 0);
export const adapter = {
    create(value) {
        return new Foo(value);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsY0FBYztBQUNkLGNBQWM7QUFDZCwyQ0FBMkM7QUFFM0MsTUFBTSxHQUFHO0lBR1AsWUFBWSxLQUFRO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsQ0FBSTtRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQWJVO0lBQVIsT0FBTztrQ0FBVTtBQWVwQixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQW9CO0lBQ3RDLE1BQU0sQ0FBSSxLQUFRO1FBQ2hCLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdGl2ZUFkYXB0ZXIsIFJlYWN0aXZlU2lnbmFsIH0gZnJvbSAnQGRhdGEtZWRlbi9yZWFjdGl2aXR5JztcbmltcG9ydCB7IHRyYWNrZWQgfSBmcm9tICdAZ2xpbW1lci90cmFja2luZyc7XG4vLyBpbXBvcnQge1xuLy8gICBjcmVhdGVTdG9yYWdlLFxuLy8gICBnZXRWYWx1ZSxcbi8vICAgc2V0VmFsdWUsXG4vLyB9IGZyb20gJ2VtYmVyLXRyYWNrZWQtc3RvcmFnZS1wb2x5ZmlsbCc7XG5cbmNsYXNzIEZvbzxUPiB7XG4gIEB0cmFja2VkIHZhbHVlOiBUO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBUKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG4gIHdyaXRlKHY6IFQpIHtcbiAgICB0aGlzLnZhbHVlID0gdjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRhcHRlcjogUmVhY3RpdmVBZGFwdGVyID0ge1xuICBjcmVhdGU8VD4odmFsdWU6IFQpOiBSZWFjdGl2ZVNpZ25hbDxUPiB7XG4gICAgcmV0dXJuIG5ldyBGb28odmFsdWUpO1xuICB9LFxufTtcbiJdfQ==