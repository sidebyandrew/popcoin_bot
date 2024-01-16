import { Bot } from "grammy";
import { MyContext } from "./global.types";
import {register_config} from "./middleware.ctx.config";
import {register_popcoin_bot} from "./popcoin.bot";

export function main_entry_point(bot: Bot<MyContext>) {
  register_config(bot);
  register_popcoin_bot(bot).catch((reason) => {
    console.error(reason);})
}
