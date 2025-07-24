// LINE友だち追加機能
function openLineApp() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    if (isIOS || isAndroid) {
        // スマホの場合はLINEアプリを直接起動
        window.location.href = 'https://line.me/R/ti/p/@883pjgjt';
    } else {
        // PCの場合はLINE Web版を開く
        window.open('https://line.me/R/ti/p/@883pjgjt', '_blank');
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 友だち追加ボタンのクリックイベント
    const purchaseButton = document.querySelector('.purchase-button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', function(e) {
            e.preventDefault();
            openLineApp();
            
            // Google Analytics用のイベント追跡（将来的に使用）
            if (typeof gtag !== 'undefined') {
                gtag('event', 'line_friend_add_attempt', {
                    'event_category': 'engagement',
                    'event_label': 'purchase_button_click'
                });
            }
        });
    }
    
    // ぼかしコンテンツクリック時の誘導
    const blurredContent = document.querySelector('.blurred-content');
    if (blurredContent) {
        blurredContent.addEventListener('click', function() {
            const paywall = document.querySelector('.paywall');
            if (paywall) {
                paywall.scrollIntoView({ behavior: 'smooth' });
                
                // 軽いアニメーション効果
                paywall.style.animation = 'pulse 0.8s ease-in-out';
                setTimeout(() => {
                    paywall.style.animation = '';
                }, 800);
            }
        });
    }
});

// パフォーマンス最適化：画像の遅延読み込み
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// CSS アニメーション定義を動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .paywall {
        transition: transform 0.3s ease;
    }
    
    .blurred-content {
        cursor: pointer;
    }
    
    .blurred-content:hover .fade-overlay {
        background: linear-gradient(to bottom, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.4) 30%, 
            rgba(255,255,255,0.8) 70%,
            rgba(255,255,255,1) 100%);
    }
`;
document.head.appendChild(style);