import {Bot, Context, InlineKeyboard} from "grammy";
import {SocksProxyAgent} from "socks-proxy-agent";
import {InlineQueryResultBuilder} from "grammy";
import {Message} from "grammy/out/types";


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
    const bot = new Bot("6848653110:AAFuVZe_OBc0zAgoBfpa8mT7SrW0yrC1okE", config);//OPEN VIP

    const labelDataPairs = [
        ["测试游戏", "callback-opengame_shortname"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));

    const inlineKeyboard = InlineKeyboard.from([buttonRow]);

    inlineKeyboard.url("🦩🦩🦩🦩🦩🦩🦩🦩🦩🦩","https://t.me/tonx_fans")
    // 处理 /start 命令。
    bot.command("start", async (ctx) => {
        await ctx.reply(
            " Click to open [Popcoin Games](https://t.me/ThePopcoinBot/app)",
            { parse_mode: "MarkdownV2" },
        );
    });

    bot.command("help", async (ctx) => {
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
            // 让 Telegram 客户端自动向用户显示回复界面。
            reply_markup: {force_reply: true},
        });
    });

    // Wait for click events with specific callback data.
    // 监听 点击 回调事件
    bot.callbackQuery("callback-opengame_shortname", async (ctx) => {

        const keyboard = new InlineKeyboard().game("Start my_game");
        let gameMsg = await ctx.replyWithGame("opengame_shortname", {reply_markup: keyboard});

        console.info(JSON.stringify(gameMsg))

        function setGameScore(gameMsg: Message.GameMessage, ctx: Context) {
            let chatId = gameMsg.chat.id;
            let messageId = gameMsg.message_id;
            let userId = gameMsg.chat.id;
            let fromId = gameMsg.from?.id;

            if (chatId && messageId && userId && fromId) {
                const currentDate = new Date();
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                const seconds = currentDate.getSeconds();
                const score =
                    hours * 10000 + minutes * 100 + seconds;

                ctx.api.setGameScore(chatId, messageId, userId, score,{force:true}).then(
                    () => {
                        console.info("游戏分数更新为"+score)
                    }
                ).catch((e) => {
                    console.error(e)
                });

                let score2 = score - currentDate.getSeconds();
                ctx.api.setGameScore(chatId, messageId, fromId, score2,{force:true}).then(() => {
                    console.info("游戏分数更新为"+score2)
                })

                    .catch((e) => {
                    console.error(e)
                });
            }
        }

        setGameScore(gameMsg, ctx);
    });

    // 监听游戏按钮的回调
    bot.on("callback_query:game_short_name", async (ctx) => {
        const gameUrlMap = new Map<string, string>();

        gameUrlMap.set("opengame_shortname", "https://my-game-app-bice.vercel.app/?tg_id=" + ctx.update.callback_query.from.id);
        let gameShortName = ctx.update.callback_query.game_short_name;
        let gameUrl = gameUrlMap.get(gameShortName);
        // console.info(JSON.stringify(ctx))
        await ctx.answerCallbackQuery({url: gameUrl});
    });


//     // Listen for specific strings or regular expressions.
//     bot.inlineQuery(/best bot (framework|library)/, async (ctx) => {
//         const match = ctx.match; // regex match object
//         const query = ctx.inlineQuery.query; // query string
//     });
//
// // Listen for any inline query.
//     bot.on("inline_query", async (ctx) => {
//         const query = ctx.inlineQuery.query; // query string
// //
// //         // Create a single inline query result.
// //         var result2 = InlineQueryResultBuilder
// //             .article("id:grammy-website", "grammY", {
// //                 reply_markup: new InlineKeyboard()
// //                     .url("grammY website", "https://grammy.dev/"),
// //             })
// //             .text(
// //                 `<b>grammY</b> is the best way to create your own Telegram bots.
// // They even have a pretty website! 👇`,
// //                 { parse_mode: "HTML" },
// //             );
//
//
// // Build a photo result.
//         var result  =   InlineQueryResultBuilder.photo("id-0", "https://grammy.dev/images/grammY.png") .text(
//             `<b>grammY2222</b> is the best way to create your own Telegram bots.
// They even have a pretty website! 👇`,
//             { parse_mode: "HTML" },
//         );
//
// // Build a result that displays a photo but sends a text message.
//         let inlineQueryResultPhoto = InlineQueryResultBuilder.photo("id-1", "https://grammy.dev/images/grammY.png")
//             .text("This text will be sent instead of the photo");
//
// // Build a text result.
//         InlineQueryResultBuilder.article("id-2", "Inline Queries")
//             .text("Great inline query docs: grammy.dev/plugins/inline-query");
//
// // Pass further options to the result.
//         const keyboard = new InlineKeyboard()
//             .text("Aw yis", "call me back");
//         InlineQueryResultBuilder.article("id-3", "Hit me", { reply_markup: keyboard })
//             .text("Push my buttons");
//
// // Pass further options to the message content.
//         InlineQueryResultBuilder.article("id-4", "Inline Queries")
//             .text("**Outstanding** docs: grammy.dev", { parse_mode: "MarkdownV2" });
//
//         // Answer the inline query.
//         await ctx.answerInlineQuery(
//             [inlineQueryResultPhoto], // answer with result list
//             { cache_time: 1 }, // 30 days in seconds
//         );
//     });


    await bot.start();
}

abc().then(r => console.info(r))
