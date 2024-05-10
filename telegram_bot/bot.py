import os, base64

from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("Открыть календарь", web_app={"url": "https://booking-mini-app-e6444.ondigitalocean.app"})]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Выберите даты и бронируйте', reply_markup=reply_markup)

def main():
    # Создаем экземпляр Application с вашим токеном
    application = Application.builder().token(telegram_token).build()

    # Добавляем обработчик для команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    application.run_polling()


# получаем токен бота
encoded_telegram_token = os.getenv('ENCODED_TELEGRAM_TOKEN')
telegram_token = base64.b64decode(encoded_telegram_token).decode()


if __name__ == '__main__':
    main()