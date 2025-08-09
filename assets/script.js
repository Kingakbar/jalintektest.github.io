// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ======================================
// PROJECT SECTION FUNCTIONALITY
// ======================================

// Initialize project section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupProjectAnimations();
    setupStatCounter();
    setupIntersectionObserver();
});

// Setup project card animations
function setupProjectAnimations() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100 + 500); // Delay 500ms + staggered animation
    });
}

// Setup statistics counter animation
function setupStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    };
    
    // Start counter animation for all stat numbers
    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('section-header')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                
                if (element.classList.contains('project-stats')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                    // Trigger counter animation
                    setTimeout(() => {
                        const statNumbers = element.querySelectorAll('.stat-number');
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-count'));
                            let current = 0;
                            const increment = target / 50;
                            const duration = 2000;
                            const stepTime = duration / 50;
                            
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                stat.textContent = Math.floor(current);
                            }, stepTime);
                        });
                    }, 400);
                }
                
                if (element.classList.contains('pagination-wrapper')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.section-header, .project-stats, .pagination-wrapper');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Add smooth scroll behavior enhancement for portfolio links
const smoothScrollLinks = document.querySelectorAll('a[href="#portfolio"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectSection = document.getElementById('portfolio');
        const offset = 100; // Offset for fixed navbar
        
        window.scrollTo({
            top: projectSection.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll("#projectsContainer .col-lg-4");
    const itemsPerPage = 3; // jumlah project per halaman
    let currentPage = 1;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const pageNumbersContainer = document.getElementById("pageNumbers");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Fungsi menampilkan project sesuai halaman
    function showPage(page) {
        projects.forEach((project, index) => {
            project.style.display =
                index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
                    ? "block"
                    : "none";
        });

        // Update nomor halaman aktif
        document.querySelectorAll(".pagination .page-item").forEach(btn => btn.classList.remove("active"));
        const activePageBtn = document.querySelector(`.page-number[data-page='${page}']`);
        if (activePageBtn) activePageBtn.classList.add("active");

        // Disable prev/next jika di ujung
        prevBtn.classList.toggle("disabled", page === 1);
        nextBtn.classList.toggle("disabled", page === totalPages);
    }

    // Generate tombol halaman
    function createPagination() {
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = "page-item page-number";
            li.dataset.page = i;

            const a = document.createElement("a");
            a.className = "page-link";
            a.href = "#";
            a.innerText = i;

            a.addEventListener("click", function (e) {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
            });

            li.appendChild(a);
            pageNumbersContainer.appendChild(li);
        }
    }

    // Event tombol prev/next
    prevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Inisialisasi
    createPagination();
    showPage(currentPage);
});

const track = document.getElementById('portfolioTrack');

// --- Duplikasi otomatis supaya scroll mulus ---
track.innerHTML += track.innerHTML; // gandakan semua item

// --- Set speed default ---
track.style.animationDuration = '10s'; // normal speed

// --- Fungsi untuk mempercepat animasi sedikit ---
function speedUp() {
  let currentDuration = parseFloat(getComputedStyle(track).animationDuration);
  let newDuration = currentDuration - 3; // percepat 3 detik
  if (newDuration < 1) newDuration = 1; // minimal 1 detik biar gak terlalu cepat
  track.style.animationDuration = newDuration + 's';
  console.log('Speed up! New duration:', newDuration);
}

// --- Jalankan langsung saat halaman load ---
speedUp();


