const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y:'-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem", {
        y:'0',
        duration: 2,
        ease: Expo.easeInOut,
        delay:-1,
        stagger:.2
    })

    .from("#herofooter", {
        y:-10,
        opacity: 0,
        duration: 1.5,
        delay:-.1,
        ease: Expo.easeInOut
    })
}

var timeout;

function circleOval(){
    //define default scale value
    var xScale = 1;
    var yScale = 1;

    var xPrevious = 0;
    var yPrevious = 0;
    window.addEventListener("mousemove", function(details){
        clearTimeout(timeout);

        var xDiff = details.clientX - xPrevious;
        var yDiff = details.clientY - yPrevious;
        
        xScale = gsap.utils.clamp(.8,1.2, xDiff);
        yScale = gsap.utils.clamp(.8,1.2, yDiff);

        xPrevious = details.clientX;
        yPrevious = details.clientY;

        circleMouseFollower(xScale, yScale);
       timeout = setTimeout(function(){
            document.querySelector("#miniCircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
            
    });
}

function circleMouseFollower(xScale, yScale){
    window.addEventListener("mousemove", function(details){
        document.querySelector("#miniCircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale}, ${yScale})`;
    });
}


circleOval();
circleMouseFollower();
firstPageAnim();



document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diff_Rot = 0;
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity:0,
            ease: Power3,
            duration: .5

        });
    });
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diff_Rot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        
        gsap.to(elem.querySelector("img"), {
            opacity:1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, diff_Rot * .5)

        });
    });
});