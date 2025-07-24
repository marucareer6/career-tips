// QRコード表示切り替え
function toggleQR() {
    const qrSection = document.getElementById('qrSection');
    if (qrSection.style.display === 'none' || qrSection.style.display === '') {
        qrSection.style.display = 'block';
        // スムーズなスクロール
        setTimeout(() => {
            qrSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        qrSection.style.display = 'none';
    }
}

// スマホでのLINE直接起動
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
    // LINEボタンにクリックイベントを追加
    const lineButtons = document.querySelectorAll('.line-btn.primary');
    lineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openLineApp();
        });
    });
    
    // Google Analytics用のイベント追跡（将来的に使用）
    const ctaBox = document.querySelector('.cta-box');
    if (ctaBox) {
        ctaBox.addEventListener('click', function(e) {
            // LINE友だち追加のコンバージョン追跡
            if (typeof gtag !== 'undefined') {
                gtag('event', 'line_friend_add_attempt', {
                    'event_category': 'engagement',
                    'event_label': 'cta_click'
                });
            }
        });
    }
    
    // スクロール位置によるCTAボックスのハイライト効果
    window.addEventListener('scroll', function() {
        const ctaBox = document.querySelector('.cta-box');
        const scrollPosition = window.scrollY + window.innerHeight;
        const ctaPosition = ctaBox.offsetTop;
        
        if (scrollPosition > ctaPosition + 100) {
            ctaBox.style.transform = 'scale(1.02)';
            ctaBox.style.boxShadow = '0 15px 40px rgba(6, 199, 85, 0.4)';
        } else {
            ctaBox.style.transform = 'scale(1)';
            ctaBox.style.boxShadow = '0 10px 30px rgba(6, 199, 85, 0.3)';
        }
    });
    
    // モザイク部分をクリックした時の誘導
    const blurredContent = document.querySelector('.content-blurred');
    if (blurredContent) {
        blurredContent.addEventListener('click', function() {
            const ctaBox = document.querySelector('.cta-box');
            ctaBox.scrollIntoView({ behavior: 'smooth' });
            
            // 軽いアニメーション効果
            ctaBox.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                ctaBox.style.animation = '';
            }, 1000);
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
    
    .cta-box {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .content-blurred {
        cursor: pointer;
    }
    
    .content-blurred:hover::after {
        background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.98) 100%);
    }
`;
document.head.appendChild(style);