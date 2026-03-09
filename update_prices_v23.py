import re
from pathlib import Path

p = Path('/mnt/data/work_v23/data.js')
text = p.read_text(encoding='utf-8')

# Fix stray extra brace after gemini-business object
# Remove a standalone line that is exactly two spaces then '},' between gemini and juegos
text = re.sub(r"\n\s*\},\s*\n\s*\},\s*\n\s*// =========================\n\s*// JUEGOS",
              "\n  },\n\n  // =========================\n  // JUEGOS",
              text)

prices_k = {
    'resident-evil-requiem': 350000,
    'detroit-become-human': 45000,
    'outlast-2': 35000,
    'mortal-kombat-11-ultimate': 40000,
    'batman-arkham-origins': 25000,
    'injustice-2-legendary-edition': 35000,
    'assetto-corsa': 45000,
    'human-fall-flat': 25000,
    'buckshot-roulette': 15000,
    'silent-hill-homecoming': 35000,
    'tomb-raider-definitive-survival-trilogy': 75000,
    'wrc-9': 30000,
    'the-evil-within': 45000,
    'martha-is-dead': 30000,
}

# helper to format price line

def replace_price_block(t: str, pid: str, price: int) -> str:
    # Replace first occurrence of price: ... within the object that has id: pid
    # We'll locate object slice from id: pid to the next '},' at same indent by a conservative regex.
    pattern = re.compile(rf"(\n\s*\{{\n(?:.|\n)*?\n\s*id:\s*\"{re.escape(pid)}\"(?:.|\n)*?\n)(\s*price:\s*)(\d+)(\s*,)", re.MULTILINE)
    m = pattern.search(t)
    if not m:
        return t
    start = m.start(2)
    end = m.end(3)
    t = t[:start] + m.group(2) + str(price) + t[end:]

    # Update details.pagos text if it has 'Precio a cargar' within same object (optional)
    # We'll only update inside the object block (up to next '\n  },' that ends object)
    obj_start = t.rfind('\n  {', 0, m.start(1) + 5)
    if obj_start == -1:
        obj_start = m.start(1)
    obj_end = t.find('\n  },', m.start(1))
    if obj_end == -1:
        obj_end = t.find('\n},', m.start(1))
    if obj_end == -1:
        obj_end = m.start(1) + 2000
    obj = t[obj_start:obj_end]

    pagos_re = re.compile(r'(\n\s*pagos:\s*\")([^\"]*)(\")')
    def pagos_sub(mm):
        cur = mm.group(2)
        if 'Precio a cargar' in cur or 'Precio a definir' in cur or 'confirm' in cur.lower():
            return mm.group(1) + f"Precio: {price} PYG (cierre por WhatsApp)." + mm.group(3)
        return mm.group(0)
    obj2 = pagos_re.sub(pagos_sub, obj, count=1)
    if obj2 != obj:
        t = t[:obj_start] + obj2 + t[obj_end:]
    return t

for pid, pr in prices_k.items():
    text = replace_price_block(text, pid, pr)

# bump build
text = re.sub(r'(SUBZI\.BUILD\s*=\s*\")(v\d+)(\"\s*;)', r'\1v23\3', text)

p.write_text(text, encoding='utf-8')
print('updated')
