f = open('C:/Users/Lenovo/Desktop/vov/index.html', encoding='utf-8')
c = f.read()
f.close()
import re

# Find navbar-related class names in actual HTML elements
for kw in ['vovvn-navbar', 'vovvn-header', 'nav-vov', 'navbar-vov', 'main-menu']:
    results = []
    start = 0
    while True:
        i = c.find(kw, start)
        if i == -1: break
        # Get surrounding context
        snippet = c[max(0,i-20):i+100]
        if 'class=' in snippet or '<' in snippet:
            results.append(repr(snippet))
        start = i + 1
    if results:
        print(f'\n=== {kw} ===')
        for r in results[:3]:
            print(r)

# Find what wraps main content sections
idx = c.find('main-content')
if idx != -1:
    print('\n=== main-content ===')
    print(repr(c[idx:idx+300]))

# Find section wrapper classes
for kw in ['section-main', 'col-main', 'vovvn-body', 'site-content', 'region-content']:
    i = c.find(kw)
    if i != -1:
        print(f'\n=== {kw} ===')
        print(repr(c[i:i+200]))
