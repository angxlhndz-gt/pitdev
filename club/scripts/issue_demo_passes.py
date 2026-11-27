"""Issue the two signed, replaceable PitDev Club demo passes.

Run after build_wallet_art.py. The signer allows two free calls per day.
Existing published passes are left untouched unless both new passes succeed.
"""

import argparse
import base64
from io import BytesIO
import json
from pathlib import Path
import sys
import tempfile
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import zipfile


ROOT = Path(__file__).resolve().parents[2]
PASS_1 = ROOT / "public" / "pitdev-club-demo.pkpass"
PASS_2 = ROOT / "public" / "pitdev-club-demo-2.pkpass"
PREVIOUS_PASS = ROOT / "club" / "wallet-archive" / "pitdev-club-demo.pkpass"
ART = ROOT / "club" / "wallet-art"
MARK = ROOT / "club" / "public" / "stamp-mark.png"
ISSUER = "https://walletmcppass.com/api/passes"
CLUB = "https://pitdevgt.vercel.app/club"


def encode(path):
    return base64.b64encode(path.read_bytes()).decode("ascii")


def existing_identity():
    with zipfile.ZipFile(PREVIOUS_PASS) as archive:
        data = json.loads(archive.read("pass.json"))
    return data["passTypeIdentifier"], data["serialNumber"]


def request_pass(stamps, email, serial, expected_issuer):
    payload = {
        "style": "storeCard",
        "organization_name": "PitDev",
        "description": f"PitDev Club: demostración de {stamps} de 6 sellos",
        "contact_email": email,
        "x402_ready": False,
        "serial_number": serial,
        "logo_text": "PitDev Club",
        "generate_logo": False,
        "icon_png_b64": encode(MARK),
        "logo_png_b64": encode(MARK),
        "background_color": "#030604",
        "foreground_color": "#F5FFF9",
        "label_color": "#39FF88",
        "secondary_fields": [{"key": "stamps", "label": "Sellos de muestra", "value": f"{stamps} de 6"}],
        "footer_fields": [{"key": "stamps", "label": "Sellos de muestra", "value": f"{stamps} de 6"}],
        "back_fields": [
            {"key": "note", "label": "Importante", "value": "Pase de demostración. No está asociado a una persona ni al saldo de la página web."},
            {"key": "club", "label": "Ver Club", "value": CLUB},
        ],
        "barcode_message": CLUB,
        "barcode_format": "QR",
        "barcode_alt_text": "pitdevgt.vercel.app/club",
        "poster": True,
        "strip_png_b64": encode(ART / f"strip-{stamps}.png"),
        "background_png_b64": encode(ART / f"poster-{stamps}.png"),
    }
    body = json.dumps(payload).encode("utf-8")
    req = Request(ISSUER, body, {"Content-Type": "application/json"}, method="POST")
    try:
        with urlopen(req, timeout=45) as response:
            result = json.load(response)
    except HTTPError as error:
        if error.code == 402:
            raise RuntimeError("Se agotaron las dos emisiones gratuitas de hoy. El cupo vuelve a las 00:00 UTC.") from error
        message = error.read().decode("utf-8", "replace")[:200]
        raise RuntimeError(f"El firmante respondió HTTP {error.code}: {message}") from error
    except URLError as error:
        raise RuntimeError(f"No se pudo conectar al firmante: {error.reason}") from error
    if result.get("pass_type_identifier") != expected_issuer or result.get("serial_number") != serial:
        raise RuntimeError("El firmante devolvió una identidad distinta; no se puede reemplazar la tarjeta anterior.")
    with urlopen(result["download_url"], timeout=45) as response:
        content = response.read()
    with zipfile.ZipFile(BytesIO(content)) as archive:
        issued = json.loads(archive.read("pass.json"))
        required = {"signature", "manifest.json", "pass.json", "strip.png", "background.png"}
        if not required.issubset(archive.namelist()) or "posterGeneric" not in issued:
            raise RuntimeError("El pase recibido no contiene el arte y la firma esperados.")
        if issued["storeCard"]["secondaryFields"][0]["value"] != f"{stamps} de 6":
            raise RuntimeError("El pase recibido tiene un conteo de sellos incorrecto.")
    return content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--contact-email", required=True)
    args = parser.parse_args()
    expected_issuer, serial = existing_identity()
    with tempfile.TemporaryDirectory() as directory:
        staged = []
        for count in (1, 2):
            content = request_pass(count, args.contact_email, serial, expected_issuer)
            path = Path(directory) / f"{count}.pkpass"
            path.write_bytes(content)
            staged.append(path)
        for source, destination in zip(staged, (PASS_1, PASS_2)):
            destination.write_bytes(source.read_bytes())
    print("Dos pases firmados y comprobados; ambos conservan la identidad para reemplazo.")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as error:
        print(error, file=sys.stderr)
        raise SystemExit(1) from error
