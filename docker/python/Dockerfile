FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /HimiaSite
WORKDIR /HimiaSite
ADD . /HimiaSite/
COPY requirements.txt /HimiaSite/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install mysqlclient
COPY . /HimiaSite/