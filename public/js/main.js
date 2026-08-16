/**
 * ARTHUR MOSES PORTFOLIO - MAIN JS INTERACTION HANDLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Header Scroll Effect & Active Link Highlight
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active Section Tracking
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Scroll to Top Handler
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Contact Form Handling & Nodemailer Integration
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const statusAlert = document.getElementById('statusAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset alert
      statusAlert.className = 'form-status-alert';
      statusAlert.style.display = 'none';
      statusAlert.innerHTML = '';

      // Get Field Values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic Client-Side Validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please provide a valid email address.', 'error');
        return;
      }

      // Enter Loading State
      setLoadingState(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showStatus(data.message || 'Message sent successfully! I will get back to you soon.', 'success');
          contactForm.reset();
        } else {
          showStatus(data.error || 'Failed to send message. Please try again later.', 'error');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showStatus('Server connection error. Please try again later or email directly.', 'error');
      } finally {
        setLoadingState(false);
      }
    });
  }

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'SENDING...';
      submitBtn.style.opacity = '0.85';
    } else {
      submitBtn.disabled = false;
      btnSpinner.style.display = 'none';
      btnText.textContent = 'SEND MESSAGE';
      submitBtn.style.opacity = '1';
    }
  }

  function showStatus(msg, type) {
    statusAlert.className = `form-status-alert ${type}`;
    const iconSvg = type === 'success'
      ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
      : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    
    statusAlert.innerHTML = `${iconSvg} <span>${msg}</span>`;
    statusAlert.style.display = 'flex';
  }
});
