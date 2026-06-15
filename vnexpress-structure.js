(function() {
  'use strict';

  function initVnExpressLayout() {
    console.log("Starting VNExpress layout transformation...");

    // 1. HEADER TRANSFORMATION
    const origHeader = document.querySelector('.vovvn-header');
    if (origHeader) {
      const vneHeader = document.createElement('div');
      vneHeader.className = 'vne-header-wrap container';
      vneHeader.style.display = 'flex';
      vneHeader.style.justifyContent = 'space-between';
      vneHeader.style.alignItems = 'center';
      vneHeader.style.height = '60px';
      vneHeader.style.borderBottom = '1px solid #e5e5e5';
      
      const logoWrap = document.createElement('div');
      logoWrap.className = 'vne-logo-area';
      logoWrap.style.display = 'flex';
      logoWrap.style.alignItems = 'center';
      logoWrap.style.gap = '15px';
      
      const origLogo = document.querySelector('.vovvn-header .logo img') || document.querySelector('.vovvn-header img[src*="logo"]');
      if (origLogo) {
        const logoClone = origLogo.cloneNode(true);
        const logoLink = document.createElement('a');
        logoLink.href = '/';
        logoClone.style.height = '35px';
        logoClone.style.width = 'auto';
        logoLink.appendChild(logoClone);
        logoWrap.appendChild(logoLink);
      }

      const dateSpan = document.createElement('span');
      dateSpan.className = 'vne-date';
      const now = new Date();
      const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
      dateSpan.innerText = `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
      dateSpan.style.color = '#757575';
      dateSpan.style.fontSize = '14px';
      dateSpan.style.paddingLeft = '15px';
      dateSpan.style.borderLeft = '1px solid #e5e5e5';
      logoWrap.appendChild(dateSpan);

      const rightActions = document.createElement('div');
      rightActions.className = 'vne-header-right';
      rightActions.style.display = 'flex';
      rightActions.style.alignItems = 'center';
      rightActions.style.gap = '20px';
      rightActions.innerHTML = `
        <a href="#" style="color:#757575;font-size:14px;text-decoration:none;">Mới nhất</a>
        <a href="#" style="color:#757575;font-size:14px;text-decoration:none;">Tin theo khu vực</a>
        <a href="#" style="color:#9f224e;font-size:12px;border:1px solid #e5e5e5;padding:3px 8px;border-radius:3px;text-decoration:none;">International</a>
      `;

      vneHeader.appendChild(logoWrap);
      vneHeader.appendChild(rightActions);

      origHeader.parentNode.insertBefore(vneHeader, origHeader);
      
      const navbar = document.querySelector('.vovvn-navbar');
      if (navbar) {
        const navWrapObj = document.createElement('div');
        navWrapObj.className = 'vne-nav-wrap';
        navWrapObj.style.backgroundColor = '#f7f7f7';
        navWrapObj.style.borderBottom = '1px solid #e5e5e5';
        navWrapObj.style.height = '48px';
        navWrapObj.style.position = 'sticky';
        navWrapObj.style.top = '0';
        navWrapObj.style.zIndex = '1000';
        navWrapObj.appendChild(navbar);
        origHeader.parentNode.insertBefore(navWrapObj, origHeader);
        navbar.classList.remove('dark', 'bg-vov-primary');
      }
      
      origHeader.style.display = 'none';
    }

    // 2. HERO SECTION TRANSFORMATION
    const heroImageCover = document.querySelector('.page-live .image-cover, .block-news-top .image-cover');
    if (heroImageCover) {
      const heroParent = heroImageCover.parentNode;
      const titleNode = heroImageCover.querySelector('.node-title');
      const descNode = heroParent.querySelector('.description, .sapo');
      
      if (titleNode) {
        const vneHeroWrap = document.createElement('div');
        vneHeroWrap.className = 'vne-hero-layout';
        vneHeroWrap.style.display = 'flex';
        vneHeroWrap.style.backgroundColor = '#f7f7f7';
        vneHeroWrap.style.marginBottom = '30px';
        vneHeroWrap.style.marginTop = '20px';
        vneHeroWrap.style.borderBottom = '1px solid #e5e5e5';
        
        const imgCol = document.createElement('div');
        imgCol.className = 'vne-hero-img';
        imgCol.style.flex = '0 0 66%';
        imgCol.style.maxWidth = '66%';
        
        const imgNode = heroImageCover.querySelector('img');
        if (imgNode) {
            const imgCloneWrap = document.createElement('a');
            const titleLink = titleNode.querySelector('a');
            imgCloneWrap.href = titleLink ? titleLink.href : '#';
            const clone = imgNode.cloneNode(true);
            clone.style.width = '100%';
            clone.style.height = 'auto';
            clone.style.aspectRatio = '16/9';
            clone.style.objectFit = 'cover';
            imgCloneWrap.appendChild(clone);
            imgCol.appendChild(imgCloneWrap);
        }
        
        const textCol = document.createElement('div');
        textCol.className = 'vne-hero-text';
        textCol.style.flex = '0 0 34%';
        textCol.style.maxWidth = '34%';
        textCol.style.padding = '20px 25px';
        textCol.style.display = 'flex';
        textCol.style.flexDirection = 'column';
        textCol.style.justifyContent = 'center';
        
        titleNode.style.position = 'static';
        titleNode.style.background = 'none';
        titleNode.style.padding = '0';
        const titleLink = titleNode.querySelector('a');
        if(titleLink) {
            titleLink.style.fontFamily = "'Merriweather', serif";
            titleLink.style.fontSize = '26px';
            titleLink.style.fontWeight = '700';
            titleLink.style.lineHeight = '1.4';
            titleLink.style.color = '#222';
        }
        textCol.appendChild(titleNode);
        
        if (descNode) {
            textCol.appendChild(descNode);
        } else {
            const fakeDesc = document.createElement('p');
            fakeDesc.className = 'vne-hero-desc';
            fakeDesc.innerText = 'Bản tin cập nhật chi tiết các diễn biến mới nhất, mang đến thông tin đa chiều và khách quan cho độc giả...';
            textCol.appendChild(fakeDesc);
        }

        vneHeroWrap.appendChild(imgCol);
        vneHeroWrap.appendChild(textCol);
        
        heroParent.parentNode.insertBefore(vneHeroWrap, heroParent);
        heroParent.style.display = 'none';
      }
    }

    // 3. ARTICLE GRID/LIST TRANSFORMATION
    const articleCards = document.querySelectorAll('.item-news, .card');
    articleCards.forEach(card => {
        card.classList.add('vne-article-list-item');
        card.style.display = 'flex';
        card.style.flexDirection = 'row';
        card.style.gap = '15px';
        card.style.padding = '15px 0';
        card.style.borderBottom = '1px solid #e5e5e5';
        card.style.border = 'none';
        
        const thumb = card.querySelector('.thumb, .thumb-art, .card-img-top');
        const textWrap = document.createElement('div');
        textWrap.className = 'vne-article-text';
        textWrap.style.flex = '1';
        textWrap.style.display = 'flex';
        textWrap.style.flexDirection = 'column';
        
        const title = card.querySelector('.title-news, .card-title, .article-title');
        const desc = card.querySelector('.description, .sapo, .card-text');
        
        if (title) textWrap.appendChild(title);
        if (desc) textWrap.appendChild(desc);
        
        if (thumb && title) {
            Array.from(card.children).forEach(c => {
                if (c !== thumb) c.style.display = 'none';
            });
            thumb.style.flex = '0 0 160px';
            thumb.style.maxWidth = '160px';
            thumb.style.margin = '0';
            const img = thumb.querySelector('img');
            if(img) {
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.aspectRatio = '4/3';
                img.style.objectFit = 'cover';
            }
            card.appendChild(textWrap);
            thumb.style.display = 'block';
        }
    });

    console.log("VNExpress transformation complete.");
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVnExpressLayout);
  } else {
    initVnExpressLayout();
  }
})();