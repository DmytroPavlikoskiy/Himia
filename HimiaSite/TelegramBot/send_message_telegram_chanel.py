from aiogram import Bot, types
from aiogram.utils import markdown as md
from django.conf import settings


async def send_message_to_channel(message):
    chat_id = settings.TELEGRAM_ORDERS_CHANEL
    token = settings.TELEGRAM_BOT_TOKEN

    bot = Bot(token=token)

    formatted_message = md.text(md.bold("Нове Замовлення:)"), f"[Натисніть тут]({message})")

    await bot.send_message(chat_id=chat_id, text=formatted_message, parse_mode=types.ParseMode.MARKDOWN)