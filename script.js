'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const nav = document.querySelector('.nav');
// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;
const hamburger = document.querySelector('[data-nav-hamburguer]');
const navLinksWrapper = document.querySelector('[data-nav-links]');
const footer = document.querySelector('.footer');
const windowWidth = window.innerWidth;
const mobileBreakpoint = 767;
const tabletBreakpoint = 768;

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn
                            .addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Mobile Menu
hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle('active');
  navLinksWrapper.classList.toggle('active');
}

console.log(mobileMenu());





///////////////////////////////////////
 
          // IMPLEMENTING SMOOTH SCROLLING//
          const btnScrollTo = document.querySelector('.btn--scroll-to');
          const section1 = document.querySelector('#section--1');
          
          btnScrollTo.addEventListener('click' , function(e){
            const s1coords  = section1.getBoundingClientRect();
           

               // Mordan way
               section1.scrollIntoView({behavior:"smooth"});
              });

            
              // console.log(s1coords);

            // console.log(e.target.getBoundingClientRect());
            // console.log('current scroll (X / Y)' , window.pageXOffset , pageYOffset);

            // console.log('height / width viewport' ,
            //   document.documentElement.clientHeight,
            //   document.documentElement.clientWidth
            // );

            // scrolling //
            
            // window.scrollTo(
            //     s1coords.left + window.pageXOffset 
            //   , s1coords.top + window.pageYOffset);

            // window.scrollTo({     
            //   left: s1coords.left + window.pageXOffset, 
            //   top: s1coords.top + window.pageYOffset,
            //   behavior: 'smooth'}
            // )

         
///////////////////////////////////////
        
        // Page Navigation //

        


        // document.querySelectorAll('.nav__link').forEach
        // (function(el){
        //   el.addEventListener('click',function(e){
        //     e.preventDefault();
        //     const id = this.getAttribute('href')
        //     console.log(id);
        //     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
        //   },true);
        // })

        // Necessary to many element better solve //

        // 1. Add event Listener to common parent element 
        // 2. Determine what element originated the event

        document.querySelector('.nav__links').addEventListener
        ('click' ,function(e){
          e.preventDefault();

          //Matching Strategy
          
          if(e.target.classList.contains('nav__link')){
            const id = e.target.getAttribute('href');
            console.log(id);
            document.querySelector(id).scrollIntoView({behavior: 'smooth'});
          }
  
        });

        // document.querySelector('.nav__links').addEventListener


///////////////////////////////////////

// Tabbed Component
const tabs  = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


tabsContainer.addEventListener('click' , function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Ignore any tab in section 
  // Guard clause
  if(!clicked) return; 

  console.log(clicked.dataset.tab);
  
  // Remove Active classes before clicked
  tabs.forEach(t => t.classList.remove('operations__tab--active'));  
  clicked.classList.add("operations__tab--active");
  
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  // Active tabs
  // Active Content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
                          .classList.add('operations__content--active');

});


// tabs.forEach(t => 
//   t.addEventListener('click' , () =>
// console.log("tab")
// ));


///////////////////////////////////////

    // Menu fade Animation

    // Refactoring this code means create function
      const handleHover = function(e){
        

        if(e.target.classList.contains('nav__link')){
          const link = e.target;
          const siblings = link.closest('.nav').querySelectorAll('.nav__link');
          const logo = link.closest('.nav').querySelector('img');
  
          siblings.forEach(el => {
            if(el !== link) el.style.opacity = this;
          });
          logo.style.opacity = this;
        }
      }

   
      // Menu fade Animation

      //passing 'argument' into Handler

  const nav =  document.querySelector('.nav');
   
  nav.addEventListener('mouseover',handleHover.bind(0.5));
 
   nav.addEventListener('mouseout',handleHover.bind(1));
  
  
  // nav.addEventListener('mouseover',function(e){
  //  handleHover(e, 0.5);
  // });

  // nav.addEventListener('mouseout',function(e){
  //  handleHover(e, 1);
  // });

///////////////////////////////////////

      // Sticky Navigation //

      // const ini =  section1.getBoundingClientRect();
      // console.log(ini);

      // window.addEventListener('scroll',function(){
      //   console.log(window.scrollY);

      //   if(window.scrollY > ini.top) {
      //     nav.classList.add('sticky');
      //   }
      //   else{
      //     nav.classList.remove('sticky');
      //   }

      // })

      // // Intersection Observer API // //

      /*
      const callback = (entries , observer) => {
          entries.forEach(entry => {
            console.log(entry);
          });
      };

      const option = {
        root: null,
        threshold : [0 ,0.2]
      }

      const observer = new IntersectionObserver(callback , option);

      observer.observe(section1);*/




      const header = document.querySelector('.header');
      const navHeight = nav.getBoundingClientRect().height;
      

      const stickyNav = (entries) => {
        const [entry] = entries;

        if(!entry.isIntersecting) nav.classList.add('sticky');

        else nav.classList.remove('sticky');

      }

      const headerObserver = new IntersectionObserver(stickyNav , {
        root : null,
        rootMargin: `-${navHeight}px`,
        threshold: 0.15
      });

      headerObserver.observe(header);

      


