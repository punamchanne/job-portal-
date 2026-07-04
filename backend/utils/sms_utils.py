import os
import requests
from dotenv import load_dotenv

load_dotenv()

def send_sms_otp(phone_number: str, otp: str) -> bool:
    """
    Sends a 6-digit verification code to the candidate's/employer's phone number using Fast2SMS API.
    """
    api_key = os.getenv("FAST2SMS_API_KEY")
    if not api_key:
        print("Fast2SMS API Key is missing. Skipping SMS OTP.")
        return False

    url = "https://www.fast2sms.com/dev/bulkV2"
    payload = {
        "variables_values": otp,
        "route": "otp",
        "numbers": phone_number.strip()
    }
    headers = {
        "authorization": api_key,
        "Content-Type": "application/json"
    }

    try:
        # Fast2SMS expects numbers to be 10 digits without country code for domestic routing
        # Clean the phone number to be 10 digits
        clean_number = "".join(filter(str.isdigit, phone_number))
        if len(clean_number) > 10:
            # Strip prefix like 91 or +91
            clean_number = clean_number[-10:]

        payload["numbers"] = clean_number

        response = requests.post(url, json=payload, headers=headers, timeout=10)
        data = response.json()
        print(f"Fast2SMS API Response: {data}")
        return data.get("return") is True
    except Exception as e:
        print(f"Error sending Fast2SMS SMS: {str(e)}")
        return False
