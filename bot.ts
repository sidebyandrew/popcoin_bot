import {Bot, Context, InlineKeyboard} from "grammy";
import {SocksProxyAgent} from "socks-proxy-agent";
import {Message} from "grammy/out/types";


async function abc() {

    console.log(" is dev env? process.env.NODE_ENV= " + process.env.NODE_ENV)
    let config = {};
    if (process.env.NODE_ENV === 'dev') {
        config = {
            client: {
                baseFetchConfig: {
                    agent: new SocksProxyAgent("socks://127.0.0.1:7890"),
                    compress: true,
                },
            },
        }
    }

    //The open game bot
    const bot = new Bot("6811958485:AAHg_96h1PMJIrvbwOM9j4Pcx8uaEVK48B4", config);//Popcoin
    // const bot = new Bot("6861683528:AAE9lxffvAsuUVTuf5qyOEWmH8STQgaQeE4", config);//OPEN game

    const labelDataPairs = [
        ["Jump 3D", "callback-jump_3d"],
        ["Fruit Archer", "callback-fruit_archer"],
        ["Shoot Hoops", "callback-shoot_hoops"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));

    const inlineKeyboard = InlineKeyboard.from([buttonRow]);

    bot.command("start", async (ctx) => {
        await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
    });

    bot.command("games", async (ctx) => {
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

    bot.command("wallet", async (ctx) => {
        await ctx.reply("Your wallet address?", {
            reply_markup: {force_reply: true},
        });
    });

    // Wait for click events with specific callback data.
    bot.callbackQuery("callback-jump_3d", async (ctx) => {
        let msg = await ctx.replyWithGame("jump_3d");
        setGameScore(msg, ctx);
    });

    bot.callbackQuery("callback-fruit_archer", async (ctx) => {
        let msg = await ctx.replyWithGame("fruit_archer_challenge");
        setGameScore(msg, ctx)
    });

    bot.callbackQuery("callback-shoot_hoops", async (ctx) => {
        let msg = await ctx.replyWithGame("shoot_hoops");
        setGameScore(msg, ctx)
    });

    // Listen for callbacks to game buttons
    // TODO: load urls from Database
    bot.on("callback_query:game_short_name", async (ctx) => {
        const gameUrlMap = new Map<string, string>();
        gameUrlMap.set("jump_3d", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/3djump/h5/index.html");
        gameUrlMap.set("fruit_archer_challenge", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/archer/h5/index.html");
        gameUrlMap.set("shoot_hoops", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/basketball/h5/index.html");
        gameUrlMap.set("meta_winner", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/ton_pvp_web2/index.html");
        gameUrlMap.set("jaws", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/shks/web/index.html");
        gameUrlMap.set("popstar", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/xmxx/web/index.html");
        gameUrlMap.set("amaze", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/amze/web/index.html");
        gameUrlMap.set("chess", "https://h5game-1256660609.cos.ap-guangzhou.myqcloud.com/vs/chess/web/index.html");
        let gameShortName = ctx.update.callback_query.game_short_name;
        let gameUrl = gameUrlMap.get(gameShortName);
        await ctx.answerCallbackQuery({url: gameUrl});
    });

    await bot.start();
}

function setGameScore(gameMsg: Message.GameMessage, ctx: Context) {
    let chatId = gameMsg.chat.id;
    let messageId = gameMsg.message_id;
    let userId = gameMsg.chat.id;
    let fromId = gameMsg.from?.id;
    let adminId = 5499157826;

    if (chatId && messageId && userId && fromId) {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const score =
            hours * 10000 + minutes * 100 + seconds;

        ctx.api.setGameScore(chatId, messageId, userId, score).catch((e) => {
            console.error(e)
        });

        ctx.api.setGameScore(chatId, messageId, fromId, score - currentDate.getSeconds()).catch((e) => {
            console.error(e)
        });

        ctx.api.setGameScore(chatId, messageId, adminId,
            score - currentDate.getMinutes() - currentDate.getMinutes()).catch((e) => {
            console.error(e)
        });
    }
}

abc().then(r => console.info(r))
