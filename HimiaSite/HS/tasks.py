from __future__ import absolute_import, unicode_literals
import time
import datetime
import os
from HimiaSite.celery_app import app
from celery import shared_task

# from celery.task.control import revoke, inspect


@app.task
def test_task():
    print("hello")