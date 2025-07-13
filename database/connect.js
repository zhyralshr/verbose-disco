// database/connect.js
const mongoose = require('mongoose');
require('dotenv').config(); // لتحميل متغيرات البيئة من ملف .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true, // هذه الخيارات لم تعد ضرورية في Mongoose v6+
            // useUnifiedTopology: true,
            // useCreateIndex: true, // هذا الخيار لم يعد ضروري
            // useFindAndModify: false // هذا الخيار لم يعد ضروري
        });
        console.log('✅ Connected to MongoDB successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // إنهاء العملية إذا فشل الاتصال بقاعدة البيانات
    }
};

module.exports = connectDB;
