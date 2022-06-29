import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    Intents
} from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    guildQueue = []
    constructor() {
        super({
            intents: 33351,
            presence: {
                status: 'dnd'
            }
        });
    }

    start() {
        this.registerModules();
        this.login('bot\'s token here!')
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerModules() {
        // Commands
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            try {
                command.directory = filePath.split('..')[1].split('/')[2]
            } catch {
                command.directory = filePath.split('/commands/')[1].split('/')[0]
            }
            this.commands.set(command.name, command);
        });
        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });
    }
}
