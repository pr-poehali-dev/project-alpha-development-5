import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку на email и в Telegram."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body", "{}"))
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    description = body.get("description", "").strip()

    if not name or not email or not description:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Заполните все поля"},
        }

    message = f"🎙 Новая заявка на озвучку\n\nИмя: {name}\nEmail: {email}\n\nОписание проекта:\n{description}"

    # Отправка в Telegram
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if bot_token and chat_id:
        tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        tg_data = json.dumps({"chat_id": chat_id, "text": message}).encode()
        req = urllib.request.Request(tg_url, data=tg_data, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req)

    # Отправка на email
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if smtp_password:
        msg = MIMEMultipart()
        msg["From"] = "maslov.voice@gmail.com"
        msg["To"] = "maslov.voice@gmail.com"
        msg["Subject"] = f"Новая заявка от {name}"
        msg.attach(MIMEText(message, "plain", "utf-8"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login("maslov.voice@gmail.com", smtp_password)
            server.send_message(msg)

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"success": True},
    }