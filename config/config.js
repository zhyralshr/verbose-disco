// config/config.js
module.exports = {
    // اللغات المدعومة في البوت والداشبورد
    supportedLanguages: ['en', 'ar', 'it'],
    // اللغة الافتراضية للبوت والسيرفرات الجديدة
    defaultLanguage: 'en', 

    // معرفات السيرفرات المسموح لها بإضافة البوت (اتركها فارغة [] للسماح للجميع)
    // IMPORTANT: إذا كنت تريد تقييد الإضافة، ضع معرفات السيرفرات هنا.
    // مثال: allowedBotInstallGuilds: ['123456789012345678', '987654321098765432'],
    allowedBotInstallGuilds: [], 

    // معرف السيرفر المطلوب للوصول إلى الداشبورد (الذي ذكرته: OneCraft Server)
    // هذا المعرف مستخدم في ملف .env أيضًا لسهولة الوصول إليه.
    requiredDashboardGuildId: process.env.REQUIRED_GUILD_ID,
    requiredDashboardGuildInvite: process.env.REQUIRED_GUILD_INVITE_URL,

    // إعدادات الكابشا (لأمر Daily وتحويل العملات)
    captchaSettings: {
        width: 200,
        height: 80,
        length: 6, // طول الكابشا (عدد الأحرف/الأرقام)
        characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // الأحرف الممكنة
        fontFamily: 'Arial', // الخط المستخدم في الكابشا
        fontSize: 48,
        textColor: '#000000', // لون النص
        backgroundColor: '#FFFFFF', // لون الخلفية (يمكنك تغييرها)
        noise: true, // إضافة تشويش
        lineNoise: true, // إضافة خطوط مشوشة
    },

    // إعدادات XP
    xpSettings: {
        textCooldown: 60000, // 60 ثانية بين كل اكتساب XP من الرسائل (بالمللي ثانية)
        voiceCooldown: 60000, // 60 ثانية بين كل اكتساب XP من القنوات الصوتية (بالمللي ثانية)
        minTextXp: 15,
        maxTextXp: 25,
        minVoiceXp: 5,
        maxVoiceXp: 10,
    },

    // قيم عملة Craft لأمر Daily
    dailyCraftMin: 1500,
    dailyCraftMax: 2500,

    // قيود عمر الحساب لأمر Daily والتحويلات
    minAccountAgeForDaily: 3 * 30 * 24 * 60 * 60 * 1000, // 3 أشهر بالمللي ثانية
    minAccountAgeForTransfer: 1 * 30 * 24 * 60 * 60 * 1000, // شهر واحد بالمللي ثانية
};
