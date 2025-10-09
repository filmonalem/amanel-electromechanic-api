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
exports.User = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var user_role_enum_1 = require("../enums/user-role.enum");
var license_entity_1 = require("../../license/entities/license.entity");
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _profilePicture_decorators;
    var _profilePicture_initializers = [];
    var _profilePicture_extraInitializers = [];
    var _passwordResetToken_decorators;
    var _passwordResetToken_initializers = [];
    var _passwordResetToken_extraInitializers = [];
    var _passwordResetExpires_decorators;
    var _passwordResetExpires_initializers = [];
    var _passwordResetExpires_extraInitializers = [];
    var _lastLogin_decorators;
    var _lastLogin_initializers = [];
    var _lastLogin_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _isAdmin_decorators;
    var _isAdmin_initializers = [];
    var _isAdmin_extraInitializers = [];
    var _licenses_decorators;
    var _licenses_initializers = [];
    var _licenses_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            this.fullName = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.email = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.gender = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
            this.password = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.role = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.profilePicture = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _profilePicture_initializers, void 0));
            this.passwordResetToken = (__runInitializers(this, _profilePicture_extraInitializers), __runInitializers(this, _passwordResetToken_initializers, void 0));
            this.passwordResetExpires = (__runInitializers(this, _passwordResetToken_extraInitializers), __runInitializers(this, _passwordResetExpires_initializers, void 0));
            this.lastLogin = (__runInitializers(this, _passwordResetExpires_extraInitializers), __runInitializers(this, _lastLogin_initializers, void 0));
            this.isActive = (__runInitializers(this, _lastLogin_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.isAdmin = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isAdmin_initializers, void 0));
            this.licenses = (__runInitializers(this, _isAdmin_extraInitializers), __runInitializers(this, _licenses_initializers, void 0));
            __runInitializers(this, _licenses_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userId_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _fullName_decorators = [(0, typeorm_1.Column)()];
        _email_decorators = [(0, typeorm_1.Column)({ unique: true }), (0, class_validator_1.IsEmail)()];
        _gender_decorators = [(0, typeorm_1.Column)()];
        _password_decorators = [(0, typeorm_1.Column)()];
        _role_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: user_role_enum_1.UserRole, default: user_role_enum_1.UserRole.BUYER })];
        _phoneNumber_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _profilePicture_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _passwordResetToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _passwordResetExpires_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _lastLogin_decorators = [(0, typeorm_1.Column)({ nullable: true, type: 'timestamp' })];
        _isActive_decorators = [(0, typeorm_1.Column)({ default: true })];
        _isAdmin_decorators = [(0, typeorm_1.Column)({ default: false })];
        _licenses_decorators = [(0, typeorm_1.OneToMany)(function () { return license_entity_1.License; }, function (license) { return license.user; })];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _profilePicture_decorators, { kind: "field", name: "profilePicture", static: false, private: false, access: { has: function (obj) { return "profilePicture" in obj; }, get: function (obj) { return obj.profilePicture; }, set: function (obj, value) { obj.profilePicture = value; } }, metadata: _metadata }, _profilePicture_initializers, _profilePicture_extraInitializers);
        __esDecorate(null, null, _passwordResetToken_decorators, { kind: "field", name: "passwordResetToken", static: false, private: false, access: { has: function (obj) { return "passwordResetToken" in obj; }, get: function (obj) { return obj.passwordResetToken; }, set: function (obj, value) { obj.passwordResetToken = value; } }, metadata: _metadata }, _passwordResetToken_initializers, _passwordResetToken_extraInitializers);
        __esDecorate(null, null, _passwordResetExpires_decorators, { kind: "field", name: "passwordResetExpires", static: false, private: false, access: { has: function (obj) { return "passwordResetExpires" in obj; }, get: function (obj) { return obj.passwordResetExpires; }, set: function (obj, value) { obj.passwordResetExpires = value; } }, metadata: _metadata }, _passwordResetExpires_initializers, _passwordResetExpires_extraInitializers);
        __esDecorate(null, null, _lastLogin_decorators, { kind: "field", name: "lastLogin", static: false, private: false, access: { has: function (obj) { return "lastLogin" in obj; }, get: function (obj) { return obj.lastLogin; }, set: function (obj, value) { obj.lastLogin = value; } }, metadata: _metadata }, _lastLogin_initializers, _lastLogin_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _isAdmin_decorators, { kind: "field", name: "isAdmin", static: false, private: false, access: { has: function (obj) { return "isAdmin" in obj; }, get: function (obj) { return obj.isAdmin; }, set: function (obj, value) { obj.isAdmin = value; } }, metadata: _metadata }, _isAdmin_initializers, _isAdmin_extraInitializers);
        __esDecorate(null, null, _licenses_decorators, { kind: "field", name: "licenses", static: false, private: false, access: { has: function (obj) { return "licenses" in obj; }, get: function (obj) { return obj.licenses; }, set: function (obj, value) { obj.licenses = value; } }, metadata: _metadata }, _licenses_initializers, _licenses_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
