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
    bot.api.sendGame(5499157826, 'jump3d').then(()=>{
        console.info("ok")
    });

}

abc().then(r => console.info(r))