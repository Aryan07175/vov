import re

with open("C:/Users/Lenovo/Desktop/vov/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Remove any previous enhancement injection to avoid duplicates
html = html.replace('<link rel="stylesheet" href="vov-enhance.css">', '')
html = html.replace('<script defer src="vov-enhance.js"></script>', '')
html = html.replace('\n<link rel="stylesheet" href="vov-enhance.css">', '')
html = html.replace('\n<script defer src="vov-enhance.js"></script>', '')

# Inject LAST in <head> so our CSS loads after all VOV CDN CSS (higher specificity)
inject = '\n<link rel="stylesheet" href="vov-enhance.css">\n<script defer src="vov-enhance.js"></script>'

# Find last </head> and inject before it
last_head = html.rfind('</head>')
if last_head != -1:
    html = html[:last_head] + inject + '\n' + html[last_head:]
else:
    # Fallback: inject before <body>
    html = html.replace('<body', inject + '\n<body', 1)

with open("C:/Users/Lenovo/Desktop/vov/index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done. Enhancement files injected into VOV index.html")
