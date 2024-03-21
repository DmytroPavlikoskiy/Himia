from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor
from django.conf import settings

bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply("Привіт! Я бот вашого магазину.")

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)