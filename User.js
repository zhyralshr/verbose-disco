// database/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    // بيانات المستخدم الخاصة بالديسكورد
    discordTag: {
        type: String,
        default: 'Unknown User'
    },
    avatar: {
        type: String, // رابط صورة الأفاتار
        default: null
    },
    discriminator: { // رقم التمييز القديم في ديسكورد (مثال: #1234)
        type: String,
        default: '0000'
    },
    guilds: [{
        guildId: {
            type: String,
            required: true
        },
        xp: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 0
        },
        lastMessageTimestamp: {
            type: Date,
            default: null // لضمان فترة cooldown لـ XP الرسائل
        },
        lastVoiceTimestamp: {
            type: Date,
            default: null // لضمان فترة cooldown لـ XP الصوتي
        },
        voiceTime: { // وقت قضاء المستخدم في القنوات الصوتية بالثواني
            type: Number,
            default: 0
        }
    }],
    craftBalance: {
        type: Number,
        default: 0
    },
    lastDailyClaim: {
        type: Date,
        default: null // لتحديد متى تم أخذ المكافأة اليومية آخر مرة
    },
    discordCreatedAt: { // تاريخ إنشاء حساب الديسكورد للمستخدم
        type: Date,
        required: true
    },
    isAdmin: { // لتحديد ما إذا كان المستخدم أدمن عام للداشبورد (يتم تعيينه من قبل المالك)
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);
