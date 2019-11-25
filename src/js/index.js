import '../scss/style.scss';
import Swiper from 'swiper/js/swiper.min.js';


/*слайдер */ 
window.onload = function() {
	
	if(window.innerWidth < 651) {
		let tbody = document.querySelector('.prices__table-body'); 
		tbody.classList.add('swiper-wrapper');
		tbody.style.flexWrap = "nowrap";
		tbody.style.width = "98vw";
	}

	bindSliders();
}

const bindSliders = () => {
	let repairsNav = '.repairs__slider';
	let gadjetsNav = '.gadjets__slider';
	let pricesNav = '.prices__slider';

	let sliderConf = {
    slidesPerView: 'auto',
    direction: 'horizontal',
  };

	if(window.innerWidth < 651) {
    let repairsNavSlider = new Swiper(repairsNav, Object.assign({}, sliderConf, {
      pagination: {
        el: '.repairs__pagination',
        clickable: 'true'
      }
    }));
	}
  if(window.innerWidth < 651) {
    let gadjetsNavSlider = new Swiper(gadjetsNav, Object.assign({}, sliderConf, {
      pagination: {
        el: '.gadjets__pagination',
        clickable: 'true'
      }
    }));
	}
	if(window.innerWidth < 651) {
		let pricesNavSlider = new Swiper(pricesNav, Object.assign({}, sliderConf, {
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

const btnServices = document.querySelector('.btn--services');
btnServices.addEventListener('click', function(){
	openListOverflow(btnServices, '.services__text-wrapper', 'auto', '200px', 'Читать далее', 'Свернуть');
		/*костыль для текста*/
		/*let container = document.querySelector('.services__content');
		if(btnServices.classList.contains('canSmall')){
			if(window.innerWidth < 651){
				container.style.height = 'auto'; 
			} else {
				container.style.height = '500px'; 
			}
		} else if(btnServices.classList.contains('canBig')){
			container.style.height = '270px';
		};*/
		/*openListOverflow(btnServices, '.text-wrapper', 'auto', '200px', 'Читать далее', 'Свернуть');
*/
});

const btnRepairs = document.querySelector('.btn-repairs');
btnRepairs.addEventListener('click', function(){
	openListOverflow(btnRepairs, '.repairs__list', 'auto', '170px', 'Показать все', 'Свернуть');
});

const btnGadjets = document.querySelector('.btn-gadjets');
btnGadjets.addEventListener('click', function(){
	openListOverflow(btnGadjets, '.gadjets__list', 'auto', '170px', 'Показать все', 'Свернуть')
});


/*//////////////////////////////////////////////////модалки////////////////////////////////////////////*/
/*элемент для модалок*/
const overlay = document.querySelector('.overlay');

/*открыть бургер меню*/
const burgerBtn = document.querySelector('.btn--burger');
burgerBtn.addEventListener('click', function(){
	let popup = document.querySelector('.menu');
	popup.classList.remove('menu_visibility');
	popup.style.zIndex='2';
	overlay.classList.remove('hide');
});
/*Закрыть бургер меню*/
const closeBtn = document.querySelector('.btn--close-burger');
closeBtn.addEventListener('click', function(){
	let popup = document.querySelector('.menu');
	popup.classList.add('menu_visibility');
	popup.style.zIndex='0';
	overlay.classList.add('hide');
});


/*кнопки заказать звонок*/
const listBtnCall = document.querySelectorAll('.btn--call');
const listBtnChat = document.querySelectorAll('.btn--chat');

const findAllButton = (list, selectorName) => {
	for(let i=0,l=list.length;i<l;i++){
		list[i].addEventListener('click', function(){
		let popup = document.querySelector(selectorName);
		popup.classList.remove('hide');
		overlay.classList.remove('hide');
		overlay.style.zIndex='2';
		})
	};
};

findAllButton(listBtnCall, '.modal-phone');
findAllButton(listBtnChat, '.modal-write');


/*закрытие модалки звонок и письмо*/
const closeBtnList = document.querySelectorAll('.btn--close-form');
for(let i=0,l=closeBtnList.length;i<l;i++){
	closeBtnList[i].addEventListener('click', function(){
		let popupPhone = document.querySelector('.modal-phone');
		let popup = document.querySelector('.modal-write');
		popupPhone.classList.add('hide');
		popup.classList.add('hide');
		overlay.classList.add('hide');
		overlay.style.zIndex='1';
	})
};



