"use strict";
// import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
// import { ContactService } from './contact.service';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
// import { RolesGuard } from 'src/authentication/roles.guard';
// import { ApiBearerAuth } from '@nestjs/swagger';
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Controller('contact')
// export class ContactController {
//   constructor(private readonly contactService: ContactService) {}
//   @Post()
//   async createContact(@Body() createContactDto: CreateContactDto) {
//     return await this.contactService.create(createContactDto);
//   }
//   @Get()
//   async getAllContacts() {
//     return await this.contactService.getAllContacts();
//   }
//   @Get(':contactId')
//   async getContactById(@Param('contactId') contactId: string) {
//     return await this.contactService.getContactById(contactId);
//   }
//   @Put(':contactId')
//   async updateContact(
//     @Param('contactId') contactId: string,
//     @Body() updateContactDto: CreateContactDto,
//   ) {
//     return await this.contactService.updateContact(contactId, updateContactDto);
//   }
//   @Delete(':contactId')
//   async deleteContact(@Param('contactId') contactId: string) {
//     return await this.contactService.deleteContact(contactId);
//   }
// }
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../authentication/jwt-auth.guard");
var roles_guard_1 = require("../authentication/roles.guard");
var swagger_1 = require("@nestjs/swagger");
var ContactController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('contacts'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, common_1.Controller)('contact')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createContact_decorators;
    var _getAllContacts_decorators;
    var _getContactById_decorators;
    var _updateContact_decorators;
    var _deleteContact_decorators;
    var ContactController = _classThis = /** @class */ (function () {
        function ContactController_1(contactService) {
            this.contactService = (__runInitializers(this, _instanceExtraInitializers), contactService);
        }
        ContactController_1.prototype.createContact = function (createContactDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactService.create(createContactDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ContactController_1.prototype.getAllContacts = function () {
            return __awaiter(this, arguments, void 0, function (page, limit) {
                if (page === void 0) { page = '1'; }
                if (limit === void 0) { limit = '10'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactService.getAllContacts()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ContactController_1.prototype.getContactById = function (contactId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactService.getContactById(contactId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ContactController_1.prototype.updateContact = function (contactId, updateContactDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactService.updateContact(contactId, updateContactDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ContactController_1.prototype.deleteContact = function (contactId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.contactService.deleteContact(contactId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ContactController_1;
    }());
    __setFunctionName(_classThis, "ContactController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createContact_decorators = [(0, common_1.Post)()];
        _getAllContacts_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })];
        _getContactById_decorators = [(0, common_1.Get)(':contactId')];
        _updateContact_decorators = [(0, common_1.Put)('update/:contactId')];
        _deleteContact_decorators = [(0, common_1.Delete)('delete/:contactId')];
        __esDecorate(_classThis, null, _createContact_decorators, { kind: "method", name: "createContact", static: false, private: false, access: { has: function (obj) { return "createContact" in obj; }, get: function (obj) { return obj.createContact; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllContacts_decorators, { kind: "method", name: "getAllContacts", static: false, private: false, access: { has: function (obj) { return "getAllContacts" in obj; }, get: function (obj) { return obj.getAllContacts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getContactById_decorators, { kind: "method", name: "getContactById", static: false, private: false, access: { has: function (obj) { return "getContactById" in obj; }, get: function (obj) { return obj.getContactById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateContact_decorators, { kind: "method", name: "updateContact", static: false, private: false, access: { has: function (obj) { return "updateContact" in obj; }, get: function (obj) { return obj.updateContact; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteContact_decorators, { kind: "method", name: "deleteContact", static: false, private: false, access: { has: function (obj) { return "deleteContact" in obj; }, get: function (obj) { return obj.deleteContact; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactController = _classThis;
}();
exports.ContactController = ContactController;
