"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCommonEntity = void 0;
var typeorm_1 = require("typeorm");
var ProductCommonEntity = function () {
    var _a;
    var _classSuper = typeorm_1.BaseEntity;
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _generic_decorators;
    var _generic_initializers = [];
    var _generic_extraInitializers = [];
    var _brand_decorators;
    var _brand_initializers = [];
    var _brand_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _form_decorators;
    var _form_initializers = [];
    var _form_extraInitializers = [];
    var _strength_decorators;
    var _strength_initializers = [];
    var _strength_extraInitializers = [];
    var _unit_decorators;
    var _unit_initializers = [];
    var _unit_extraInitializers = [];
    var _isPaid_decorators;
    var _isPaid_initializers = [];
    var _isPaid_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _referenceNo_decorators;
    var _referenceNo_initializers = [];
    var _referenceNo_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(ProductCommonEntity, _super);
            function ProductCommonEntity() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.productId = __runInitializers(_this, _productId_initializers, void 0);
                _this.code = (__runInitializers(_this, _productId_extraInitializers), __runInitializers(_this, _code_initializers, void 0));
                _this.name = (__runInitializers(_this, _code_extraInitializers), __runInitializers(_this, _name_initializers, void 0));
                _this.generic = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _generic_initializers, void 0));
                _this.brand = (__runInitializers(_this, _generic_extraInitializers), __runInitializers(_this, _brand_initializers, void 0));
                _this.category = (__runInitializers(_this, _brand_extraInitializers), __runInitializers(_this, _category_initializers, void 0));
                _this.form = (__runInitializers(_this, _category_extraInitializers), __runInitializers(_this, _form_initializers, void 0));
                _this.strength = (__runInitializers(_this, _form_extraInitializers), __runInitializers(_this, _strength_initializers, void 0));
                _this.unit = (__runInitializers(_this, _strength_extraInitializers), __runInitializers(_this, _unit_initializers, void 0));
                _this.isPaid = (__runInitializers(_this, _unit_extraInitializers), __runInitializers(_this, _isPaid_initializers, void 0));
                _this.price = (__runInitializers(_this, _isPaid_extraInitializers), __runInitializers(_this, _price_initializers, void 0));
                _this.quantity = (__runInitializers(_this, _price_extraInitializers), __runInitializers(_this, _quantity_initializers, void 0));
                _this.referenceNo = (__runInitializers(_this, _quantity_extraInitializers), __runInitializers(_this, _referenceNo_initializers, void 0));
                _this.description = (__runInitializers(_this, _referenceNo_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
                _this.userId = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _userId_initializers, void 0));
                _this.createdAt = (__runInitializers(_this, _userId_extraInitializers), __runInitializers(_this, _createdAt_initializers, void 0));
                _this.updatedAt = (__runInitializers(_this, _createdAt_extraInitializers), __runInitializers(_this, _updatedAt_initializers, void 0));
                __runInitializers(_this, _updatedAt_extraInitializers);
                return _this;
            }
            return ProductCommonEntity;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _productId_decorators = [(0, typeorm_1.Column)()];
            _code_decorators = [(0, typeorm_1.Column)()];
            _name_decorators = [(0, typeorm_1.Column)()];
            _generic_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _brand_decorators = [(0, typeorm_1.Column)()];
            _category_decorators = [(0, typeorm_1.Column)()];
            _form_decorators = [(0, typeorm_1.Column)()];
            _strength_decorators = [(0, typeorm_1.Column)()];
            _unit_decorators = [(0, typeorm_1.Column)()];
            _isPaid_decorators = [(0, typeorm_1.Column)()];
            _price_decorators = [(0, typeorm_1.Column)({ type: 'float' })];
            _quantity_decorators = [(0, typeorm_1.Column)()];
            _referenceNo_decorators = [(0, typeorm_1.Column)()];
            _description_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _userId_decorators = [(0, typeorm_1.Column)()];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _generic_decorators, { kind: "field", name: "generic", static: false, private: false, access: { has: function (obj) { return "generic" in obj; }, get: function (obj) { return obj.generic; }, set: function (obj, value) { obj.generic = value; } }, metadata: _metadata }, _generic_initializers, _generic_extraInitializers);
            __esDecorate(null, null, _brand_decorators, { kind: "field", name: "brand", static: false, private: false, access: { has: function (obj) { return "brand" in obj; }, get: function (obj) { return obj.brand; }, set: function (obj, value) { obj.brand = value; } }, metadata: _metadata }, _brand_initializers, _brand_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _form_decorators, { kind: "field", name: "form", static: false, private: false, access: { has: function (obj) { return "form" in obj; }, get: function (obj) { return obj.form; }, set: function (obj, value) { obj.form = value; } }, metadata: _metadata }, _form_initializers, _form_extraInitializers);
            __esDecorate(null, null, _strength_decorators, { kind: "field", name: "strength", static: false, private: false, access: { has: function (obj) { return "strength" in obj; }, get: function (obj) { return obj.strength; }, set: function (obj, value) { obj.strength = value; } }, metadata: _metadata }, _strength_initializers, _strength_extraInitializers);
            __esDecorate(null, null, _unit_decorators, { kind: "field", name: "unit", static: false, private: false, access: { has: function (obj) { return "unit" in obj; }, get: function (obj) { return obj.unit; }, set: function (obj, value) { obj.unit = value; } }, metadata: _metadata }, _unit_initializers, _unit_extraInitializers);
            __esDecorate(null, null, _isPaid_decorators, { kind: "field", name: "isPaid", static: false, private: false, access: { has: function (obj) { return "isPaid" in obj; }, get: function (obj) { return obj.isPaid; }, set: function (obj, value) { obj.isPaid = value; } }, metadata: _metadata }, _isPaid_initializers, _isPaid_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _referenceNo_decorators, { kind: "field", name: "referenceNo", static: false, private: false, access: { has: function (obj) { return "referenceNo" in obj; }, get: function (obj) { return obj.referenceNo; }, set: function (obj, value) { obj.referenceNo = value; } }, metadata: _metadata }, _referenceNo_initializers, _referenceNo_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProductCommonEntity = ProductCommonEntity;
