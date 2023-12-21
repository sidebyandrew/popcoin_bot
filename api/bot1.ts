import {Bot, InlineKeyboard, Keyboard} from "grammy";
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


// ===================================
    const msg = await bot.api.sendMessage(5499157826, "*Hi\\!* _Welcome_ to [My Bot](https://grammy.dev)\\.",
        {parse_mode: "MarkdownV2"},);
    console.log("msg id = " + msg.message_id);

    const me = await bot.api.getMe();
    console.log("========getMe()======== ");
    console.log(me);
// ===================================

    const labelDataPairs = [
        ["« 1", "first"],
        ["‹ 3", "prev"],
        ["· 4 ·", "stay"],
        ["5 ›", "next"],
        ["31 »", "last"],
    ];
    const buttonRow = labelDataPairs
        .map(([label, data]) => InlineKeyboard.text(label, data));
    const inlineKeyboard = InlineKeyboard.from([buttonRow]);


    const keyboard = new Keyboard()
        .text("Yes, they certainly are").row()
        .text("I'm not quite sure").row()
        .text("No. 😈")
        .resized();

    // 你现在可以在你的 bot 对象 `bot` 上注册监听器。
    // 当用户向你的 bot 发送消息时，grammY 将调用已注册的监听器。
    // bot.on(":text", (ctx) => ctx.reply("Text!"));
    bot.command("start", (ctx) => ctx.reply("Command!",{  reply_markup: keyboard,}));


    // 处理 /start 命令。
    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

    bot.command("wallet", async (ctx) => {
        await ctx.reply("回复一下你的钱包地址", {
            // 让 Telegram 客户端自动向用户显示回复界面。
            reply_markup: {force_reply: true},
        });
    });


    // 处理其他的消息。
    bot.on("message", async (ctx) => {
            if (ctx.message.text === '导航') {
                await ctx.reply(" 导航？？ " + ctx.msg.text + ctx.senderChat?.id + "from: " + ctx.from, {  reply_markup: inlineKeyboard,})
            }

            // 从ctx上获取聊天窗口id，然后发消息
            const chatId = ctx.msg.chat.id;
            const text = "I got your message! chatId = " + chatId;
            await bot.api.sendMessage(chatId, text);
            await bot.api.sendMessage(5499157826, "<b>Hello! 你的Bot收到一个消息</b>", {

                parse_mode: "HTML",
                // reply_markup: inlineKeyboard,
            });


        }
    );

    // 等待具有特定回调数据的点击事件。
    bot.callbackQuery("first", async (ctx) => {
        await ctx.answerCallbackQuery({
            text: "你点了个1",
        });
    });

    // https://grammy.dev/guide/deployment-types
    await bot.start();
}

abc().then(r => console.info(r))