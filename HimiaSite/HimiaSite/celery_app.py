import os
import time
from celery import Celery
from celery.schedules import crontab
from django.conf import settings


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HimiaSite.settings")
app = Celery("HimiaSite")
app.config_from_object("django.conf:settings", namespace="CELERY")
# app.conf.broker_url = settings.CELERY_BROKER_URL
app.autodiscover_tasks()


app.conf.beat_schedule = {
    "check_and_send_first_sms": {
        "task": "HS.tasks.test_task",
        "schedule": crontab(minute='*/1')
    },
}