import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Vitamin Template initialized');

  // ハンバーガーメニューの機能
  const hamburgerButton = document.querySelector('.l-header__hamburger') as HTMLButtonElement;
  const mobileNav = document.querySelector('.l-header__nav--mobile') as HTMLElement;

  if (hamburgerButton && mobileNav) {
    hamburgerButton.addEventListener('click', () => {
      const isOpen = hamburgerButton.getAttribute('aria-expanded') === 'true';

      // 状態を切り替え
      hamburgerButton.setAttribute('aria-expanded', (!isOpen).toString());
      hamburgerButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
      mobileNav.setAttribute('aria-hidden', isOpen.toString());

      // CSSクラスでスタイル制御
      if (isOpen) {
        mobileNav.classList.remove('is-open');
      } else {
        mobileNav.classList.add('is-open');
      }
    });

    // モバイルナビゲーションのリンクをクリック時にメニューを閉じる
    const mobileNavLinks = mobileNav.querySelectorAll('.l-header__nav-link');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-label', 'メニューを開く');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('is-open');
      });
    });

    // Escキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-label', 'メニューを開く');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('is-open');
      }
    });

    // モバイルナビゲーション外をクリック時にメニューを閉じる
    document.addEventListener('click', (e) => {
      if (
        mobileNav.classList.contains('is-open') &&
        !mobileNav.contains(e.target as Node) &&
        !hamburgerButton.contains(e.target as Node)
      ) {
        hamburgerButton.setAttribute('aria-expanded', 'false');
        hamburgerButton.setAttribute('aria-label', 'メニューを開く');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('is-open');
      }
    });
  }

  // Smooth scroll for anchor links with header offset
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        const header = document.querySelector('.l-header') as HTMLElement;

        if (target && header) {
          // ヘッダーの高さを動的に取得
          const headerHeight = header.offsetHeight;
          const targetPosition = (target as HTMLElement).offsetTop - headerHeight - 16; // 16px margin

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });
});
