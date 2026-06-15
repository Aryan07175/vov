import bs4
import re

print("Starting ad copy...")

# 1. Read VnExpress to get Ad snippets
with open('C:/Users/Lenovo/Desktop/vnexpress/index.html', encoding='utf-8') as f:
    vne_soup = bs4.BeautifulSoup(f, 'html.parser')

ad_top = vne_soup.find('section', class_='section-ads-top')
ad_banner1 = vne_soup.find('div', id='_large_1')

vne_ad_scripts = []
for script in vne_soup.find_all('script'):
    src = script.get('src')
    if src and ('adv' in src or 'ads' in src or 'eclick' in src):
        vne_ad_scripts.append(str(script))

# 2. Read VOV
with open('C:/Users/Lenovo/Desktop/vov/index.html', encoding='utf-8') as f:
    vov_html = f.read()

# Clean up previous ad injections if any
vov_html = re.sub(r'<!-- VNE ADS -->.*?<!-- /VNE ADS -->\s*', '', vov_html, flags=re.DOTALL)
vov_html = re.sub(r'<!-- VNE ADS SCRIPTS -->.*?<!-- /VNE ADS SCRIPTS -->\s*', '', vov_html, flags=re.DOTALL)

# Inject top ad banner right below the header
ad_top_html = f'''
<!-- VNE ADS -->
<div class="vne-ad-container" style="text-align: center; margin: 10px auto; padding: 10px 0; border-bottom: 1px solid #e5e5e5; max-width: 1160px; background: #fff;">
    <span style="font-size: 11px; color: #999; display: block; margin-bottom: 5px;">Quảng cáo</span>
    {str(ad_top) if ad_top else ''}
    {str(ad_banner1.parent) if ad_banner1 else ''}
    <img src="https://s1.vnecdn.net/vnexpress/restruct/i/v904/v2_2019/pc/graphics/logo.svg" style="height:90px; width:auto; opacity: 0.05;" alt="Ad Placeholder" />
</div>
<!-- /VNE ADS -->
'''

# Find the vne-nav-wrap to insert the ad below it
idx = vov_html.find('</div><!-- End vne-nav-wrap -->')
if idx != -1:
    vov_html = vov_html[:idx] + '</div>' + ad_top_html + vov_html[idx:]
else:
    # fallback
    vov_html = vov_html.replace('<div class="vne-main-container', ad_top_html + '\n<div class="vne-main-container')

# Add scripts at the bottom
script_injection = f'''
<!-- VNE ADS SCRIPTS -->
{''.join(vne_ad_scripts)}
<!-- /VNE ADS SCRIPTS -->
'''
vov_html = vov_html.replace('</body>', script_injection + '\n</body>')

with open('C:/Users/Lenovo/Desktop/vov/index.html', 'w', encoding='utf-8') as f:
    f.write(vov_html)

print('SUCCESS: VnExpress ads and scripts copied to VOV.')
