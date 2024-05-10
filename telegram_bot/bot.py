import os

from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("Открыть календарь", web_app={"url": web_app_url})]]
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
telegram_token = os.getenv('TELEGRAM_TOKEN')

web_app_url = os.getenv('WEB_APP_URL')


if __name__ == '__main__':
    main()