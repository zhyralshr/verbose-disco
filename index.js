// index.js
require('dotenv').config(); // تحميل متغيرات البيئة من .env
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const connectDB = require('./database/connect'); // استيراد دالة الاتصال بقاعدة البيانات
const language = require('./src/utils/language'); // استيراد نظام الترجمة
const config = require('./config/config'); // استيراد ملف الإعدادات

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // للسيرفرات، القنوات، الأدوار
        GatewayIntentBits.GuildMembers,     // للأعضاء (لأحداث الترحيب والمغادرة، جلب تاريخ إنشاء الحساب)
        GatewayIntentBits.GuildMessages,    // للرسائل في القنوات النصية
        GatewayIntentBits.MessageContent,   // لقراءة محتوى الرسائل (مطلوب لـ XP الرسائل و Custom Commands)
        GatewayIntentBits.GuildVoiceStates, // لحالات القنوات الصوتية (لـ XP الصوتي)
        // يمكنك إضافة المزيد من الـ intents حسب الحاجة
    ],
});

// إرفاق مجموعات (Collections) بالأوامر والأحداث إلى كائن العميل (client)
client.commands = new Collection();
client.events = new Collection();
client.language = language; // إضافة نظام اللغة للوصول إليه بسهولة من أي مكان

// تحميل الأوامر (Slash Commands)
const foldersPath = path.join(__dirname, 'src', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// تحميل الأحداث
const eventsPath = path.join(__dirname, 'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// الاتصال بقاعدة البيانات عند بدء البوت
client.once('ready', async () => {
    await connectDB();
    console.log(client.language.getPhrase('BOT_STARTED', config.defaultLanguage));
    console.log(`Logged in as ${client.user.tag}!`);
});

// تسجيل دخول البوت إلى ديسكورد
client.login(process.env.DISCORD_TOKEN);
