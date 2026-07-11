function revealToSpan() {

    document.querySelectorAll('.reveal')
    .forEach(function(elem){
        
        //create 2 span tags 
        let parent = document.createElement('span');
        let child = document.createElement('span');


        //set their respective classes
        parent.classList.add('parent');
        child.classList.add('child');

        //parent gets chid and child gets elem details
        child.innerHTML = elem.innerHTML;
        parent.appendChild(child);


        //elem replaces its value with parent span
        elem.innerHTML = " ";
        elem.appendChild(parent);
    });
}



function valueSetter() {
    gsap.set('#nav a', { y : "-100%", opacity : 0 })
    gsap.set('#home span .child', { y : "100%" })
    gsap.set('#home .row img', { opacity : 0 })


    document.querySelectorAll('#Visual path, #Visual polyline')
        .forEach(function(character){

            let length = character.getTotalLength();

            character.style.strokeDasharray = length;
            character.style.strokeDashoffset = length;
        });
}



function cycleLoaderText() {
    let words = ["Developer", "Designer", "Creator", "Innovator", "Kartikey Pandey"];
    let loaderText = document.querySelector("#loader-text");
    if(!loaderText) return;

    let index = 0;
    let cycle = setInterval(() => {
        index++;
        if(index < words.length) {
            if(index === words.length - 1) {
                loaderText.innerHTML = `<span>Kartikey</span> <span class="mazius">Pandey</span>`;
                clearInterval(cycle);
            } else {
                loaderText.textContent = words[index];
            }
        }
    }, 250);
}

function loaderAnimation(){
    let t1 = gsap.timeline();

    t1
        .from('#loader .child span', {
            x : 100,
            stagger : .2,
            duration : 1.4,
            ease: "power3.inOut"
        })
        .to(['#loader .parent .child', '#loader-text'], {
            y : "-110%",
            opacity: 0,
            duration : 1,
            delay: 0.5,
            ease: "circ.inOut"
        })

        .to('#loader', {
            height : 0,
            duration : 1,
            ease: "circ.inOut",
            delay: -0.2
        })

        .to('#green', {
            height : "100%",
            top : 0,
            duration : 1,
            delay : -.8,
            ease: "circ.inOut"
        })

        .to('#green', {
            height : "0%",
            duration : 1,
            delay : -.5,
            ease: "circ.inOut",
            onComplete : function () {
                animateHomepage();
                if (scroll) {
                    scroll.start();
                }
            }
        })
}


function animateSvg() {
        gsap.to('#Visual>g>g>path, #Visual>g>g>polyline',{
            strokeDashoffset : 0,
            duration : 2,
            ease : Expo.easeInout,
        })
}


function animateHomepage() {
    var t1 = gsap.timeline();
    
    t1
        .to('#nav a', {
            y : 0,
            opacity : 1,
            stagger : .05,
            ease : Expo.easeInOut
        })
        .to('#home .parent .child', {
            y : 0,
            stagger : .1,
            duration : 1.5,
            ease : Expo.easeInOut
        })
        .to('#home .row img', {
            opacity : 1,
            ease : Expo.easeInOut,
            delay : -.5,
            onComplete : function() {
                animateSvg();
            }
        })
}


let scroll;
function locoInitialize() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
    if (scroll) {
        scroll.stop();
        
        // Auto-update scroll height when layout changes (e.g. images load, flex wraps)
        new ResizeObserver(() => {
            scroll.update();
        }).observe(document.querySelector('#main'));
    }
}

function navLinksSetup() {
    document.querySelectorAll('#nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            let targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                let targetElem = document.querySelector(targetId);
                if (targetElem && scroll) {
                    scroll.scrollTo(targetElem);
                }
            }
        });
    });
}



function cardShow() {
    let cursor = document.querySelector("#cursor");

    document.querySelectorAll(".cnt").forEach(function(cnt){
        cnt.addEventListener("mousemove", function(dets){
            let index = cnt.dataset.index;
            let child = cursor.children[index];
            if(!child) {
                return;
            }
            child.style.opacity = 1;
            child.style.transform =
                `translate(${dets.clientX}px, ${dets.clientY}px)`;
        });

        cnt.addEventListener("mouseleave", function(dets){
            let index = cnt.dataset.index;
            let child = cursor.children[index];
            if(child) {
                child.style.opacity = 0;
            }
        });
    });
}

function initLiveTime() {
    let timeElem = document.querySelector('#live-time');
    if(!timeElem) return;

    function updateTime() {
        let now = new Date();
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short'
        };
        let formatted = now.toLocaleTimeString('en-US', options);
        timeElem.textContent = formatted;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function initCopyEmail() {
    let emailLink = document.querySelector('#copy-email');
    let copyStatus = document.querySelector('#copy-status');
    if(!emailLink || !copyStatus) return;

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        let emailToCopy = emailLink.textContent;
        
        navigator.clipboard.writeText(emailToCopy).then(() => {
            let originalText = copyStatus.textContent;
            copyStatus.textContent = 'Copied to clipboard!';
            copyStatus.style.color = '#14CF93';
            copyStatus.style.opacity = '1';
            
            setTimeout(() => {
                copyStatus.textContent = originalText;
                copyStatus.style.color = '';
                copyStatus.style.opacity = '0.5';
            }, 2000);
        });
    });
}

function initTiltEffect() {
    let cards = document.querySelectorAll('.playbook-card');
    
    cards.forEach(card => {
        let wrapper = card.querySelector('.card-img-wrapper');
        
        wrapper.addEventListener('mousemove', (e) => {
            let rect = wrapper.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            let centerX = rect.width / 2;
            let centerY = rect.height / 2;
            
            // Calculate tilt (max 15 degrees)
            let rotateX = ((y - centerY) / centerY) * -15; 
            let rotateY = ((x - centerX) / centerX) * 15;
            
            wrapper.style.transition = 'transform 0.1s ease-out';
            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transition = 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
            wrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
        
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.transition = 'transform 0.1s ease-out';
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if(!form) return;
    
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        
        const formData = new FormData(form);
        formData.append("access_key", "e84fd6ce-0935-4c45-98f4-b6fdec599dfd");

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success
                submitBtn.innerHTML = 'Sent Successfully! ✓';
                submitBtn.style.backgroundColor = '#fff';
                submitBtn.style.color = '#14CF93';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                }, 4000);
            } else {
                console.log(response);
                submitBtn.innerHTML = 'Error Sending';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                }, 3000);
            }
        })
        .catch(error => {
            console.log(error);
            submitBtn.innerHTML = 'Error Sending';
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        });
    });
}

revealToSpan();
valueSetter();
cycleLoaderText();
loaderAnimation();
locoInitialize();
cardShow();
navLinksSetup();
initLiveTime();
initCopyEmail();
initContactForm();
initTiltEffect();