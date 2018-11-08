module.exports = () => {
    Terbium.command('ping', (ctx) => {
        ctx.reply("PONG")
    })
}