import re

with open("C:/Users/Lenovo/Desktop/vov/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Clean up old vov-enhance files
html = html.replace('<link rel="stylesheet" href="vov-enhance.css">', '')
html = html.replace('<script defer src="vov-enhance.js"></script>', '')
html = html.replace('\n<link rel="stylesheet" href="vov-enhance.css">', '')
html = html.replace('\n<script defer src="vov-enhance.js"></script>', '')

# 2. Clean up previous attempt if any
html = html.replace('<link rel="stylesheet" href="vnexpress-theme.css">', '')
html = html.replace('<script defer src="vnexpress-structure.js"></script>', '')

# 3. Inject new VnExpress transformation files
inject = '\n<link rel="stylesheet" href="vnexpress-theme.css">\n<script defer src="vnexpress-structure.js"></script>'

# Inject right before </head> to ensure CSS overrides
last_head = html.rfind('</head>')
if last_head != -1:
    html = html[:last_head] + inject + '\n' + html[last_head:]
else:
    html = html.replace('<body', inject + '\n<body', 1)

with open("C:/Users/Lenovo/Desktop/vov/index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Old enhancements removed. VNExpress transformation files injected into VOV.")
