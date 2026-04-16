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
            
            // The website starts with opacity 0 so we fade it in
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
    const heroSection = document.querySelector('.hero');
    const existingHeroBg = document.querySelector('.hero-bg');
    if (existingHeroBg) existingHeroBg.remove();
    
    // Lista de fotos con el orden específico:
    // 1) Beso (portada.jpg)
    // 2) Novia con ramo (E88A9522.jpg u otra)
    // 3+) El resto
    const sliderImages = [
        'assets/E88A9616.jpg',
        'assets/E88A9658.jpg',
        'assets/E88A9690.jpg',
        'assets/E88A9764.jpg'
    ];

    // Create 2 interlocking layers for optimized smooth crossfade
    const bgLayer1 = document.createElement('div');
    const bgLayer2 = document.createElement('div');
    bgLayer1.className = 'hero-bg';
    bgLayer2.className = 'hero-bg';
    
    bgLayer1.style.transition = 'opacity 2.5s ease-in-out';
    bgLayer2.style.transition = 'opacity 2.5s ease-in-out';
    
    bgLayer1.style.backgroundImage = `url('${sliderImages[0]}')`;
    bgLayer2.style.backgroundImage = `url('${sliderImages[1]}')`;
    
    bgLayer1.style.opacity = '1';
    bgLayer2.style.opacity = '0';
    
    const heroOverlay = document.querySelector('.hero-overlay');
    heroSection.insertBefore(bgLayer1, heroOverlay);
    heroSection.insertBefore(bgLayer2, heroOverlay);

    let currentLayer = 1;
    let imageIndex = 0;

    // Change image every 5 seconds
    setInterval(() => {
        // We move to the next image
        imageIndex = (imageIndex + 1) % sliderImages.length;
        const nextImageIndex = (imageIndex + 1) % sliderImages.length;
        
        if (currentLayer === 1) {
            bgLayer2.style.opacity = '1';
            bgLayer1.style.opacity = '0';
            currentLayer = 2;
            
            // Wait for fade out, then preload the next image behind
            setTimeout(() => {
                bgLayer1.style.backgroundImage = `url('${sliderImages[nextImageIndex]}')`;
            }, 2500);
        } else {
            bgLayer1.style.opacity = '1';
            bgLayer2.style.opacity = '0';
            currentLayer = 1;
            
            setTimeout(() => {
                bgLayer2.style.backgroundImage = `url('${sliderImages[nextImageIndex]}')`;
            }, 2500);
        }
    }, 5000);


    // --- Gallery Grid Dynamic Slideshow (Fixed Repetition) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Divide images into 4 exclusive separate blocks to avoid any repetition
    const galleryBlocks = [
        ['assets/E88A9512.jpg', 'assets/E88A9614.jpg', 'assets/E88A9690.jpg'],
        ['assets/E88A9540.jpg', 'assets/E88A9616.jpg', 'assets/E88A9764.jpg'],
        ['assets/E88A9550.jpg', 'assets/E88A9654.jpg', 'assets/E88A9586.jpg'],
        ['assets/E88A9565.jpg', 'assets/E88A9658.jpg', 'assets/E88A9600.jpg']
    ];

    galleryItems.forEach((item, itemIndex) => {
        // Clear existing static background correctly and setup relative positioning
        item.style.backgroundImage = 'none';
        item.style.position = 'relative';
        item.style.overflow = 'hidden';

        const gLayer1 = document.createElement('div');
        const gLayer2 = document.createElement('div');
        
        const layerStyle = `
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center;
            transition: opacity 2s ease-in-out;
            z-index: 1;
            border-radius: 15px; /* keep rounded corners */
        `;
        gLayer1.style.cssText = layerStyle;
        gLayer2.style.cssText = layerStyle;
        
        item.appendChild(gLayer1);
        item.appendChild(gLayer2);

        // Assign the unique block of photos for this item
        const myPhotos = galleryBlocks[itemIndex % galleryBlocks.length];
        let gIndex = 0;
        let nextGIndex = 1;
        
        gLayer1.style.backgroundImage = `url('${myPhotos[gIndex]}')`;
        gLayer2.style.backgroundImage = `url('${myPhotos[nextGIndex]}')`;
        
        gLayer1.style.opacity = '1';
        gLayer2.style.opacity = '0';
        
        // Stagger their intervals to give a domino/random effect
        setTimeout(() => {
            let currentGLayer = 1;
            
            setInterval(() => {
                gIndex = (gIndex + 1) % myPhotos.length;
                nextGIndex = (gIndex + 1) % myPhotos.length;
                
                if (currentGLayer === 1) {
                    gLayer2.style.opacity = '1';
                    gLayer1.style.opacity = '0';
                    currentGLayer = 2;
                    setTimeout(() => {
                        gLayer1.style.backgroundImage = `url('${myPhotos[nextGIndex]}')`;
                    }, 2000);
                } else {
                    gLayer1.style.opacity = '1';
                    gLayer2.style.opacity = '0';
                    currentGLayer = 1;
                    setTimeout(() => {
                        gLayer2.style.backgroundImage = `url('${myPhotos[nextGIndex]}')`;
                    }, 2000);
                }
            }, 6000 + (itemIndex * 1500)); // slightly different timing for each card
        }, itemIndex * 1500);
    });

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
                    "value": ["#ffffff", "#dcedc8", "#a5d6a7"] // Soft white and leaf greens
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
                    "value": 0.6,
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
