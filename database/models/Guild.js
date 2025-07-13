// database/models/Guild.js
const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    guildName: {
        type: String,
        required: true
    },
    icon: { // أيقونة السيرفر
        type: String,
        default: null
    },
    ownerId: { // معرف مالك السيرفر في ديسكورد
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'en' // اللغة الافتراضية هي الإنجليزية
    },
    // إعدادات نظام الترحيب والمغادرة
    welcome: {
        enabled: { type: Boolean, default: false },
        channelId: { type: String, default: null },
        message: { type: String, default: 'Hello {user}! Welcome to {guild}!' },
        image: { type: String, default: null }, // رابط صورة الترحيب
        // يمكنك إضافة خيارات أخرى مثل رسالة خاصة، رول تلقائي، إلخ.
    },
    goodbye: {
        enabled: { type: Boolean, default: false },
        channelId: { type: String, default: null },
        message: { type: String, default: 'Goodbye {user}! Hope to see you again!' },
        image: { type: String, default: null }, // رابط صورة المغادرة
    },
    // إعدادات نظام السجلات
    logs: {
        enabled: { type: Boolean, default: false },
        channelId: { type: String, default: null },
        events: { // قائمة بالأحداث التي سيتم تسجيلها
            memberJoin: { type: Boolean, default: true },
            memberLeave: { type: Boolean, default: true },
            messageDelete: { type: Boolean, default: true },
            messageEdit: { type: Boolean, default: true },
            // ... المزيد من الأحداث
        }
    },
    // إعدادات نظام المستويات
    leveling: {
        enabled: { type: Boolean, default: true },
        xpPerMessage: { type: Number, default: 15 },
        xpPerVoiceMinute: { type: Number, default: 5 },
        cooldownText: { type: Number, default: 60000 }, // 60 ثانية (ms)
        cooldownVoice: { type: Number, default: 60000 }, // 60 ثانية (ms)
        levelUpMessage: { type: String, default: '{user} reached level {level}!' },
        levelUpChannel: { type: String, default: null }, // قناة معينة لإرسال رسائل رفع المستوى
        customLevelImages: [{ // صور مستويات مخصصة للسيرفر
            level: Number,
            imageUrl: String
        }],
        // يمكن إضافة إعدادات رولات المستويات هنا لاحقًا
    },
    // إعدادات الأوامر (الصلاحيات والقنوات المسموحة)
    commandSettings: [{
        commandName: { type: String, required: true }, // اسم الأمر (مثال: 'rank', 'kick', 'daily')
        enabled: { type: Boolean, default: true }, // هل الأمر مفعل؟
        allowedRoles: [{ type: String }], // معرفات الرتب المسموح بها (فارغ يعني للجميع)
        allowedChannels: [{ type: String }], // معرفات القنوات المسموح بها (فارغ يعني للجميع)
        aliases: [{ type: String }] // اختصارات/أسماء بديلة للأمر
    }],
    // إعدادات التذاكر
    tickets: {
        enabled: { type: Boolean, default: false },
        categoryChannelId: { type: String, default: null }, // معرف فئة قنوات التذاكر
        logChannelId: { type: String, default: null }, // قناة سجلات التذاكر
        // ... المزيد من إعدادات التذاكر
    },
    // إعدادات الأوامر المخصصة
    customCommands: [{
        name: { type: String, required: true },
        response: { type: String, required: true },
        type: { type: String, enum: ['MESSAGE_REPLY', 'EMBED_MESSAGE'], default: 'MESSAGE_REPLY' }, // نوع الاستجابة
        allowedRoles: [{ type: String }],
        allowedChannels: [{ type: String }],
    }],
    // إعدادات Giveaway
    giveaway: {
        logChannelId: { type: String, default: null },
        // ... المزيد من إعدادات Giveaway
    }
    // يمكن إضافة المزيد من الإعدادات حسب الحاجة
});

module.exports = mongoose.model('Guild', GuildSchema);
