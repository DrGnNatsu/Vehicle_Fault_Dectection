FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh && chmod +x script/auto_migrate.sh

EXPOSE 8000

CMD ["./entrypoint.sh"]
