import {Bot, InlineKeyboard, webhookCallback} from "grammy";
import {SocksProxyAgent} from "socks-proxy-agent";


console.log(" process.env.NODE_ENV=" + process.env.NODE_ENV)
const socksAgent = new SocksProxyAgent("socks://127.0.0.1:7890");

let config = {};
if (process.env.NODE_ENV === 'dev') {
    config = {
        client: {
            baseFetchConfig: {
                agent: socksAgent,
                compress: true,
            },
        },
    }
}

//The open game bot
const bot = new Bot("6811958485:AAHg_96h1PMJIrvbwOM9j4Pcx8uaEVK48B4", config);

const labelDataPairs = [
    ["Jump3D", "jump3d"],
    ["Fruit Archer", "fruit_archer"],
    ["Shoot Hoops", "shoot_hoops"],
];
const buttonRow = labelDataPairs
    .map(([label, data]) => InlineKeyboard.text(label, data));

const inlineKeyboard = InlineKeyboard.from([buttonRow]);

// 处理 /start 命令。
bot.command("start", async (ctx) => {
    await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
});

bot.command("games", async (ctx) => {
    await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
});

bot.command("wallet", async (ctx) => {
    const labelDataPairs = [
        ["Bind", "bind"],
        ["Deposit", "Deposit"],
        ["Withdraw", "Withdraw"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));
    const walletKeyboard = InlineKeyboard.from([buttonRow]);
    await ctx.reply(" Wallet [ Under Construction ] ", {reply_markup: walletKeyboard,})
});

bot.command("menu", async (ctx) => {
    await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
});

bot.command("settings", async (ctx) => {
    await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
});

bot.command("languages", async (ctx) => {
    const labelDataPairs = [
        ["English", "english"],
        ["中文（简体）", "sc"],
        ["中文（繁體）", "cc"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));
    const walletKeyboard = InlineKeyboard.from([buttonRow]);
    await ctx.reply(" Language Support [ Under Construction ] ", {reply_markup: walletKeyboard,})
});

// Wait for click events with specific callback data.
// 监听 点击 回调事件
bot.callbackQuery("jump3d", async (ctx) => {
    await ctx.replyWithGame("jump3d");

});

bot.callbackQuery("fruit_archer", async (ctx) => {
    await ctx.replyWithGame("fruit_archer");
});

bot.callbackQuery("shoot_hoops", async (ctx) => {
    await ctx.replyWithGame("shoot_hoops");
});

// 监听游戏按钮的回调
bot.on("callback_query:game_short_name", async (ctx) => {
    let gameUrl = "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/3djump/h5/index.html";
    if (ctx.update.callback_query.game_short_name == 'jump3d') {
        gameUrl = "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/3djump/h5/index.html";
    } else if (ctx.update.callback_query.game_short_name == 'fruit_archer') {
        gameUrl = "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/archer/h5/index.html";
    } else if (ctx.update.callback_query.game_short_name == 'shoot_hoops') {
        gameUrl = "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/basketball/h5/index.html";
    }

    await ctx.answerCallbackQuery({url: gameUrl});


});


// 处理消息
bot.on("message", async (ctx) => {
        if (ctx.message.text === '游戏') {
            await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
        }

        if (ctx.message.text === '游戏1') {
            await ctx.replyWithGame("jumpjump");
        }

        if (ctx.message.text === '游戏2') {
            await ctx.replyWithGame("endless_basketball");
        }

        if (ctx.message.text === '游戏3') {
            await ctx.replyWithGame("fruit_arrow");
        }
    }
);


// https://grammy.dev/guide/deployment-types


export default webhookCallback(bot, "http");