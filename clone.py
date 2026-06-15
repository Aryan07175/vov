import re

with open("C:/Users/Lenovo/Desktop/vov/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Remove the spacing CSS block
html = re.sub(r'<style[^>]*id=["\']vov-spacing["\'][^>]*>.*?</style>\s*', '', html, flags=re.DOTALL)

# Remove the spacing JS block
html = re.sub(r'<script[^>]*id=["\']vov-spacing-js["\'][^>]*>.*?</script>\s*', '', html, flags=re.DOTALL)

# Remove the inline-style JS block that was injected into body
html = re.sub(r'<script>\s*/\* VOV 120px SIDE SPACING.*?</script>\s*', '', html, flags=re.DOTALL)

# Remove the wrapper div (opening tag after <body>)
html = re.sub(r'(<body[^>]*>)\s*\n<div id="vov-page-wrap">\s*\n', r'\1\n', html)

# Remove the wrapper closing tag before </body>
html = html.replace('\n</div><!-- /vov-page-wrap -->\n</body>', '\n</body>')

# Also clean up any leftover ad-space divs
html = html.replace('<div class="ad-space-left">Ad Space (120px)</div>', '')
html = html.replace('<div class="ad-space-right">Ad Space (120px)</div>', '')

with open("C:/Users/Lenovo/Desktop/vov/index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done. All 120px spacing changes removed. Website is back to original.")
