"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.__esModule = true;
var grammy_1 = require("grammy");
var socks_proxy_agent_1 = require("socks-proxy-agent");
function abc() {
    return __awaiter(this, void 0, void 0, function () {
        var socksAgent, config, bot, labelDataPairs, buttonRow, inlineKeyboard;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(" process.env.NODE_ENV=" + process.env.NODE_ENV);
                    socksAgent = new socks_proxy_agent_1.SocksProxyAgent("socks://127.0.0.1:7890");
                    config = {};
                    if (process.env.NODE_ENV === 'dev') {
                        config = {
                            client: {
                                baseFetchConfig: {
                                    agent: socksAgent,
                                    compress: true
                                }
                            }
                        };
                    }
                    bot = new grammy_1.Bot("6811958485:AAHg_96h1PMJIrvbwOM9j4Pcx8uaEVK48B4", config);
                    labelDataPairs = [
                        ["Jump 3D", "callback-jump_3d"],
                        ["Fruit Archer", "callback-fruit_archer"],
                        ["Shoot Hoops", "callback-shoot_hoops"],
                    ];
                    buttonRow = labelDataPairs
                        .map(function (_a) {
                        var label = _a[0], data = _a[1];
                        return grammy_1.InlineKeyboard.text(label, data);
                    });
                    inlineKeyboard = grammy_1.InlineKeyboard.from([buttonRow]);
                    // 处理 /start 命令。
                    bot.command("start", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.reply(" Click to Play Our Fantastic Game ", { reply_markup: inlineKeyboard })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    bot.command("games", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.reply(" Click to Play Our Fantastic Game ", { reply_markup: inlineKeyboard })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // Wait for click events with specific callback data.
                    // 监听 点击 回调事件
                    bot.callbackQuery("callback-jump_3d", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.replyWithGame("jump_3d")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    bot.callbackQuery("callback-fruit_archer", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.replyWithGame("fruit_archer_challenge")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    bot.callbackQuery("callback-shoot_hoops", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.replyWithGame("shoot_hoops")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // 监听游戏按钮的回调
                    bot.on("callback_query:game_short_name", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var gameUrlMap, gameShortName, gameUrl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    gameUrlMap = new Map();
                                    gameUrlMap.set("jump_3d", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/3djump/h5/index.html");
                                    gameUrlMap.set("fruit_archer_challenge", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/archer/h5/index.html");
                                    gameUrlMap.set("shoot_hoops", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/basketball/h5/index.html");
                                    gameUrlMap.set("meta_winner", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/ton_pvp_web2/index.html");
                                    gameUrlMap.set("jaws", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/shks/web/index.html");
                                    gameUrlMap.set("popstar", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/xmxx/web/index.html");
                                    gameUrlMap.set("amaze", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/amze/web/index.html");
                                    gameUrlMap.set("chess", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/chess/web/index.html");
                                    gameShortName = ctx.update.callback_query.game_short_name;
                                    gameUrl = gameUrlMap.get(gameShortName);
                                    return [4 /*yield*/, ctx.answerCallbackQuery({ url: gameUrl })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, bot.start()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
abc().then(function (r) { return console.info(r); });
