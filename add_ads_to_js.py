import re

with open('C:/Users/Lenovo/Desktop/vov/vnexpress-structure.js', 'r', encoding='utf-8') as f:
    content = f.read()

ad_injection = """
    // 5. INJECT VNEXPRESS ADS
    const adContainer = document.createElement('div');
    adContainer.className = 'vne-ad-container';
    adContainer.style.textAlign = 'center';
    adContainer.style.margin = '10px auto';
    adContainer.style.padding = '10px 0';
    adContainer.style.borderBottom = '1px solid #e5e5e5';
    adContainer.style.width = '100%';
    adContainer.style.maxWidth = '1160px';
    adContainer.style.boxSizing = 'border-box';
    
    // Copying the exact visual structure of a VnExpress top banner ad
    adContainer.innerHTML = `
        <span style="font-size: 11px; color: #999; display: block; margin-bottom: 5px;">Quảng cáo</span>
        <div style="width: 100%; max-width: 1004px; height: 90px; background: #f4f4f4; margin: 0 auto; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor: pointer;">
            <!-- Simulating a real VnExpress ad visually -->
            <img src="https://s1.vnecdn.net/vnexpress/restruct/i/v904/v2_2019/pc/graphics/logo.svg" style="height:30px; opacity: 0.15; position: absolute; z-index: 1;" alt="VNExpress Ad">
            <div style="position: absolute; width: 100%; height: 100%; background: linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.02) 50%, transparent 55%); background-size: 20px 20px; z-index: 2;"></div>
        </div>
    `;

    // Insert after nav
    const navWrap = document.querySelector('.vne-nav-wrap');
    if (navWrap && navWrap.parentNode) {
        navWrap.parentNode.insertBefore(adContainer, navWrap.nextSibling);
    }
"""

if '// 5. INJECT VNEXPRESS ADS' not in content:
    content = content.replace('console.log("VNExpress transformation complete.");', ad_injection + '\n    console.log("VNExpress transformation complete.");')

    with open('C:/Users/Lenovo/Desktop/vov/vnexpress-structure.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Ad injection added to JS.")
else:
    print("Already added.")
