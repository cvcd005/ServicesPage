import '../scss/style.scss';
import Swiper from 'swiper/js/swiper.min.js';
/*import { brotliDecompressSync } from 'zlib';*/


/*слайдер */ 
window.onload = function() {
	
	if(window.innerWidth < 768) {//костыль для таблицы
		let tbody = document.querySelector('.prices__table-body'); 
		tbody.classList.add('swiper-wrapper');
		tbody.style.flexWrap = "nowrap";
	}

	bindSliders();
}

const bindSliders = () => {
	
	let sliderConf = {
    slidesPerView: 'auto',
    direction: 'horizontal',
  };

	if(window.innerWidth < 1024) {
		let csd = new Swiper('.nav__slider', Object.assign({}, sliderConf));
	}

	if(window.innerWidth < 768) {
    let repairsNavSlider = new Swiper('.repairs__slider', Object.assign({}, sliderConf, {
      pagination: {
        el: '.repairs__pagination',
        clickable: 'true'
      }
    }));
	
    let gadjetsNavSlider = new Swiper('.gadjets__slider', Object.assign({}, sliderConf, {
      pagination: {
        el: '.gadjets__pagination',
        clickable: 'true'
      }
    }));
		
		let pricesNavSlider = new Swiper('.prices__slider', Object.assign({}, sliderConf, {
      pagination: {
        el: '.prices__pagination',
        clickable: 'true'
      }
    }));
	}
}


/*//////////////////////////кнопки читать далее/////////////////////////*/
const addAction = (list, fn) => {
	for(let i = 0; i < list.length; i++){
		fn(list[i]);
	}
}

const changeBtnStyle = (btn, text) => {
	if(btn.classList.contains('btn-showMore')){
		btn.classList.remove('btn-showMore');
		btn.textContent='Свернуть';
		btn.classList.add('btn-showSmall');
	}
	else {
		btn.classList.remove('btn-showSmall');
		btn.textContent=text;
		btn.classList.add('btn-showMore');
	}
}

const showMoreChange = (el) => {
	let data = el.getAttribute('data-s');

	const f = (sectionName, height) => {
		let section = document.querySelector(sectionName);
		let dataz = el.getAttribute('data-z');
			if(dataz==='1'){
				section.style.height='auto';
				el.setAttribute('data-z', '0');
			} else {
				section.style.height='170px';
				el.setAttribute('data-z', '1');
			}
		changeBtnStyle(el, 'Показать все');
	}


	if(data=='services__text-wrapper'){
		el.addEventListener('click', function(){
			let section = document.querySelectorAll('.services__text-wrapper p');
				for(let i=0; i<section.length;i++){
					let hide = section[i].getAttribute('data-v');
					if(hide==='none'){
					 section[i].classList.toggle('hide');
					}
				}
			changeBtnStyle(el, 'Читать далее');
		});
	}
	if(data=='repairs__list'){
		el.addEventListener('click', function(){
			f('.brands__list')
		});
	}
	if(data=='gadjets__list'){
		el.addEventListener('click', function(){
			f('.device__list');
		});
	}
}

const showMoreList = document.querySelectorAll('.btn-showMore');
addAction(showMoreList, showMoreChange);




/*//////////////////////////////////////////////////модалки////////////////////////////////////////////*/

const overlay = document.querySelector('.overlay');

const openModal = (btn) => {
	btn.addEventListener('click', function(){
		let selectorName = btn.getAttribute('data-id');
		let zIndex = btn.getAttribute('data-z');
		let popup = document.querySelector('.'+selectorName);
		popup.style.zIndex = zIndex;
		popup.style.display = 'block';
		popup.classList.add('animation-open');
		overlay.style.display ='block';
		overlay.style.zIndex = zIndex-1;
		let container = document.querySelector('.container');
		container.style.height="100vh";
		container.style.overflow='hidden';
	});
}

const listBtnCall = document.querySelectorAll('.btn-primery--call');
const listBtnChat = document.querySelectorAll('.btn-primery--chat');
const burgerBtn = document.querySelectorAll('.btn-primery--burger');

addAction(listBtnCall, openModal);
addAction(listBtnChat, openModal);
addAction(burgerBtn, openModal);


const closeModal = (el) => {
	let modalList = document.querySelectorAll('.modal');
	let menu = document.querySelectorAll('.menu');
	let container = document.querySelector('.container');

	const fn = (el) => {
		el.style.display ='none'; 
	};
	addAction(modalList, fn);
	if(window.innerWidth < 1024) {
		addAction(menu, fn);
	}
	container.style.height="auto";
	container.style.overflow='visible';
	overlay.style.display ='none';
}

const closeList = document.querySelectorAll('.btn-primery--close');
const overlayList = document.querySelectorAll('.overlay');

addAction(closeList, (el)=>{
	el.addEventListener('click', closeModal);
});

addAction(overlayList, (el)=>{
	el.addEventListener('click', closeModal);
});

//////////////////////////////////////////////////////**********/////////////////////////////// */