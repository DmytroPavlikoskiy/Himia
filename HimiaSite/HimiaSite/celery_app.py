import os
import time
from celery import Celery

from celery.schedules import schedule
from celery.schedules import crontab
from django.conf import settings


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HimiaSite.settings")
app = Celery("HimiaSite")
app.config_from_object("django.conf:settings", namespace="CELERY")
# app.conf.broker_url = settings.CELERY_BROKER_URL
app.autodiscover_tasks()


app.conf.beat_schedule = {
    "get_order_status": {
        "task": "HS.tasks.get_order_status",
        "schedule": schedule(run_every=10),  # Every 10 seconds
    },
}

app.conf.beat_schedule = {
    "check_time_and_remove_reserved": {
        "task": "HS.tasks.check_time_and_remove_reserved",
        "schedule": schedule(run_every=10),
        # "schedule": crontab(minute="*/5"),  # Every 5 minutes
    },
}
