const dotenv = require("dotenv");
dotenv.config();
const { Bot } = require("grammy");

// Create a bot instance with your bot token
const bot = new Bot(process.env.TOKEN);

// Handle the bot start command
bot.command("start", (ctx) => {
  console.log("STARTING");
  ctx.reply("Hello! I am your group bot.");
});

// Listen for messages
bot.on("message", async (ctx) => {
  if (
    ctx.update.message.new_chat_member ||
    ctx.update.message.new_chat_members
  ) {
    const newMembers = ctx.update.message?.new_chat_member
      ? [ctx.update.message?.new_chat_member]
      : ctx.update.message.new_chat_members;

    for (const newMember of newMembers) {
      await ctx.api.deleteMessage(ctx.chat.id, ctx.update.message.message_id);
    }
  }
});

// Start the bot
bot.start().catch((error) => {
  console.error("Error while starting the bot:", error);
});
