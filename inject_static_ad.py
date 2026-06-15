import re

with open('C:/Users/Lenovo/Desktop/vov/index.html', encoding='utf-8') as f:
    html = f.read()

ad_html = '''
<!-- STATIC AD BANNER -->
<div class="vne-static-ad-container" style="text-align: center; margin: 10px auto; padding: 10px 0; border-bottom: 1px solid #e5e5e5; width: 100%; max-width: 1160px; box-sizing: border-box; display: block; visibility: visible; position: relative; z-index: 99999;">
    <span style="font-size: 11px; color: #999; display: block; margin-bottom: 5px;">Quảng cáo</span>
    <div style="width: 100%; max-width: 1004px; height: 90px; background: #f4f4f4; margin: 0 auto; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor: pointer;">
        <img src="https://s1.vnecdn.net/vnexpress/restruct/i/v904/v2_2019/pc/graphics/logo.svg" style="height:30px; opacity: 0.15; position: absolute; z-index: 1;" alt="VNExpress Ad">
        <div style="position: absolute; width: 100%; height: 100%; background: linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.02) 50%, transparent 55%); background-size: 20px 20px; z-index: 2;"></div>
    </div>
</div>
<!-- /STATIC AD BANNER -->
'''

# Remove old ad container from JS to avoid duplication
with open('C:/Users/Lenovo/Desktop/vov/vnexpress-structure.js', 'r', encoding='utf-8') as jsf:
    js = jsf.read()
    js = re.sub(r'// 5\. INJECT VNEXPRESS ADS.*', '', js, flags=re.DOTALL)
    # Add back the closing braces that we might have stripped
    js += '\n    console.log("VNExpress transformation complete.");\n  }\n\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", initVnExpressLayout);\n  } else {\n    initVnExpressLayout();\n  }\n})();'
with open('C:/Users/Lenovo/Desktop/vov/vnexpress-structure.js', 'w', encoding='utf-8') as jsf:
    jsf.write(js)

# Insert ad directly into HTML right after opening body tag
# Avoid duplicate inserts
html = re.sub(r'<!-- STATIC AD BANNER -->.*?<!-- /STATIC AD BANNER -->', '', html, flags=re.DOTALL)
html = re.sub(r'(<body[^>]*>)', r'\1\n' + ad_html, html, 1)

with open('C:/Users/Lenovo/Desktop/vov/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Static ad inserted successfully.')
