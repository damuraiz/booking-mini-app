import os

from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, LabeledPrice
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes, MessageHandler, filters

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("Открыть календарь", web_app={"url": web_app_url})]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Выберите даты и бронируйте', reply_markup=reply_markup)

def main():

    if not telegram_token:
        print("Telegram token not found")
        return

    # Создаем экземпляр Application с вашим токеном
    application = Application.builder().token(telegram_token).build()

    # Добавляем обработчик для команды /start
    application.add_handler(CommandHandler("start", start))

    # Добавим обработчик для текстовых сообщений, которые могут содержать команду на оплату
    # application.add_handler(MessageHandler(filters.TEXT & filters.regex('Оплатить'), send_invoice))

    application.add_handler(CommandHandler("pay", send_invoice))

    # Запускаем бота
    application.run_polling()

async def send_invoice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_message.chat_id
    title = "Оплата бронирования"
    description = "Описание вашего продукта или услуги"
    payload = "Unique-Payload-123"  # Уникальный внутренний идентификатор сделки
    currency = "RUB"
    prices = [LabeledPrice("Оплата", 50000)]  # Цена в копейках, т.е. 500.00 RUB

    await context.bot.send_invoice(
        chat_id,
        title,
        description,
        payload,
        yoomoney_token,
        'start_parameter',
        currency,
        prices
    )



telegram_token = os.getenv('TELEGRAM_TOKEN')
yoomoney_token = os.getenv('YOOMONEY_PROVIDER_TOKEN')
web_app_url = os.getenv('WEB_APP_URL')


if __name__ == '__main__':
    main()