///////////////////////////////////////

      // Reveal Section // 

      const allSection  = document.querySelectorAll('.section');

      const revealSection = (entries,observer) => {
        const [entry] = entries;
        // console.log(entry);

        if(!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
      };

      const sectionObserver = new IntersectionObserver(revealSection , 
        {
          root: null,
          threshold: 0.1
        });

        allSection.forEach(function(section) {
          sectionObserver.observe(section);
          section.classList.add('section--hidden');
        })



///////////////////////////////////////

      // Lazy Loading Images//
      
        const imgTarget = document.querySelectorAll('img[data-src]');
        console.log(imgTarget);

        const loadImg = function(entries , observer){
          const [entry] = entries;
          console.log(entry);

          if(!entry.isIntersecting) return;

          // Replace src with Data-SRC 
          entry.target.src = entry.target.dataset.src;
          console.log(entry.target.src);
          entry.target.classList.remove('lazy-img');

          
        }

        const imgObserver = new IntersectionObserver(loadImg , {
          root: null,
          rootMargin: "200px" , 
          threshold: 0,
        }); 
      
        imgTarget.forEach(img => imgObserver.observe(img));


///////////////////////////////////////
          
            // Slider //
            const slider = function(){
              
            const slides = document.querySelectorAll('.slide');
            const btnLeft = document.querySelector('.slider__btn--left');
            const btnRight = document.querySelector('.slider__btn--right');

            let curSlide = 0;
            const maxSlider = slides.length; 

            // const slider = document.querySelector('.slider')
            // slider.style.transform = "scale(0.4) translateX(-800px)";
            // slider.style.overflow = "visible";

            
               // Dots execute Event //

               const dotContainer = document.querySelector(".dots");

                 // Create Dot Function

               const createDots = function(){
                slides.forEach((_ , i) =>{
                  dotContainer.insertAdjacentHTML('beforeend' , 
                  `<button class="dots__dot" data-slide = "${i}"></button>`)
                } );
               };

                  
                // Active Dots //
                const activateDot = function (slide) {
                  document
                    .querySelectorAll('.dots__dot')
                    .forEach(dot => dot.classList.remove('dots__dot--active'));
              
                  document
                    .querySelector(`.dots__dot[data-slide="${slide}"]`)
                    .classList.add('dots__dot--active');
                };

             
            // Go to slide
            const goToSlide = function(slide){
                slides.forEach((s , i) => s.style.transform =`translateX(${100 * 
                  (i - slide)}%)`);
              }

              

            //Next Slide Right Direction 
              const nextSlide = function(){
                if(curSlide === maxSlider - 1){
                  curSlide = 0;
                }
                else{
                  curSlide++;
                }
                goToSlide(curSlide);
                activateDot(curSlide);
              }

                 //Previous Slide left Direction
                 const prevSlide = function(){
                  if(curSlide === 0){
                    curSlide = maxSlider - 1;
                  }
                  else{
                    curSlide--;
                  }
                  
                  goToSlide(curSlide);
                  activateDot(curSlide);
                 }

                 // Initiation

                 const init = function(){
                  
                  goToSlide(0);
                  createDots();
                  activateDot(0);

                
                 };

                 init();

              // Event Next and Previous
              // Event Handler

            btnRight.addEventListener('click' , nextSlide);
            btnLeft.addEventListener('click' , prevSlide);
               // curSlide - 1 = -100% 0% 100% 200%

               document.addEventListener('keydown' ,function(e){
                console.log(e);
                if(e.key === 'ArrowLeft') prevSlide();
                e.key === 'ArrowRight' && nextSlide();
                // if(e.key === 'ArrowRight') nextSlide();
               });

               // Dots execute Event //

               dotContainer.addEventListener('click' , function(e){
                if(e.target.classList.contains('dots__dot')){
                  console.log('dots');
                  const { slide } = e.target.dataset;
                  goToSlide(slide);
                  activateDot(slide);
                }
               });
              };

               slider();

///////////////////////////////////////
///////////////////////////////////////

    // Document //
    // Selecting , Creating , and Deleting Elements //
   /* 
    console.log(document.documentElement);
    console.log(document.head);
    console.log(document.body);

    const head =  document.querySelector('.header');
    const allSection =  document.querySelectorAll('.section');
    console.log(head);
    console.log(allSection);

   const retId =  document.getElementById('section--1');
   const  allButton =  document.getElementsByTagName('button');

   console.log(retId );
   console.log(allButton);

   console.log(document.getElementsByClassName('btn'));


   // Creating and Inserting Element

   // .insertAdjacentHTML

   const message =  document.createElement('div');
   message.classList.add('cookie-message');
  //  message.textContent = "we use cookie for improved";
   message.innerHTML = `we use cookie for improved 
                      <button class = "btn btn--close-cookie">Got it!`;
  //  head.prepend(message);
   head.append(message);
  // head.append(message.cloneNode(true));

  // head.before(message);
  head.after(message);

  //delete element
  document.querySelector('.btn--close-cookie')
  .addEventListener('click' , function(){
    // message.remove();
    message.parentElement.removeChild(message);
  });

        // CSS STYLING  //

        message.style.backgroundColor = '#37383d';
        message.style.width = '121%';

        document.documentElement.style.setProperty('--color-primary' , 'orangered');

        // ATTRIBUTE  //

        const logo = document.querySelector('.nav__logo');
        console.log(logo.alt);
        console.log(logo.src);

        logo.setAttribute('company' , 'bankList');

        console.log(logo.getAttribute('company'));

        // Classes //
        logo.classList.add('c','j');
        logo.classList.remove('c','j');
        logo.classList.toggle('c','j');
        logo.classList.contains('c','j');
        */


///////////////////////////////////////

     /// Event ///
     
    //  const h1 = document.querySelector('h1');

    //  const alertH1 = function(e){
    //   alert('Great! you are reding the heading');

    //   h1.removeEventListener('mouseenter',alertH1);
    //  };

    //  h1.addEventListener('mouseenter' , alertH1);

    //  const nav = document.querySelector('nav');
    //  nav.addEventListener('mouseenter' , function(e){
    //   alert('this is navigation bar');
    //  })

    
    // Property  //

    // h1.onmouseenter =  function(e){
    //     alert('Great! you are reding the heading')
    //    };

 
///////////////////////////////////////

     /// Event Propagation ///

     //rgb(255 ,255 ,255)
/*
     const randInt = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;
     const randomColor = () => `rgb(${randInt(0,255)} ,${randInt(0,255)} ,${randInt(0,255)})` 
                console.log(randomColor(0,255));

                document.querySelector('.nav__link').addEventListener
                ("click" ,function(e){
                  // console.log(this);
                  this.style.backgroundColor = randomColor();
                  console.log("LINK" , e.target , e.currentTarget);
                  console.log(e.currentTarget === this);

                  //stop Propagation 
                  // e.stopPropagation();

                },true);

                
                document.querySelector('.nav__links').addEventListener
                ("click" ,function(e){
                  this.style.backgroundColor = randomColor();
                  console.log("CONTAINER" , e.target , e.currentTarget);
                },true);

                
                document.querySelector('.nav').addEventListener
                ("click" ,function(e){
                  this.style.backgroundColor = randomColor();
                  console.log("NAV" , e.target , e.currentTarget);
                },true);*/


                 
///////////////////////////////////////

     /// DOM Traversing  ///
/*
     const h1 = document.querySelector('h1');

     // Going downward : child
     console.log(h1.querySelectorAll('.highlight'));
     console.log(h1.childNodes);
     console.log(h1.children);
     h1.firstElementChild.style.color = 'white';
     h1.lastElementChild.style.color = 'red';

     // Going Upward : parent
     console.log(h1.parentNode);
     console.log(h1.parentElement);
     
     h1.closest('.header').style.background = 'var(--gradient-secondary)';
     h1.closest('h1').style.background = 'var(--color-secondary)';

     // Going Sideways : Sibling 
     console.log(h1.previousElementSibling);
     console.log(h1.nextElementSibling);

     console.log(h1.previousSibling);
     console.log(h1.nextSibling);

     console.log(h1.parentElement.children);

     // fun way here except h1 other apply style
     [...h1.parentElement.children].forEach(function(el){
      if(el !== h1)el.style.transform = 'scale(0.5)';
     })
     */

     document.addEventListener('DOMContentLoaded' , function(e) {
      console.log('HTML Parsed and DOM Tree Built' ,e);
     })

    window.addEventListener('load' ,function(e){
      console.log("page Fully LOad" ,e);
    });

    // window.addEventListener('beforeunload' , function(e){
    //   e.preventDefault();
    //   console.log(e);
    //   e.returnValue = '';
    // });