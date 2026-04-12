document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // --- Audio & Entrance Logic ---
    const entranceScreen = document.getElementById('entrance-screen');
    const openBtn = document.getElementById('open-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    const musicIcon = musicToggleBtn.querySelector('i');

    let isMusicPlaying = false;

    // Set volume a bit lower
    bgMusic.volume = 0.5;

    openBtn.addEventListener('click', () => {
        // Play music
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }).catch(err => {
            console.log('Autoplay blocked by browser', err);
        });

        // Hide entrance
        entranceScreen.style.opacity = '0';
        setTimeout(() => {
            entranceScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            
            // Re-trigger AOS on load
            AOS.refresh();
        }, 1000);
    });

    // Toggle Music Button
    musicToggleBtn.addEventListener('click', () => {
        if(isMusicPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        } else {
            bgMusic.play();
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Countdown Logic ---
    // Target date: July 25, 2026 18:00:00 (Local time representation)
    const targetDate = new Date('July 25, 2026 18:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if(distance < 0) {
            document.getElementById('countdown').innerHTML = "<h3>¡Llegó el gran día!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Hero Background Slideshow ---
    const heroBg = document.querySelector('.hero-bg');
    const bgImages = [
        'public/portada.jpg',
        'public/E88A9658.jpg',
        'public/E88A9720.jpg',
        'public/E88A9744.jpg'
    ];
    let bgIndex = 0;
    
    // Change image every 5 seconds
    setInterval(() => {
        bgIndex = (bgIndex + 1) % bgImages.length;
        heroBg.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
    }, 5000);

    // --- Particles.js Configuration ---
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 150,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#d4af37" // Golden color
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.25,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.05,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }

});
