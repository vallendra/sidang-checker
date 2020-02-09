'use strict';

const dotenv = require('dotenv');
const { LineBot } = require("bottender");
const { createServer } = require("@bottender/express");

dotenv.config();

const bot = new LineBot({
  // ubah ke access token dan channelSecret dibawah, sesuai dengan yang ada di line console
  accessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
});
bot.onEvent(async context => {
  // 1. Pengecekan apakah bot menerima chat berupa text
  if (context.event.isText) {
    // 2. Ambil value text yang dikirim oleh user, simpan di variabel receivedMessage
    const receivedMessage = context.event.text;
    // 3. Pengecekan apakah user mengirim 2 pasang string dengan spasi
    // Contoh valid text: 1 3 | 4 2 | 10 23
    if (receivedMessage.split(" ").length === 2) {
      // 4. Menyimpan hasil split. Kalau messagenya: "1 3" splittedText akan berisi ["1", "3"]
      const splittedText = receivedMessage.split(" ");
      // 5. Ambil 2 angka yang masih dalam bentuk string, sekaligus ubah menjadi Number (integer)
      const first = Number(splittedText[0]);
      const second = Number(splittedText[1]);
      // 6. Lakukan proses penjumlahan
      const sumResult = first + second;
      // 7. Balas pesan user dengan hasil penjumlahan 2 angka yang dikirim
      await context.replyText(sumResult);
    } else {
      // 8. Beri respon kepada user jika format pesan yang diberikan tidak sesuai
      await context.replyText(
        "Maaf pesanmu tidak sesuai format, contoh yang benar: 1 3 atau 10 12"
      );
    }
  }
});
const server = createServer(bot);
server.listen(process.env.PORT || 5000, () => {
  console.log("server is running on 5000 port...");
});