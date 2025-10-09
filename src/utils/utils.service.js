"use strict";
// import { BadRequestException, Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
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
exports.UtilsService = void 0;
// @Injectable()
// export class UtilsService {
//   private readonly saltRounds = 10;
//   constructor() {}
//   generateUniqueCode(name: any): any {
//     const nameChar = name.name.charAt(0).toUpperCase();
//     const brandChar = name.brand.charAt(0).toUpperCase();
//     const categoryChar = name.category.charAt(0).toUpperCase();
//     const genericChar = name.generic.charAt(0).toUpperCase();
//     const strengthChar = name.strength.charAt(0).toUpperCase();
//     return `Med-${nameChar}${brandChar}${categoryChar}${genericChar}${strengthChar}`;
//   }
//   generateReferenceNo(prefix: string): string {
//     const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     const randomNum = Math.floor(Math.random() * 1000);
//     return `${prefix}${date}-${randomNum}`;
//   }
//   async hashPassword(password: string): Promise<string> {
//     const salt = await bcrypt.genSalt(this.saltRounds);
//     return bcrypt.hash(password, salt);
//   }
//   async comparePassword(
//     plainPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean> {
//     return bcrypt.compare(plainPassword, hashedPassword);
//   }
//  private calculateTotals(
//   products: { price: number; quantity: number }[],
//   paidAmount: number,
// ): { totalPrice: number; remainPrice: number; isPaid: string } {
//   if (!products || !Array.isArray(products) || products.length === 0) {
//     throw new BadRequestException('Products array is empty or invalid');
//   }
//   const totalPrice = products.reduce((sum, product, index) => {
//     const price = Number(product.price);
//     const quantity = Number(product.quantity);
//     if (isNaN(price) || price <= 0) {
//       throw new BadRequestException(`Invalid price for product at index ${index}`);
//     }
//     if (isNaN(quantity) || quantity <= 0) {
//       throw new BadRequestException(`Invalid quantity for product at index ${index}`);
//     }
//     return sum + price * quantity;
//   }, 0);
//   if (isNaN(totalPrice) || totalPrice <= 0) {
//     throw new BadRequestException('Calculated total price is invalid');
//   }
//   const remainPrice = totalPrice - paidAmount; // Fixed: totalPrice - paidAmount
//   const isPaid = remainPrice <= 0 ? 'cash' : 'credit';
//   return { totalPrice, remainPrice, isPaid };
// }
//   calculateTotalPrice(
//     price: number,
//     quantity: number,
//     taxRate = 0,
//     discount = 0,
//   ): number {
//     const subtotal = price * quantity;
//     const tax = subtotal * taxRate;
//     const discountAmount = subtotal * discount;
//     const total = subtotal + tax - discountAmount;
//     return parseFloat(total.toFixed(2));
//   }
//   async calculatePrice(data: any) {
//     let total = 0;
//     let remainPrice = 0;
//     data.map((payment: any) => {
//       total += payment.totalPrice;
//       remainPrice += payment.remainPrice;
//     });
//     return {
//       totalPrice: total,
//     };
//   }
// }
// src/utils/utils.service.ts
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var UtilsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UtilsService = _classThis = /** @class */ (function () {
        function UtilsService_1() {
            this.saltRounds = 10;
        }
        UtilsService_1.prototype.generateUniqueCode = function (name) {
            var nameChar = name.name.charAt(0).toUpperCase();
            var brandChar = name.brand.charAt(0).toUpperCase();
            var categoryChar = name.category.charAt(0).toUpperCase();
            var genericChar = name.generic.charAt(0).toUpperCase();
            var strengthChar = name.strength.charAt(0).toUpperCase();
            return "Med-".concat(nameChar).concat(brandChar).concat(categoryChar).concat(genericChar).concat(strengthChar);
        };
        UtilsService_1.prototype.generateReferenceNo = function (prefix) {
            var date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            var randomNum = Math.floor(Math.random() * 1000);
            return "".concat(prefix).concat(date, "-").concat(randomNum);
        };
        UtilsService_1.prototype.hashPassword = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                var salt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bcrypt.genSalt(this.saltRounds)];
                        case 1:
                            salt = _a.sent();
                            return [2 /*return*/, bcrypt.hash(password, salt)];
                    }
                });
            });
        };
        UtilsService_1.prototype.comparePassword = function (plainPassword, hashedPassword) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, bcrypt.compare(plainPassword, hashedPassword)];
                });
            });
        };
        UtilsService_1.prototype.calculatePrice = function (products) {
            return __awaiter(this, void 0, void 0, function () {
                var totalPrice;
                return __generator(this, function (_a) {
                    if (!products || !Array.isArray(products) || products.length === 0) {
                        throw new common_1.BadRequestException('Products array is empty or invalid');
                    }
                    console.log('Products for price calculation:', JSON.stringify(products, null, 2));
                    totalPrice = products.reduce(function (sum, product, index) {
                        if (!product) {
                            throw new common_1.BadRequestException("Product at index ".concat(index, " is null or undefined"));
                        }
                        // Explicitly convert to number and check type
                        var price = parseFloat(product.price);
                        var quantity = parseInt(product.quantity, 10);
                        if (isNaN(price) || price <= 0) {
                            throw new common_1.BadRequestException("Invalid price for product at index ".concat(index, ": ").concat(product.name || 'unknown', " (price: ").concat(product.price, ", type: ").concat(typeof product.price, ")"));
                        }
                        if (isNaN(quantity) || quantity <= 0) {
                            throw new common_1.BadRequestException("Invalid quantity for product at index ".concat(index, ": ").concat(product.name || 'unknown', " (quantity: ").concat(product.quantity, ", type: ").concat(typeof product.quantity, ")"));
                        }
                        var subtotal = price * quantity;
                        console.log("Product: ".concat(product.name || 'unknown', ", Price: ").concat(price, ", Quantity: ").concat(quantity, ", Subtotal: ").concat(subtotal));
                        return sum + subtotal;
                    }, 0);
                    console.log('Calculated totalPrice:', totalPrice);
                    if (isNaN(totalPrice) || totalPrice <= 0) {
                        throw new common_1.BadRequestException("Calculated total price is invalid: ".concat(totalPrice));
                    }
                    return [2 /*return*/, { totalPrice: totalPrice }];
                });
            });
        };
        UtilsService_1.prototype.calculateTotals = function (products, paidAmount) {
            if (!products || !Array.isArray(products) || products.length === 0) {
                throw new common_1.BadRequestException('Products array is empty or invalid');
            }
            var totalPrice = products.reduce(function (sum, product, index) {
                var price = Number(product.price);
                var quantity = Number(product.quantity);
                if (isNaN(price) || price <= 0) {
                    throw new common_1.BadRequestException("Invalid price for product at index ".concat(index));
                }
                if (isNaN(quantity) || quantity <= 0) {
                    throw new common_1.BadRequestException("Invalid quantity for product at index ".concat(index));
                }
                return sum + price * quantity;
            }, 0);
            if (isNaN(totalPrice) || totalPrice <= 0) {
                throw new common_1.BadRequestException('Calculated total price is invalid');
            }
            var remainPrice = totalPrice - paidAmount;
            var isPaid = remainPrice <= 0 ? 'cash' : 'credit';
            return { totalPrice: totalPrice, remainPrice: remainPrice, isPaid: isPaid };
        };
        UtilsService_1.prototype.calculateTotalPrice = function (price, quantity, taxRate, discount) {
            if (taxRate === void 0) { taxRate = 0; }
            if (discount === void 0) { discount = 0; }
            var subtotal = price * quantity;
            var tax = subtotal * taxRate;
            var discountAmount = subtotal * discount;
            var total = subtotal + tax - discountAmount;
            return parseFloat(total.toFixed(2));
        };
        return UtilsService_1;
    }());
    __setFunctionName(_classThis, "UtilsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UtilsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UtilsService = _classThis;
}();
exports.UtilsService = UtilsService;
