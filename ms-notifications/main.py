import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from azure.communication.email import EmailClient
from azure.core.exceptions import AzureError

load_dotenv()
app = Flask(__name__)

@app.route('/send_email', methods=['POST'])
def send_email():
    correo = request.get_json()
    if not correo or 'address' not in correo or 'subject' not in correo or 'plainText' not in correo:
        return jsonify({"error": "Datos de correo incompletos"}), 400
    
    try:
        connection_string = os.environ.get("CONNECTION_STRING")
        if not connection_string:
            return jsonify({"error": "Cadena de conexión no configurada"}), 500
        
        client = EmailClient.from_connection_string(connection_string)

        message = {
            "senderAddress": os.environ.get("SENDER_ADDRESS"),
            "recipients": {
                "to": [{"address": correo["address"]}],
            },
            "content": {
                "subject": correo["subject"],
                "plainText": correo["plainText"],
            }
        }

        poller = client.begin_send(message)
        result = poller.result()

        return jsonify({"message": "Correo electrónico enviado correctamente"}), 200

    except AzureError as azure_error:
        return jsonify({"error": str(azure_error)}), 500
    except Exception as ex:
        return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == "__main__":
    app.run(debug=True)