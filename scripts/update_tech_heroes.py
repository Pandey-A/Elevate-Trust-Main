import re
from pathlib import Path

files = [
    "AiNativeSdlc.tsx",
    "DataTrends.tsx",
    "CloudComputing.tsx",
    "Cybersecurity.tsx",
    "ItBizops.tsx",
    "Devops.tsx",
    "OnPremise.tsx",
    "DigitalWorkspace.tsx",
]
base = Path(r"d:\EtRevamp\elevate-revamp\src\pages")

pat = re.compile(
    r"<section\n"
    r'\s+className="relative w-full flex items-center justify-center overflow-hidden bg-\[#113d77\]"\n'
    r'\s+style=\{\{ minHeight: "clamp\(280px, 32vw, 492px\)" \}\}\n'
    r'\s+aria-label="([^"]+)"\n'
    r"\s*>\n"
    r"\s*<img\n"
    r"\s+src=\{worldMapBackground\}\n"
    r'\s+alt=""\n'
    r"\s+aria-hidden\n"
    r'\s+className="absolute left-1/2 top-\[58%\] -translate-x-1/2 -translate-y-1/2 w-\[min\(94%,1600px\)\] pointer-events-none opacity-55"\n'
    r"\s*/>\n"
    r'\s*<div className="relative z-10 flex flex-col items-center text-center max-w-\[min\(820px,92%\)\] px-5 pt-\[clamp\(72px,8vw,120px\)\] pb-\[clamp\(48px,6vw,80px\)\]">',
)

repl = (
    '<section className="service-page-hero" aria-label="\\1">\n'
    "        <img\n"
    "          src={worldMapBackground}\n"
    '          alt=""\n'
    "          aria-hidden\n"
    '          className="service-page-hero__map"\n'
    "        />\n"
    '        <div className="service-page-hero__content max-w-[min(820px,92%)]">'
)

for name in files:
    path = base / name
    text = path.read_text(encoding="utf-8")
    new, n = pat.subn(repl, text, count=1)
    if not n:
        print("NO MATCH", name)
        continue
    new = new.replace(
        "mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif]",
        "mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif]",
        1,
    )
    new = new.replace(
        "mt-[clamp(24px,3vw,40px)] inline-flex items-center gap-1.5 py-3 pl-[26px]",
        "mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 py-3 pl-[26px]",
        1,
    )
    path.write_text(new, encoding="utf-8")
    print("updated", name)
