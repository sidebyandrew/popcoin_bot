import {Bot, InlineKeyboard} from "grammy";
import {SocksProxyAgent} from "socks-proxy-agent";


async function abc() {

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
        ["Jump 3D", "callback-jump_3d"],
        ["Fruit Archer", "callback-fruit_archer"],
        ["Shoot Hoops", "callback-shoot_hoops"],
    ];
    const buttonRow = labelDataPairs
        .map(( [label, data] ) => InlineKeyboard.text(label, data));

    const inlineKeyboard = InlineKeyboard.from([buttonRow]);

    // 处理 /start 命令。
    bot.command("start", async (ctx) => {
        await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
    });

    bot.command("games", async (ctx) => {
        await ctx.reply(" Click to Play Our Fantastic Game ", {reply_markup: inlineKeyboard,})
    });



    // Wait for click events with specific callback data.
    // 监听 点击 回调事件
    bot.callbackQuery("callback-jump_3d", async (ctx) => {
        await ctx.replyWithGame("jump_3d");
        });

    bot.callbackQuery("callback-fruit_archer", async (ctx) => {
        await ctx.replyWithGame("fruit_archer_challenge");
    });

    bot.callbackQuery("callback-shoot_hoops", async (ctx) => {
        await ctx.replyWithGame("shoot_hoops");
    });

    // 监听游戏按钮的回调
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

abc().then(r => console.info(r))
