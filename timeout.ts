// import { Command } from "../../structures/Command";
// import { MessageEmbed, MessageActionRow, MessageButton, GuildMember, Message } from 'discord.js'
// import { time } from "console";
// export default new Command({
//   name: "timeout",
//   description: "Timeouts the mentioned user for the specified amount of time",
//   aliases: ['mute'],
//   run: async ({ message, client, args }) => {
//     if (args[0] == 'remove') {
//       if (!args[1]) return message.noMentionReply({
//         embeds: [
//           new MessageEmbed()
//             .setDescription('Please mention the person you want to remove their timeout or provide their id.\n\nCorrect format: [] required, <> not required\n```\n<timeout remove [user id/mention] <reason>```')
//             .setFooter({ text: `Requested by ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
//             .setColor('RED')
//         ]
//       })
//       const reason = args[2] ? args[2] : 'No reason specified'
//       const member = await message.guild.members.fetch(message.mentions.members.first().id ? message.mentions.members.first().id : args[1]).catch(() => {
//         message.noMentionReply({
//           embeds: [
//             new MessageEmbed()
//               .setDescription('I could not find that user! Please try again.')
//               .setColor('RED')
//               .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//           ]
//         })
//       }) as GuildMember
//       member.timeout(null, reason).then(() => {
//         message.noMentionReply({
//           embeds: [
//             new MessageEmbed()
//               .setDescription(`${member.user.tag} timeout is now removed!`)
//               .setColor('ORANGE')
//               .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//           ]
//         })
//       })
//       await member.user.send({
//         embeds: [
//           new MessageEmbed()
//             .setTitle('Your timeout has been removed!')
//             .setDescription(`Your timeout in the server **${message.guild.name}** has been removed by the user **${message.author.tag}!**\nReason: **${reason}**`)
//             .setColor('ORANGE')
//         ]
//       }).catch(() => { })
//     } else {
//       if (!args[0]) return message.noMentionReply({
//         embeds: [
//           new MessageEmbed()
//             .setDescription('Please mention the person you want to timeout or provide their id.\n\nCorrect format: [] required, <> not required\n```SEPARATE BY COMMAS LIKE EXAMPLE!\n<timeout [user id/mention], [duration], <reason>```')
//             .setFooter({ text: `Requested by ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
//             .setColor('RED')
//         ]
//       })
//       if (!args[1]) return message.noMentionReply({
//         embeds: [
//           new MessageEmbed()
//             .setDescription('Please specify the amount of the ban.\n\nCorrect time format:\n```1mo (month), 1w (weeks), 1d (days), 1h (hours), 1s (seconds)```')
//             .setFooter({ text: `Requested by ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
//             .setColor('RED')
//         ]
//       })
//       console.log(args.join('').split(',')[1])
//       const time = await formatTime(args.join('').split(',')[1], message) as number
//       console.log(time)
//       if (!time) return message.noMentionReply({
//         embeds: [
//           new MessageEmbed()
//             .setDescription('Please make sure the time is a valid number, the maximum amount of time for a timeout can be only 1 month (28 days limit by discord) and the minimum amount of time for a timeout can only be 1 second!')
//             .setColor('RED')
//             .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//         ]
//       })
//       const reason = args[2] ? args[2] : 'No reason specified'
//       const member = await message.guild.members.fetch(message.mentions.members.first().id ? message.mentions.members.first().id : args[0]).catch(() => {
//         message.noMentionReply({
//           embeds: [
//             new MessageEmbed()
//               .setDescription('I could not find that user! Please try again.')
//               .setColor('RED')
//               .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//           ]
//         })
//       }) as GuildMember
//       member.timeout(time, reason).then(() => {
//         message.noMentionReply({
//           embeds: [
//             new MessageEmbed()
//               .setDescription(`${member.user.tag} is now timed out till <t:${time}>!`)
//               .setColor('ORANGE')
//               .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//           ]
//         })
//       })
//       await member.user.send({
//         embeds: [
//           new MessageEmbed()
//             .setTitle('You have been timed out!')
//             .setDescription(`You have been timed out in the server **${message.guild.name}** by the user **${message.author.tag} till <t:${time}>!**\nReason: **${reason}**`)
//             .setColor('ORANGE')
//         ]
//       }).catch(() => { })
//     }
//     async function formatTime(t: string, m: Message) : Promise<number | boolean> {
//       let finalTime: number
//       if (!t) {
//         return message.noMentionReply({
//         embeds: [
//           new MessageEmbed()
//             .setDescription('Please make sure you have seperated the parameters by commas!\n\nCorrect format: [] required, <> not required\n```SEPARATE BY COMMAS LIKE EXAMPLE!\n<timeout [user id/mention], [duration (seperated by spaces)], <reason>```')
//             .setColor('RED')
//             .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
//         ]
//       }), true
//     }
//       t.split(' ').forEach((tt) => {
//         console.log(tt)
//         switch (tt as any) {
//           case tt.replace(/[0-9]/g, '') === 'mo':
//             tt.replace('mo', '')
//             if (parseInt(tt) > 1) return undefined
//             finalTime = finalTime + (28 * 86400000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//           case tt.replace(/[0-9]/g, '') === 'w':
//             tt.replace('w', '')
//             finalTime = finalTime + (parseInt(tt) * 604800000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//           case tt.replace(/[0-9]/g, '') === 'd':
//             tt.replace('d', '')
//             finalTime = finalTime + (parseInt(tt) * 86400000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//           case tt.replace(/[0-9]/g, '') === 'h':
//             tt.replace('h', '')
//             finalTime = finalTime + (parseInt(tt) * 3600000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//           case tt.replace(/[0-9]/g, '') === 'm':
//             tt.replace('m', '')
//             finalTime = finalTime + (parseInt(tt) * 60000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//           case tt.replace(/[0-9]/g, '') === 's':
//             tt.replace('s', '')
//             finalTime = finalTime + (parseInt(tt) * 1000)
//             console.log(tt)
//             console.log(finalTime)
//             break
//         }
//       })
//       if (finalTime > (28 * 86400000)) return undefined
//       if (finalTime < 1000) return undefined
//       return finalTime
//     }
//   }
// });
