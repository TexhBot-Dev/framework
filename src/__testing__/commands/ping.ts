import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../typings";

export default class PingCommand implements Command {
  public data = new SlashCommandBuilder().setName("ping").setDescription("Pong!");

  public chatInputRun(interaction: CommandInteraction) {
    return interaction.reply({ content: "Pong!" });
  }
};
