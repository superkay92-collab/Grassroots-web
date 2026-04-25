// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Close mobile menu after selecting a tab.
    const mainNavLinks = document.getElementById('mainNavLinks');
    const navToggle = document.getElementById('navToggle');
    if (mainNavLinks) {
        mainNavLinks.classList.remove('open');
    }
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // Keep top nav highlight in sync with the opened tab.
    const matchingNavLink = document.querySelector(`.nav-link[onclick*="showTab('${tabName}')"]`);
    if (matchingNavLink) {
        matchingNavLink.classList.add('active');
    }
}

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'grassroots2026'
};

const ADMIN_SESSION_KEY = 'grassrootAdminLoggedIn';
const CAREER_APPLICATIONS_KEY = 'grassrootCareerApplications';

// Handle team form submission
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const navToggle = document.getElementById('navToggle');
    const mainNavLinks = document.getElementById('mainNavLinks');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryLoadMoreBtn = document.getElementById('galleryLoadMoreBtn');
    const galleryLightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const siteNotice = document.getElementById('siteNotice');
    let currentLightboxIndex = -1;
    let noticeTimer = null;

    if (heroVideo) {
        const attemptPlay = () => {
            const playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                    // Keep muted/looping background behavior without interrupting page usage.
                });
            }
        };

        heroVideo.muted = true;
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('playsinline', '');
        attemptPlay();
    }

    const showNotice = (message, type = 'success') => {
        if (!siteNotice) {
            return;
        }

        siteNotice.textContent = message;
        siteNotice.classList.remove('error', 'show');
        if (type === 'error') {
            siteNotice.classList.add('error');
        }

        // Restart animation for repeated messages.
        void siteNotice.offsetWidth;
        siteNotice.classList.add('show');

        if (noticeTimer) {
            clearTimeout(noticeTimer);
        }

        noticeTimer = setTimeout(() => {
            siteNotice.classList.remove('show');
        }, 2800);
    };

    if (navToggle && mainNavLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = mainNavLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNavLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const closeLightbox = () => {
        if (!galleryLightbox || !lightboxImage) {
            return;
        }

        galleryLightbox.classList.remove('open');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        currentLightboxIndex = -1;
    };

    const openLightbox = (index) => {
        if (!galleryLightbox || !lightboxImage) {
            return;
        }

        const selectedImageFile = galleryImages[index];
        if (!selectedImageFile) {
            return;
        }

        currentLightboxIndex = index;
        lightboxImage.src = `assets/gallery/${encodeURIComponent(selectedImageFile)}`;
        lightboxImage.alt = `Grassroot Networking gallery photo ${index + 1}`;
        galleryLightbox.classList.add('open');
        galleryLightbox.setAttribute('aria-hidden', 'false');
    };

    const showAdjacentImage = (direction) => {
        if (!galleryImages.length || currentLightboxIndex === -1) {
            return;
        }

        const nextIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
        openLightbox(nextIndex);
    };

    const galleryImages = [
        'WhatsApp Image 2026-03-23 at 8.23.06 AM.jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (1).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (2).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (3).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (4).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (5).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (6).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (7).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (8).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (9).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (10).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (11).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (12).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (13).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (14).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (15).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (16).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (17).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (18).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (19).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (20).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (21).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (22).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.06 AM (23).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM.jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (1).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (2).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (3).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (4).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (5).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (6).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (7).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (8).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (9).jpeg',
        'WhatsApp Image 2026-03-23 at 8.23.07 AM (10).jpeg'
    ];

    const galleryBatchSize = 12;
    let renderedGalleryCount = 0;

    const aboutPreviewImages = Array.from(document.querySelectorAll('.about-gallery-preview img'));
    let aboutPreviewStartIndex = 0;

    const renderAboutPreviewImages = () => {
        if (!aboutPreviewImages.length) {
            return;
        }

        aboutPreviewImages.forEach((img, slotIndex) => {
            const imageIndex = (aboutPreviewStartIndex + slotIndex) % galleryImages.length;
            const fileName = galleryImages[imageIndex];
            img.src = `assets/gallery/${encodeURIComponent(fileName)}`;
            img.alt = `Grassroot event moment ${imageIndex + 1}`;
        });
    };

    if (aboutPreviewImages.length) {
        renderAboutPreviewImages();
        setInterval(() => {
            aboutPreviewImages.forEach((img) => {
                img.classList.add('is-fading');
            });

            aboutPreviewStartIndex = (aboutPreviewStartIndex + 1) % galleryImages.length;

            setTimeout(() => {
                renderAboutPreviewImages();
                aboutPreviewImages.forEach((img) => {
                    img.classList.remove('is-fading');
                });
            }, 650);
        }, 20000);
    }

    const renderGalleryBatch = () => {
        if (!galleryGrid) {
            return;
        }

        const nextCount = Math.min(renderedGalleryCount + galleryBatchSize, galleryImages.length);

        for (let index = renderedGalleryCount; index < nextCount; index += 1) {
            const fileName = galleryImages[index];
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = `assets/gallery/${encodeURIComponent(fileName)}`;
            img.alt = `Grassroot Networking gallery photo ${index + 1}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.fetchPriority = 'low';

            // Staggered entrance delay
            item.style.animationDelay = `${(index % galleryBatchSize) * 0.06}s`;

            // 3D tilt tracking mouse
            item.addEventListener('mousemove', function(e) {
                if (item.classList.contains('spinning')) return;
                const r = item.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top)  / r.height;
                const rotX = (0.5 - y) * 18;
                const rotY = (x - 0.5) * 18;
                item.style.transition = 'box-shadow 0.1s ease';
                item.style.transform  = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
                item.style.boxShadow  = `${-rotY * 1.4}px ${rotX * 1.4}px 38px rgba(0,0,0,0.24)`;
                item.style.zIndex     = '2';
            });

            item.addEventListener('mouseleave', function() {
                if (item.classList.contains('spinning')) return;
                item.style.transition = 'transform 0.45s ease, box-shadow 0.45s ease';
                item.style.transform  = '';
                item.style.boxShadow  = '';
                item.style.zIndex     = '';
            });

            // Click: ripple → spin → open lightbox
            img.addEventListener('click', function(e) {
                // Reset tilt instantly
                item.style.transition = '';
                item.style.transform  = '';
                item.style.boxShadow  = '';
                item.style.zIndex     = '';

                // Ripple from click point then open lightbox
                const r = item.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'gallery-ripple';
                ripple.style.left = (e.clientX - r.left) + 'px';
                ripple.style.top  = (e.clientY - r.top)  + 'px';
                item.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());

                openLightbox(index);
            });

            item.appendChild(img);
            galleryGrid.appendChild(item);
        }

        renderedGalleryCount = nextCount;

        if (galleryLoadMoreBtn) {
            galleryLoadMoreBtn.classList.toggle('hidden', renderedGalleryCount >= galleryImages.length);
        }
    };

    if (galleryGrid) {
        renderGalleryBatch();
    }

    if (galleryLoadMoreBtn) {
        galleryLoadMoreBtn.addEventListener('click', renderGalleryBatch);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showAdjacentImage(-1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showAdjacentImage(1);
        });
    }

    if (galleryLightbox) {
        galleryLightbox.addEventListener('click', function(e) {
            if (e.target === galleryLightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryLightbox && galleryLightbox.classList.contains('open')) {
            closeLightbox();
        }

        if (e.key === 'ArrowLeft' && galleryLightbox && galleryLightbox.classList.contains('open')) {
            showAdjacentImage(-1);
        }

        if (e.key === 'ArrowRight' && galleryLightbox && galleryLightbox.classList.contains('open')) {
            showAdjacentImage(1);
        }
    });

    const teamForm = document.querySelector('.team-form');
    const reviewForm = document.querySelector('.review-form');
    const careerForm = document.querySelector('.career-form');
    const adminApplicationsList = document.getElementById('adminApplicationsList');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLoginCard = document.getElementById('adminLoginCard');
    const adminDashboard = document.getElementById('adminDashboard');
    const adminLoginMessage = document.getElementById('adminLoginMessage');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const adminDepartmentsCount = document.getElementById('adminDepartmentsCount');
    const adminTeamCount = document.getElementById('adminTeamCount');
    const adminGalleryCount = document.getElementById('adminGalleryCount');
    const adminReviewsCount = document.getElementById('adminReviewsCount');

    const updateAdminStats = () => {
        if (adminDepartmentsCount) {
            adminDepartmentsCount.textContent = document.querySelectorAll('.dept-card').length;
        }

        if (adminTeamCount) {
            adminTeamCount.textContent = document.querySelectorAll('.team-card').length;
        }

        if (adminGalleryCount) {
            adminGalleryCount.textContent = galleryImages.length;
        }

        if (adminReviewsCount) {
            adminReviewsCount.textContent = document.querySelectorAll('.review-card').length;
        }
    };

    const getCareerApplications = () => {
        try {
            const saved = localStorage.getItem(CAREER_APPLICATIONS_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    };

    const saveCareerApplications = (applications) => {
        localStorage.setItem(CAREER_APPLICATIONS_KEY, JSON.stringify(applications));
    };

    const renderCareerApplications = () => {
        if (!adminApplicationsList) {
            return;
        }

        const applications = getCareerApplications();
        adminApplicationsList.innerHTML = '';

        if (!applications.length) {
            adminApplicationsList.innerHTML = '<p class="admin-empty">No applications yet.</p>';
            return;
        }

        applications.slice().reverse().forEach((application) => {
            const item = document.createElement('div');
            item.className = 'admin-application-item';
            item.innerHTML = `
                <h4>${application.name}</h4>
                <p><strong>Position:</strong> ${application.position}</p>
                <p><strong>Email:</strong> ${application.email}</p>
                <p><strong>Resume:</strong> ${application.resumeName}</p>
                <p><strong>Applied:</strong> ${application.appliedAt}</p>
            `;
            adminApplicationsList.appendChild(item);
        });
    };

    const setAdminState = (isLoggedIn) => {
        if (!adminLoginCard || !adminDashboard) {
            return;
        }

        adminLoginCard.classList.toggle('hidden', isLoggedIn);
        adminDashboard.classList.toggle('hidden', !isLoggedIn);

        if (isLoggedIn) {
            sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
            updateAdminStats();
            renderCareerApplications();
            if (adminLoginMessage) {
                adminLoginMessage.textContent = '';
                adminLoginMessage.classList.remove('success');
            }
        } else {
            sessionStorage.removeItem(ADMIN_SESSION_KEY);
            if (adminLoginForm) {
                adminLoginForm.reset();
            }
        }
    };

    setAdminState(sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true');
    renderCareerApplications();
    
    if (teamForm) {
        teamForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const fullName = this.querySelector('input[placeholder="Full Name"]').value;
            const email = this.querySelector('input[placeholder="Email Address"]').value;
            const position = this.querySelector('input[placeholder="Position"]').value;
            const bio = this.querySelector('textarea[placeholder="Brief Biography"]').value;

            // Create new team card
            const newTeamCard = document.createElement('div');
            newTeamCard.className = 'team-card';
            newTeamCard.innerHTML = `
                <div class="team-image">👤</div>
                <h3>${fullName}</h3>
                <p class="position">${position}</p>
                <p class="bio">${bio}</p>
                <p style="font-size: 0.85rem; color: #999; margin-top: 0.8rem;"><strong>Email:</strong> ${email}</p>
            `;

            // Add new card to the beginning of the team grid
            const teamGrid = document.querySelector('.team-grid');
            teamGrid.insertBefore(newTeamCard, teamGrid.firstChild);

            // Reset form
            this.reset();

            // Show success message
            showNotice(`${fullName} has been added to the team.`);
            updateAdminStats();
        });
    }

    if (reviewForm && reviewsGrid) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const reviewerName = this.querySelector('input[placeholder="Your Name"]').value;
            const reviewerRole = this.querySelector('input[placeholder="Your Role or Company"]').value;
            const reviewerRating = this.querySelector('select').value;
            const reviewerText = this.querySelector('textarea').value;

            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            reviewCard.innerHTML = `
                <div class="review-rating">${'★'.repeat(Number(reviewerRating))}${'☆'.repeat(5 - Number(reviewerRating))}</div>
                <p class="review-text">${reviewerText}</p>
                <h3>${reviewerName}</h3>
                <p class="review-role">${reviewerRole}</p>
            `;

            reviewsGrid.insertBefore(reviewCard, reviewsGrid.firstChild);
            this.reset();
            showNotice(`Thank you, ${reviewerName}. Your review has been submitted.`);
            updateAdminStats();
        });
    }

    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const applicantName = this.querySelector('input[placeholder="Full Name"]').value;
            const applicantEmail = this.querySelector('input[placeholder="Email Address"]').value;
            const position = this.querySelector('select').value;
            const motivation = this.querySelector('textarea').value;
            const resumeInput = this.querySelector('.resume-upload');
            const resumeFile = resumeInput ? resumeInput.files[0] : null;

            if (!resumeFile) {
                showNotice('Please attach a resume file before submitting.', 'error');
                return;
            }

            const maxFileSizeBytes = 8 * 1024 * 1024;
            if (resumeFile.size > maxFileSizeBytes) {
                showNotice('Resume is too large. Please upload a file up to 8MB.', 'error');
                return;
            }

            const allowedExtensions = ['pdf', 'doc', 'docx'];
            const fileExtension = resumeFile.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                showNotice('Please upload a PDF, DOC, or DOCX resume.', 'error');
                return;
            }

            const applications = getCareerApplications();
            applications.push({
                name: applicantName,
                email: applicantEmail,
                position,
                motivation,
                resumeName: resumeFile.name,
                appliedAt: new Date().toLocaleString()
            });
            saveCareerApplications(applications);
            renderCareerApplications();

            this.reset();
            showNotice(`Application received from ${applicantName} for ${position}. Resume accepted.`);
            updateAdminStats();
        });
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = this.querySelector('input[placeholder="Admin Username"]').value.trim();
            const password = this.querySelector('input[placeholder="Password"]').value;

            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                if (adminLoginMessage) {
                    adminLoginMessage.textContent = 'Login successful.';
                    adminLoginMessage.classList.add('success');
                }

                setAdminState(true);
            } else if (adminLoginMessage) {
                adminLoginMessage.textContent = 'Incorrect username or password.';
                adminLoginMessage.classList.remove('success');
                showNotice('Incorrect admin username or password.', 'error');
            }
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function() {
            setAdminState(false);
        });
    }

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Your Name"]').value;
            const email = this.querySelector('input[placeholder="Your Email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea[placeholder="Your Message"]').value;

            // Show success message
            showNotice(`Thank you, ${name}. We received your message and will reach you at ${email}.`);
            
            // Reset form
            this.reset();
        });
    }

    // Handle newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            showNotice(`Subscribed successfully with ${email}.`);

            this.reset();
        });
    }
});

// Handle CTA button click
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Button click will automatically trigger showTab via onclick
        });
    }
});
