import {Bot, Context, InlineKeyboard} from "grammy";
import {Message} from "grammy/out/types";
import {MyContext} from "./global.types";


export async function register_popcoin_bot(bot: Bot<MyContext>) {
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
        console.info("callback-jump_3d")
        await ctx.replyWithGame("jump_3d");
    });

    bot.callbackQuery("callback-fruit_archer", async (ctx) => {
        await ctx.replyWithGame("fruit_archer_challenge");
    });

    bot.callbackQuery("callback-shoot_hoops", async (ctx) => {
        await ctx.replyWithGame("shoot_hoops");
    });

    // Listen for callbacks to game buttons
    // TODO: load urls from Database
    bot.on("callback_query:game_short_name", async (ctx) => {
        try {
            let gameMsg = ctx.callbackQuery.message;
            let searchParams = '';
            if (gameMsg) {
                searchParams = setGameScore(gameMsg, ctx);
            }
            const gameUrlMap = new Map<string, string>();
            gameUrlMap.set("jump_3d", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/3djump/h5/index.html"+searchParams);
            gameUrlMap.set("fruit_archer_challenge", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/archer/h5/index.html"+searchParams);
            gameUrlMap.set("shoot_hoops", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/basketball/h5/index.html"+searchParams);
            gameUrlMap.set("meta_winner", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/metawin/h5/index.html"+searchParams);
            gameUrlMap.set("jaws", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/jaws/h5/index.html"+searchParams);
            gameUrlMap.set("popstar", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/xmxx/h5/index.html"+searchParams);
            gameUrlMap.set("amaze", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/amaze/h5/index.html"+searchParams);
            gameUrlMap.set("chess", "https://tg-games-1256660609.cos.ap-chengdu.myqcloud.com/chess/h5/index.html"+searchParams);
            let gameShortName = ctx.update.callback_query.game_short_name;
            let gameUrl = gameUrlMap.get(gameShortName);
            await ctx.answerCallbackQuery({url: gameUrl});
        } catch (e){
            console.error(e);
        }
    });
}

function setGameScore(gameMsg: Message, ctx: Context):string {
    try {
        let chatId = gameMsg.chat.id;
        let messageId = gameMsg.message_id;
        let userId = gameMsg.chat.id;
        let fromId = gameMsg.from?.id;
        // let adminId = 5499157826;

        if (chatId && messageId && userId && fromId) {
            // ctx.api.setGameScore(chatId, messageId, userId, new Date().getMilliseconds(),{force:true}).catch((e) => {
            //     console.error(e.toString())
            // });
            //
            // ctx.api.setGameScore(chatId, messageId, fromId, new Date().getMilliseconds() - new Date().getSeconds(),{force:true}).catch((e) => {
            //     console.error(e.toString())
            // });
            //
            // ctx.api.setGameScore(chatId, messageId, adminId,
            //     new Date().getMilliseconds() - new Date().getMinutes() - new Date().getMinutes(),{force:true}).catch((e) => {
            //     console.error(e.toString())
            // });

            return "?p_chat_id=" + chatId + "&p_msg_id=" + messageId + "&p_tg_id=" + userId;
        }
        return '';
    } catch (e){
        console.error(e)
        return '';
    }
}

