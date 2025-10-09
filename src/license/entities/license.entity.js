"use strict";
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var License = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _licenseId_decorators;
    var _licenseId_initializers = [];
    var _licenseId_extraInitializers = [];
    var _key_decorators;
    var _key_initializers = [];
    var _key_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validTo_decorators;
    var _validTo_initializers = [];
    var _validTo_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var License = _classThis = /** @class */ (function () {
        function License_1() {
            this.licenseId = __runInitializers(this, _licenseId_initializers, void 0);
            this.key = (__runInitializers(this, _licenseId_extraInitializers), __runInitializers(this, _key_initializers, void 0));
            this.validFrom = (__runInitializers(this, _key_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
            this.validTo = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validTo_initializers, void 0));
            this.isActive = (__runInitializers(this, _validTo_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.user = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        return License_1;
    }());
    __setFunctionName(_classThis, "License");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _licenseId_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _key_decorators = [(0, typeorm_1.Column)()];
        _validFrom_decorators = [(0, typeorm_1.Column)()];
        _validTo_decorators = [(0, typeorm_1.Column)()];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: false })];
        _user_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.licenses; })];
        __esDecorate(null, null, _licenseId_decorators, { kind: "field", name: "licenseId", static: false, private: false, access: { has: function (obj) { return "licenseId" in obj; }, get: function (obj) { return obj.licenseId; }, set: function (obj, value) { obj.licenseId = value; } }, metadata: _metadata }, _licenseId_initializers, _licenseId_extraInitializers);
        __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: function (obj) { return "key" in obj; }, get: function (obj) { return obj.key; }, set: function (obj, value) { obj.key = value; } }, metadata: _metadata }, _key_initializers, _key_extraInitializers);
        __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
        __esDecorate(null, null, _validTo_decorators, { kind: "field", name: "validTo", static: false, private: false, access: { has: function (obj) { return "validTo" in obj; }, get: function (obj) { return obj.validTo; }, set: function (obj, value) { obj.validTo = value; } }, metadata: _metadata }, _validTo_initializers, _validTo_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        License = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return License = _classThis;
}();
exports.License = License;
