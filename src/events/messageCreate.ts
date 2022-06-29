import { Message, ReplyMessageOptions } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedMessage } from "../typings/Command";

export default new Event("messageCreate", async (message : ExtendedMessage) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith('<')
    )
        return;

    const [cmd, ...args] = message.content
        .slice('<'.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    if (!command) return;
    message.noMentionReply = async function (options : ReplyMessageOptions) : Promise<Message> {
        options.allowedMentions = {
            repliedUser: false
        }
        return await message.reply(options)
    }
        await command.run({
            args: args as string[],
            client,
            message: message
        });
});
