"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const ember_tracked_storage_polyfill_1 = require("ember-tracked-storage-polyfill");
exports.adapter = {
    create(value) {
        const s = (0, ember_tracked_storage_polyfill_1.createStorage)(value);
        return {
            read() {
                return (0, ember_tracked_storage_polyfill_1.getValue)(s);
            },
            write(v) {
                (0, ember_tracked_storage_polyfill_1.setValue)(s, v);
            },
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUZBSXdDO0FBRTNCLFFBQUEsT0FBTyxHQUFvQjtJQUN0QyxNQUFNLENBQUksS0FBUTtRQUNoQixNQUFNLENBQUMsR0FBRyxJQUFBLDhDQUFhLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsT0FBTztZQUNMLElBQUk7Z0JBQ0YsT0FBTyxJQUFBLHlDQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUNELEtBQUssQ0FBQyxDQUFJO2dCQUNSLElBQUEseUNBQVEsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQztTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0aXZlQWRhcHRlciwgUmVhY3RpdmVTaWduYWwgfSBmcm9tICdAZGF0YS1lZGVuL3JlYWN0aXZpdHknO1xuaW1wb3J0IHtcbiAgY3JlYXRlU3RvcmFnZSxcbiAgZ2V0VmFsdWUsXG4gIHNldFZhbHVlLFxufSBmcm9tICdlbWJlci10cmFja2VkLXN0b3JhZ2UtcG9seWZpbGwnO1xuXG5leHBvcnQgY29uc3QgYWRhcHRlcjogUmVhY3RpdmVBZGFwdGVyID0ge1xuICBjcmVhdGU8VD4odmFsdWU6IFQpOiBSZWFjdGl2ZVNpZ25hbDxUPiB7XG4gICAgY29uc3QgcyA9IGNyZWF0ZVN0b3JhZ2UodmFsdWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZShzKTtcbiAgICAgIH0sXG4gICAgICB3cml0ZSh2OiBUKSB7XG4gICAgICAgIHNldFZhbHVlKHMsIHYpO1xuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcbiJdfQ==