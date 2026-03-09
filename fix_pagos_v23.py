import re
from pathlib import Path

p = Path('/mnt/data/work_v23/data.js')
text = p.read_text('utf-8')

prices = {
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

for pid, price in prices.items():
    # Find the object by id and replace pagos line inside it (first occurrence after id)
    # We'll locate segment from id occurrence to next '\n  },' (object end at indent 2 spaces)
    idx = text.find(f'id: "{pid}"')
    if idx == -1:
        continue
    end = text.find('\n  },', idx)
    if end == -1:
        continue
    seg = text[idx:end]
    seg2 = re.sub(r'pagos:\s*"[^"]*Precio a cargar[^"]*"',
                  f'pagos: "Precio: {price} PYG (cierre por WhatsApp)."',
                  seg,
                  count=1)
    if seg2 != seg:
        text = text[:idx] + seg2 + text[end:]

p.write_text(text, 'utf-8')
print('ok')
