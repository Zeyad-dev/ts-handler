import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionResolvable,
    Message
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedMessage extends Message {
    noMentionReply?: Function;
}

interface RunOptions {
    client: ExtendedClient;
    message: ExtendedMessage;
    args: string[];
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
    aliases?: string[],
    name: string,
    description: string,
    directory?: string,
    emoji?: string
}
