FROM python:3

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

CMD [ "gunicorn", "-b", "0.0.0.0:5000", "--config=gunicorn.py", "app:app" ]