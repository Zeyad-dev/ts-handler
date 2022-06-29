import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js'
export default new Command({
    name: "ping",
    description: "Replies with the bot's ping",
    aliases: ['latency'],
    run: async ({ message, client, args }) => {
        await message.noMentionReply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Websocket ping:** ${client.ws.ping}`)
            .setColor('ORANGE')
            .setFooter({text: `Requested by: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
        ], components: [
            new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Add me to your server!')
                .setStyle('LINK')
                .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
            )
        ]})
    }
});
