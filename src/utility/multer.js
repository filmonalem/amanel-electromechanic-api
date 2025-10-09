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
exports.MulterService = void 0;
// src/utility/multer.ts
var common_1 = require("@nestjs/common");
var multer_1 = require("multer");
var path_1 = require("path");
var fs_1 = require("fs");
var MulterService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MulterService = _classThis = /** @class */ (function () {
        function MulterService_1() {
        }
        return MulterService_1;
    }());
    __setFunctionName(_classThis, "MulterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MulterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.multerOptions = {
        storage: (0, multer_1.diskStorage)({
            destination: function (req, file, callback) {
                var isVideo = file.mimetype.startsWith('video/');
                var uploadPath = isVideo ? './uploads/videos' : './uploads/photos';
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                console.log("Multer destination for ".concat(file.originalname, ": ").concat(uploadPath));
                callback(null, uploadPath);
            },
            filename: function (req, file, callback) {
                var fileExt = (0, path_1.extname)(file.originalname).toLowerCase();
                var uniqueSuffix = "".concat(Date.now(), "-").concat(Math.round(Math.random() * 1e9));
                var filename = "".concat(uniqueSuffix).concat(fileExt);
                console.log("Multer filename for ".concat(file.originalname, ": ").concat(filename));
                callback(null, filename);
            },
        }),
        fileFilter: function (req, file, callback) {
            if (!file) {
                console.log('Multer: No file uploaded');
                return callback(new common_1.BadRequestException('No file uploaded'), false);
            }
            var allowedMimetypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'video/mp4',
                'video/mpeg',
                'video/quicktime',
            ];
            if (!allowedMimetypes.includes(file.mimetype)) {
                console.log("Multer rejected file ".concat(file.originalname, ": Invalid mimetype ").concat(file.mimetype));
                return callback(new common_1.BadRequestException("Invalid file type: ".concat(file.mimetype, ". Allowed: images and videos")), false);
            }
            console.log("Multer accepted file ".concat(file.originalname, ": ").concat(file.mimetype));
            callback(null, true);
        },
        limits: {
            fileSize: 20 * 1024 * 1024, // 20MB limit
            files: 10, // Max 10 files
        },
    };
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MulterService = _classThis;
}();
exports.MulterService = MulterService;
