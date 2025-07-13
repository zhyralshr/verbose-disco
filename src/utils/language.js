// src/utils/language.js
const fs = require('fs');
const path = require('path');
const config = require('../../config/config'); // مسار ملف config.js

class Language {
    constructor() {
        this.phrases = {};
        this.loadLanguages();
    }

    loadLanguages() {
        const localesPath = path.join(__dirname, '..', '..', 'locales');
        const supported = config.supportedLanguages;

        for (const lang of supported) {
            const filePath = path.join(localesPath, `${lang}.json`);
            if (fs.existsSync(filePath)) {
                try {
                    this.phrases[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                } catch (error) {
                    console.error(`Error loading language file ${lang}.json:`, error.message);
                    this.phrases[lang] = {}; // تعيين كائن فارغ لتجنب الأعطال
                }
            } else {
                console.warn(`Language file ${lang}.json not found at ${filePath}.`);
                this.phrases[lang] = {};
            }
        }

        // التأكد من أن اللغة الافتراضية موجودة
        if (!this.phrases[config.defaultLanguage]) {
            console.error(`Default language "${config.defaultLanguage}" not loaded! Using empty phrases.`);
            this.phrases[config.defaultLanguage] = {};
        }
    }

    /**
     * يحصل على عبارة مترجمة مع إمكانية استبدال المتغيرات (placeholders).
     * @param {string} key مفتاح العبارة في ملف اللغة (مثال: 'WELCOME_MESSAGE').
     * @param {string} lang اللغة المطلوبة (مثال: 'ar', 'en').
     * @param {object} placeholders كائن بالمتغيرات للاستبدال (مثال: { user: 'John', guild: 'MyServer' }).
     * @returns {string} العبارة المترجمة.
     */
    getPhrase(key, lang = config.defaultLanguage, placeholders = {}) {
        let selectedLang = lang;
        if (!this.phrases[selectedLang]) {
            selectedLang = config.defaultLanguage; // الرجوع إلى اللغة الافتراضية إذا كانت اللغة المطلوبة غير موجودة
        }

        let phrase = this.phrases[selectedLang][key] || this.phrases[config.defaultLanguage][key] || `[${key}] Missing translation for ${selectedLang}`;

        // استبدال المتغيرات
        for (const placeholder in placeholders) {
            phrase = phrase.replace(new RegExp(`{${placeholder}}`, 'g'), placeholders[placeholder]);
        }

        return phrase;
    }
}

module.exports = new Language(); // تصدير كائن واحد من اللغة
