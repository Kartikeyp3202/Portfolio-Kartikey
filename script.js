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

revealToSpan();

/*

gsap.to('.parent .child', {
    y : "-100%",
    duration : 1,
    delay : 1,
    ease: "circ.inOut"
})

*/


let t1 = gsap.timeline();

t1
    .from('.child span', {
        x : 100,
        delay : 1,
        stagger : .2,
        duration : 1.4,
        ease: "power3.inOut"
    })

    .to('.parent .child', {
        y : "-100%",
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
        ease: "circ.inOut"
    })