FROM python:3.11-slim

RUN pip install --no-cache-dir --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false

WORKDIR /usr/src/app

COPY pyproject.toml poetry.lock ./

RUN poetry install

COPY . .

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

CMD ["python3", "-m", "api.main"]
