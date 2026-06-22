// NIKITA CAPITAL - INTERACTIVE ELEMENTS

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
    const nikitaYear1 = document.getElementById('nikita-year-1');
    const nikitaYear3 = document.getElementById('nikita-year-3');
    const diffValue = document.getElementById('diff-value');
    const nikitaTierLabel = document.getElementById('nikita-tier-label');

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
                
                const nYear1 = amount * 0.17;
                const nYear3 = amount + (nYear1 * 3);
                
                const annualDiff = nYear1 - bYear1;

                // Update UI with smooth transition feel
                bankYear1.innerText = formatCurrency(bYear1);
                bankYear3.innerText = formatCurrency(bYear3);
                nikitaYear1.innerText = formatCurrency(nYear1);
                nikitaYear3.innerText = formatCurrency(nYear3);
                diffValue.innerText = formatCurrency(annualDiff) + ' more';
                nikitaTierLabel.innerText = tier.toUpperCase();
            });
        });
    }
});
