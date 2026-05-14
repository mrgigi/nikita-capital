// LYNN INVESTMENT - INTERACTIVE ELEMENTS

document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Investment Calculator Logic
    const amountBtns = document.querySelectorAll('.amount-btn');
    const bankYear1 = document.getElementById('bank-year-1');
    const bankYear3 = document.getElementById('bank-year-3');
    const lynnYear1 = document.getElementById('lynn-year-1');
    const lynnYear3 = document.getElementById('lynn-year-3');
    const diffValue = document.getElementById('diff-value');
    const lynnTierLabel = document.getElementById('lynn-tier-label');

    if (amountBtns.length > 0) {
        const formatCurrency = (num) => {
            return '$' + Math.round(num).toLocaleString('en-US');
        };

        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Toggle
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const amount = parseInt(btn.getAttribute('data-amount'));
                const tier = btn.getAttribute('data-tier');

                // Calculations (Simple Interest as per screenshot analysis)
                const bYear1 = amount * 0.06;
                const bYear3 = amount + (bYear1 * 3);
                
                const lYear1 = amount * 0.17;
                const lYear3 = amount + (lYear1 * 3);
                
                const annualDiff = lYear1 - bYear1;

                // Update UI with smooth transition feel
                bankYear1.innerText = formatCurrency(bYear1);
                bankYear3.innerText = formatCurrency(bYear3);
                lynnYear1.innerText = formatCurrency(lYear1);
                lynnYear3.innerText = formatCurrency(lYear3);
                diffValue.innerText = formatCurrency(annualDiff) + ' more';
                lynnTierLabel.innerText = tier.toUpperCase();
            });
        });
    }
});
