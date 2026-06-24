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



function loaderAnimation(){
    let t1 = gsap.timeline();

    t1
        .from('#loader .child span', {
            x : 100,
            delay : 1,
            stagger : .2,
            duration : 1.4,
            ease: "power3.inOut"
        })

        .to('#loader .parent .child', {
            y : "-110%",
            duration : 1,
            ease: "circ.inOut"
        })

        .to('#loader', {
            height : 0,
            duration : 1,
            ease: "circ.inOut"
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


function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}



function cardShow() {
    document.querySelectorAll('.cnt')
    .forEach(function(cnt){

        cnt.addEventListener('mousemove', function(dets){

            document.querySelector('#cursor').style.opacity = 1;

            document.querySelector('#cursor').style.transform =
            `translate(${dets.clientX}px, ${dets.clientY}px)`;

        });

    });
}


revealToSpan();
valueSetter();
loaderAnimation();
locoInitialize();
cardShow();