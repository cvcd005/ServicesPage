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
const changeButtonStyle = (btn, btnRemove, btnAdd, spanText, divRemove, divAdd) => {
		btn.classList.remove(btnRemove);
		btn.classList.add(btnAdd);
		let span = btn.querySelector('span');
		span.textContent=spanText;
		let div = btn.querySelector('div');
		div.classList.remove(divRemove);
		div.classList.add(divAdd);
}

const openListOverflow = (btn, listName, sizeBig, sizeSmall, spanBegin, spanEnd) => {
	let list = document.querySelector(listName);
	if(btn.classList.contains('canBig')){
		list.style.overflow = 'visible';
		list.style.height = sizeBig;  
		changeButtonStyle(btn, 'canBig', 'canSmall', spanEnd,  'moreRead-icon', 'smallRead-icon');
	} else if(btn.classList.contains('canSmall')){
		list.style.overflow = 'hidden';
		list.style.height = sizeSmall;  
		changeButtonStyle(btn, 'canSmall', 'canBig', spanBegin, 'smallRead-icon', 'moreRead-icon');
	}
}

/*const btnRepairs = document.querySelector('.btn-repairs');
btnRepairs.addEventListener('click', function(){
	openListOverflow(btnRepairs, '.repairs__list', 'auto', '170px', 'Показать все', 'Свернуть');
});
*/
const btnGadjets = document.querySelector('.btn-gadjets');
btnGadjets.addEventListener('click', function(){
	openListOverflow(btnGadjets, '.gadjets__list', 'auto', '170px', 'Показать все', 'Свернуть')
});


const btnMoreText = document.querySelector('.btn-moreText');
btnMoreText.addEventListener('click', function(){
		let section = document.querySelectorAll('.services__text-wrapper p');
		for(let i=0; i<section.length;i++){
			let hide = section[i].getAttribute('data-v');
			if(hide==='none'){
			 section[i].classList.toggle('hide');
			}
		}
});


/*//////////////////////////////////////////////////модалки////////////////////////////////////////////*/
/*элемент для модалок*/
const overlay = document.querySelector('.overlay');

/*открыть бургер меню*/
const burgerBtn = document.querySelector('.btn-primery--burger');
burgerBtn.addEventListener('click', function(){
	let popup = document.querySelector('.menu');
	popup.style.display='block';
	popup.style.zIndex='2';
	overlay.classList.remove('hide');
});
/*Закрыть бургер меню*/
const closeBtn = document.querySelector('.btn--close-burger');
closeBtn.addEventListener('click', function(){
	let popup = document.querySelector('.menu');
	popup.style.zIndex='0';
	popup.style.display='none';
	overlay.classList.add('hide');
});


/*кнопки заказать звонок*/
const listBtnCall = document.querySelectorAll('.btn-primery--call');
const listBtnChat = document.querySelectorAll('.btn-primery--chat');

const findAllButton = (list, selectorName) => {
	for(let i=0,l=list.length;i<l;i++){
		list[i].addEventListener('click', function(){
		let popup = document.querySelector(selectorName);
		popup.classList.remove('hide');
		overlay.classList.remove('hide');
		overlay.style.zIndex='3';
		/*блокируем body для модалок*/
		let container = document.querySelector('.container');
		container.style.height="100vh";
		container.style.overflow='hidden';
		})
	};
};

findAllButton(listBtnCall, '.modal-phone');
findAllButton(listBtnChat, '.modal-write');


/*закрытие модалки звонок и письмо*/
const closeBtnList = document.querySelectorAll('.btn-primery--close-form');
for(let i=0,l=closeBtnList.length;i<l;i++){
	closeBtnList[i].addEventListener('click', function(){
		let popupPhone = document.querySelector('.modal-phone');
		let popup = document.querySelector('.modal-write');
		popupPhone.classList.add('hide');
		popup.classList.add('hide');
		overlay.classList.add('hide');
		overlay.style.zIndex='1';
		let container = document.querySelector('.container');
	/////////////////изменить параметр при смене способа раскладки
		container.style.height="2600px";
		container.style.overflow='visible';
	})
};



