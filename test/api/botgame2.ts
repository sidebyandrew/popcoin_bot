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
    const bot = new Bot("", config);
    bot.api.sendGame(5499157826, 'jump3d').then(()=>{
        console.info("ok")
    });

}

abc().then(r => console.info(r))