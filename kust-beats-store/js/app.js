var ua = window.navigator.userAgent
var msie = ua.indexOf('MSIE ')
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}
function isIE() {
  ua = navigator.userAgent
  var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1
  return is_ie
}
if (isIE()) {
  document.querySelector('html').classList.add('ie')
}
if (isMobile.any()) {
  document.querySelector('html').classList.add('_touch')
}

function testWebP(callback) {
  var webP = new Image()
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2)
  }
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector('html').classList.add('_webp')
  } else {
    document.querySelector('html').classList.add('_no-webp')
  }
})

function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll('._ibg')
    for (var i = 0; i < ibg.length; i++) {
      if (
        ibg[i].querySelector('img') &&
        ibg[i].querySelector('img').getAttribute('src') != null
      ) {
        ibg[i].style.backgroundImage =
          'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
      }
    }
  }
}
ibg()

window.addEventListener('load', function () {
  if (document.querySelector('.wrapper')) {
    setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded')
    }, 0)
  }
})

let unlock = true

//=================
//ActionsOnHash
if (location.hash) {
  const hsh = location.hash.replace('#', '')
  if (document.querySelector('.popup_' + hsh)) {
    popup_open(hsh)
  } else if (document.querySelector('div.' + hsh)) {
    _goto(document.querySelector('.' + hsh), 500, '')
  }
}
//=================
//RemoveClasses
function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name)
  }
}
//Menu
let iconMenu = document.querySelector('.icon-menu')
if (iconMenu != null) {
  let delay = 500
  let menuBody = document.querySelector('.menu__body')
  iconMenu.addEventListener('click', function (e) {
    if (unlock) {
      body_lock(delay)
      iconMenu.classList.toggle('_active')
      menuBody.classList.toggle('_active')
    }
  })
}
function menu_close() {
  let iconMenu = document.querySelector('.icon-menu')
  let menuBody = document.querySelector('.menu__body')
  iconMenu.classList.remove('_active')
  menuBody.classList.remove('_active')
}
//=================
//BodyLock
function body_lock(delay) {
  let body = document.querySelector('body')
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay)
  } else {
    body_lock_add(delay)
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector('body')
  if (unlock) {
    let lock_padding = document.querySelectorAll('._lp')
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index]
        el.style.paddingRight = '0px'
      }
      body.style.paddingRight = '0px'
      body.classList.remove('_lock')
    }, delay)

    unlock = false
    setTimeout(function () {
      unlock = true
    }, delay)
  }
}
function body_lock_add(delay) {
  let body = document.querySelector('body')
  if (unlock) {
    let lock_padding = document.querySelectorAll('._lp')
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index]
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px'
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    body.classList.add('_lock')

    unlock = false
    setTimeout(function () {
      unlock = true
    }, delay)
  }
}
//////////////////////////////////////////
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}
//========================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]')
if (spollersArray.length > 0) {
  // Получение обычных слойлеров
  const spollersRegular = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(',')[0]
  })
  // Инициализация обычных слойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular)
  }

  // Получение слойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return item.dataset.spollers.split(',')[0]
  })

  // Инициализация слойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = []
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      )
    })
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index
    })

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',')
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia)
      })
      initSpollers(spollersArray, matchMedia)
    })
  }
  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init')
        initSpollerBody(spollersBlock)
        spollersBlock.addEventListener('click', setSpollerAction)
      } else {
        spollersBlock.classList.remove('_init')
        initSpollerBody(spollersBlock, false)
        spollersBlock.removeEventListener('click', setSpollerAction)
      }
    })
  }
  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex')
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1')
          spollerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }
  function setSpollerAction(e) {
    const el = e.target
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller')
        ? el
        : el.closest('[data-spoller]')
      const spollersBlock = spollerTitle.closest('[data-spollers]')
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
        ? true
        : false
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock)
        }
        spollerTitle.classList.toggle('_active')
        _slideToggle(spollerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      '[data-spoller]._active'
    )
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active')
      _slideUp(spollerActiveTitle.nextElementSibling, 500)
    }
  }
}

//=================
//Popups
const popupsFunctions = () => {
  let popup_link = document.querySelectorAll('._popup-link')
  let popups = document.querySelectorAll('.popup')
  let elId
  for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index]

    el.addEventListener('click', function (e) {
      if (unlock) {
        let item = el.getAttribute('href').replace('#', '')
        /*if (item == 'popup-share') {
          let popupShare = document.querySelector(`.popup_${item}`)
          elId = el.id
          popupShare.setAttribute('id', elId)
          let shareIcons = document.querySelector('.ya-share2')
          console.log(shareIcons.closest('.popup').id)
          shareIcons.setAttribute('data-title', shareIcons.closest('.popup').id)
        }
*/
        popup_open(item)
      }
      e.preventDefault()
    })
  }

  for (let index = 0; index < popups.length; index++) {
    const popup = popups[index]
    popup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popup_close(e.target.closest('.popup'))
      }
    })
  }
  function popup_open(item) {
    let activePopup = document.querySelectorAll('.popup._active')
    let curent_popup = document.querySelector('.popup_' + item)
    if (activePopup.length > 0) {
      popup_close(curent_popup, false)
    }

    if (curent_popup && unlock) {
      if (!document.querySelector('.menu__body._active')) {
        body_lock_add(500)
      }
      curent_popup.classList.add('_active')

      history.pushState('', '', '#' + item)
    }
  }
  function popup_close(item, bodyUnlock = true) {
    if (unlock) {
      if (!item) {
        for (let index = 0; index < popups.length; index++) {
          const popup = popups[index]

          popup.classList.remove('_active')
        }
      } else {
        item.classList.remove('_active')
      }
      if (!document.querySelector('.menu__body._active') && bodyUnlock) {
        body_lock_remove(500)
      }
      history.pushState('', '', window.location.href.split('#')[0])
      let licenseList = document.querySelectorAll('.license_list')
      let arrows = document.querySelectorAll('.popup ._icon-arrow-down')

      licenseList.forEach((elem) => {
        elem.classList.add('hide')
      })
      arrows.forEach((arrow) => {
        arrow.classList.remove('upend')
      })
    }
  }
  let popup_close_icon = document.querySelectorAll(
    '.popup__close,._popup-close'
  )
  if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
      const el = popup_close_icon[index]
      el.addEventListener('click', function () {
        popup_close(el.closest('.popup'))
      })
    }
  }
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      popup_close()
    }
  })
}

//Regular
function email_test(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			popup_open(message + '-message');
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}

//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div hidden class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass" && !input.parentElement.querySelector('.form__viewpass').classList.contains('_active')) {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//RANGE
const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {

	let textFrom = priceSlider.getAttribute('data-from');
	let textTo = priceSlider.getAttribute('data-to');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	/*
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	*/

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			/*
			if ((src_value > block_offset - block_height) && src_value < (block_offset + block_height) && window.innerHeight > scr_min_height && window.innerWidth > 992) {
				let scrProcent = (src_value - block_offset) / block_height * 100;
				scrParallax(block, scrProcent, block_height);
			}
			*/

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}
	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}
function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}
function scrParallax(block, scrProcent, blockHeight) {
	let prlxItems = block.querySelectorAll('._prlx-item');
	if (prlxItems.length > 0) {
		for (let index = 0; index < prlxItems.length; index++) {
			const prlxItem = prlxItems[index];
			let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3;
			const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr);
			prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`;
		}
	}
}
//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);

	let swiperScrolls = document.querySelectorAll('._swiper_scroll');

	if (swiperScrolls.length > 0) {
		for (let index = 0; index < swiperScrolls.length; index++) {
			const swiperScroll = swiperScrolls[index];
			swiperScroll.addEventListener("mouseenter", function (e) {
				window.removeEventListener('wheel', full_scroll);
			});
			swiperScroll.addEventListener("mouseleave", function (e) {
				window.addEventListener('wheel', full_scroll);
			});
		}
	}
}
function getPrevBlockPos(current_block_prev) {
	let viewport_height = window.innerHeight;
	let current_block_prev_height = current_block_prev.offsetHeight;
	let block_pos = offset(current_block_prev).top;

	if (current_block_prev_height >= viewport_height) {
		block_pos = block_pos + (current_block_prev_height - viewport_height);
	}
	return block_pos;
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_prev) {
						full_scroll_to_sector(getPrevBlockPos(current_block_prev));
					}
				} else {
					enableScroll();
					if (currentScroll <= current_block_pos) {
						if (current_block_prev) {
							full_scroll_to_sector(getPrevBlockPos(current_block_prev));
						}
					}
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						full_scroll_to_sector(block_pos);
					}
				} else {
					enableScroll();
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						if (currentScroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

// Load tracks from json file

const playlist = document.querySelector('.playlist_tracks')
const wrapper = document.querySelector('.playlist_tracks .playlist-wrapper')

let trackList = []

const displayTracks = (tracks) => {
  const htmlString = tracks
    .map((track) => {
      return `<div class="playlist_track track" id="${track.id}">
                  <div class="track_cover">
                    <img class="track_image" src='${track.image}'/>
                    <audio id='audio-${track.id}' src='${track.audio}'></audio>
                  </div>
                  <div class="track_name">
                    <p>${track.name}</p>
                    
                  </div>
                  <div class="track_time"><p>${track.time}</p></div>
                  
                  <div class="track_tags">
                  ${track.tags
                    .map((tag) => {
                      return `
                    <div class="track_tags-tag">#${tag}</div>
                    `
                    })
                    .join('')}
                  </div>
                  

                  <div class="track_buttons">
                
                  <a href="#popup-share" class="track_share _icon-share _popup-link" id="${
                    track.id
                  }">
                 
                  <a href="#popup-cart" class="btn choose-license _popup-link" id="${
                    track.id
                  }">Choose license</a>
                  <a href="#" class="btn cart-btn buy-btn _icon-cart" id="${
                    track.id
                  }">Buy</a>
                  </div>
                  <a href="#popup-player" class="player-dots _popup-link"></a>
                </div> `
    })
    .join('')
  wrapper.innerHTML = htmlString

  const mediaQueryShow = window.matchMedia('(max-width: 768px)')
  function showSlider(e) {
    let tracks = document.querySelectorAll('.track')
    if (e.matches) {
      playlist.classList.add('swiper')
      wrapper.classList.add('swiper-wrapper')
      tracks.forEach((track) => {
        track.classList.add('swiper-slide')
      })
    }
  }
  mediaQueryShow.addListener(showSlider)
  showSlider(mediaQueryShow)

  const mediaQueryHide = window.matchMedia('(min-width: 769px)')
  function hideSlider(e) {
    let tracks = document.querySelectorAll('.track')
    if (e.matches) {
      playlist.classList.remove('swiper')
      wrapper.classList.remove('swiper-wrapper')
      tracks.forEach((track) => {
        track.classList.remove('swiper-slide')
      })
    }
  }
  mediaQueryHide.addListener(hideSlider)
  hideSlider(mediaQueryHide)
}

const playerFunctions = () => {
  let playButtons = document.querySelectorAll('.track_cover')

  playButtons.forEach((playButton) => {
    playButton.addEventListener('click', () => {
      let track = playButton.querySelector('audio')
      let wave = new Wave()

      wave.fromElement(track.id, 'output', {
        type: 'flower',
        colors: ['White'],
        stroke: 4,
      })
      let currentTrack = document.querySelector('.playing')

      if (track.classList.contains('playing')) {
        track.pause()
        track.classList.remove('playing')
      } else {
        if (currentTrack !== null) {
          currentTrack.pause()
          currentTrack.classList.remove('playing')
        }
        track.play()
        track.classList.add('playing')
      }
    })
  })

  const audios = document.querySelectorAll('audio')

  const audioPlayer = document.querySelector('.audio-player')

  const timeline = audioPlayer.querySelector('.timeline')

  audios.forEach((track) => {
    track.addEventListener('play', () => {
      audioPlayer.querySelector('.time .length').textContent =
        getTimeCodeFromNum(track.duration)

      setInterval(() => {
        if (track.classList.contains('playing')) {
          const progressBar = audioPlayer.querySelector('.progress')

          progressBar.style.width =
            (track.currentTime / track.duration) * 100 + '%'

          audioPlayer.querySelector('.time .current').textContent =
            getTimeCodeFromNum(track.currentTime)
        }
      }, 500)
    })

    timeline.addEventListener(
      'click',
      (e) => {
        const timelineWidth = window.getComputedStyle(timeline).width

        const timeToSeek =
          (e.offsetX / parseInt(timelineWidth)) * track.duration

        track.currentTime = timeToSeek
      },
      false
    )
  })
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num)
    let minutes = parseInt(seconds / 60)
    seconds -= minutes * 60
    const hours = parseInt(minutes / 60)
    minutes -= hours * 60

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`
  }
}
const updatePlayerSlider = () => {
  const player_swiper = new Swiper('.playlist_tracks.swiper', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
      nextEl: '.playlist_tracks .swiper-button-next',
      prevEl: '.playlist_tracks .swiper-button-prev',
    },
  })
}
const loadTracks = async () => {
  try {
    const res = await fetch('json/tracks.json')
    trackList = await res.json()
    displayTracks(trackList)

    playerFunctions()

    popupsFunctions()

    //Filter

    const searchBar = document.querySelector('.search-form__input')
    searchBar.addEventListener('keyup', (e) => {
      document.querySelectorAll('section').forEach((section) => {
        if ((section.style.display = 'none')) {
          section.style.display = ''
        }
      })
      const searchString = e.target.value.toLowerCase()

      const filteredTracks = trackList.filter((track) => {
        return (
          track.tags
            .toString()
            .toLowerCase()

            .includes(searchString) ||
          track.name
            .toString()
            .toLowerCase()

            .includes(searchString)
        )
      })
      let allTracks = document.querySelectorAll('.track')
      allTracks.forEach((track) => {
        track.classList.remove('hide')

        updatePlayerSlider()
      })

      let hideTracks = []
      let showTracks = []
      if (searchString.length > 1) {
        trackList.forEach((track) => {
          filteredTracks.forEach((filteredTrack) => {
            if (track !== filteredTrack) {
              hideTracks.push(
                document.getElementById(track.id).closest('.track')
              )
              hideTracks.forEach((hideTrack) => {
                if (!hideTrack.classList.contains('hide')) {
                  hideTrack.classList.add('hide')
                }
              })
            } else {
              showTracks.push(
                document.getElementById(track.id).closest('.track')
              )
              showTracks.forEach((showTrack) => {
                if (showTrack.classList.contains('hide')) {
                  showTrack.classList.remove('hide')
                }
              })
            }
            updatePlayerSlider()
          })
        })
      }
    })

    //
  } catch (err) {
    console.error(err)
  }
}
loadTracks()

//.................................................
//Popup => Show usage terms
let showTerms = document.querySelectorAll('.show_terms')
showTerms.forEach((button) => {
  button.addEventListener('click', () => {
    let licenseList = button
      .closest('.license_type-body')
      .querySelector('.license_list')
    licenseList.classList.toggle('hide')

    let arrow = button
      .closest('.license_type-body')
      .querySelector('._icon-arrow-down')

    arrow.classList.toggle('upend')
  })
})
window.onload = function () {
  document.addEventListener('click', documentActions)

  // Actions (делегирование события click)
  function documentActions(e) {
    const targetElement = e.target
    if (window.innerWidth > 768 && isMobile.any()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover')
      }
      if (
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        _removeClasses(
          document.querySelectorAll('.menu__item._hover'),
          '_hover'
        )
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active')
    } else if (
      !targetElement.closest('.search-form') &&
      document.querySelector('.search-form._active')
    ) {
      document.querySelector('.search-form').classList.remove('_active')
    }

    if (
      targetElement.classList.contains('cart-header__icon') ||
      targetElement.closest('.cart-header__icon')
    ) {
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active')
      }
      e.preventDefault()
    } else if (
      !targetElement.closest('.cart-header') &&
      !targetElement.classList.contains('cart-btn')
    ) {
      document.querySelector('.cart-header').classList.remove('_active')
    }
  }
  //

  const mediaQueryShow = window.matchMedia('(max-width: 768px)')
  function showSlider(e) {
    let tracks = document.querySelectorAll('.track')
    if (e.matches) {
      updatePlayerSlider()
      playlist.classList.add('swiper')
      wrapper.classList.add('swiper-wrapper')

      tracks.forEach((track) => {
        track.classList.add('swiper-slide')
      })
      const searchBar = document.querySelector('.search-form__input')
    }
  }
  mediaQueryShow.addListener(showSlider)
  showSlider(mediaQueryShow)

  const mediaQueryHide = window.matchMedia('(min-width: 769px)')
  function hideSlider(e) {
    let tracks = document.querySelectorAll('.track')
    if (e.matches) {
      tracks.forEach((track) => {
        track.style.width = '100%'
      })
    }
  }
  mediaQueryHide.addListener(hideSlider)
  hideSlider(mediaQueryHide)

  //Add to cart
  const licenseButtons = document.querySelectorAll('.to-info')
  const findBeat = document.querySelectorAll('.find-beat')
  const cartList = document.querySelector('.cart-review_list')
  const cartHeader = document.querySelector('.cart-header__body')

  const buyButtons = document.querySelectorAll('.buy-btn')
  const cartQuantity = document.querySelector('.cart-header__icon span')
  const totalAmount = document.querySelector('.header .total-amount span')
  const chooseLicense = document.querySelectorAll('.choose-license')

  chooseLicense.forEach((btn) => {
    btn.addEventListener('click', () => {
      let activePopup = document.querySelector('.popup._active')

      let popupButtons = activePopup.querySelectorAll('.cart-btn')
      popupButtons.forEach((popupButton) => {
        popupButton.setAttribute('id', btn.id)
        popupButton.addEventListener('click', () => {
          if (
            popupButton.id == btn.id &&
            popupButton.textContent !== 'MAKE AN OFFER'
          ) {
            btn.textContent = popupButton.textContent
          }
          activePopup.classList.remove('_active')
          body_lock_remove(500)
        })
      })
    })
  })
  findBeat.forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('section:not(.page__cart)')
        .forEach((section) => {
          if ((section.style.display = 'none')) {
            section.style.display = ''
            document.querySelector('.page__cart').classList.add('hide')
          }
        })
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    })
  })
  licenseButtons.forEach((licenseButton) => {
    licenseButton.addEventListener('click', () => {
      menu_close()
      body_lock_remove(500)
      document
        .querySelectorAll('section:not(.page__cart)')
        .forEach((section) => {
          if ((section.style.display = 'none')) {
            section.style.display = ''
          }
        })
      document.querySelector('.page__cart').classList.add('hide')
    })
  })

  function addContinueShopping() {
    const cartShopping = document.querySelectorAll('.shopping')
    cartShopping.forEach((button) => {
      button.addEventListener('click', () => {
        document
          .querySelectorAll('section:not(.page__cart)')
          .forEach((section) => {
            if ((section.style.display = 'none')) {
              section.style.display = ''
            }
          })
        document.querySelector('.page__cart').classList.add('hide')
        document.querySelector('.cart-header').classList.remove('_active')
      })
    })
  }

  function updateTotalAmount(cartPrices) {
    function priceToNumber(price) {
      if (price.charAt(3) == '.') {
        return Number(price.charAt(1) + price.charAt(2))
      } else {
        return Number(price.charAt(1) + price.charAt(2) + price.charAt(3))
      }
    }
    function numberToPrice(number) {
      return '$' + number + '.00'
    }
    let prices = []
    cartPrices.forEach((price) => {
      prices.push(priceToNumber(price.textContent))
      return prices
    })
    let newPrice = prices.map((i) => (x += i), (x = 0)).reverse()[0]
    let cartItems = document.querySelectorAll('.cart-list-item')
    if (cartItems.length === 0) {
      return '$00.00'
    } else {
      return numberToPrice(newPrice)
    }
  }
  function addDeleteEvent() {
    const deleteButtons = document.querySelectorAll('.header .delete-item')
    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        let cartItem = button.closest('.cart-list-item')
        let track = document
          .querySelector('.playlist_tracks')
          .querySelector(`#${cartItem.id}`)
        let license = track.querySelector('.track_buttons .choose-license')
        cartItem.remove()
        const totalAmount = document.querySelector('.header .total-amount span')

        totalAmount.textContent = updateTotalAmount(
          document.querySelectorAll('.header .price')
        )

        let cartItems = cartHeader.querySelectorAll('.cart-list-item')
        cartQuantity.textContent = cartItems.length
        if (cartItems.length === 0) {
          totalAmount.textContent = '$00.00'
        }
        if (license.id == cartItem.id) {
          license.textContent = 'Choose license'
        }

        cartList.innerHTML = cartHeader.innerHTML
        addContinueShopping()
        cartDeleteEvent()
        cartAddEvent()
      })
    })
  }

  buyButtons.forEach((buyButton) => {
    buyButton.addEventListener('click', () => {
      let track = buyButton.closest('.track')
      let license = track.querySelector('.track_buttons .choose-license')
      const totalAmount = document.querySelector('.header .total-amount span')
      let imageSrc = track.querySelector('.track_image').getAttribute('src')
      let trackName = track.querySelector('.track_name')

      if (license.textContent !== 'Choose license') {
        let cartItems = document.querySelectorAll('.header .cart-list-item')

        cartItems.forEach((item) => {
          if (item.id === track.id) {
            item.remove()

            totalAmount.textContent = updateTotalAmount(
              document.querySelectorAll('.header .price')
            )
          }
        })
        const cart = document.querySelector('.cart-list')
        cart.insertAdjacentHTML(
          'beforeend',
          `<span id='${track.id}' class='cart-list-item'>
                  <img class='cart-list-image' src='${imageSrc}'>
                  <p class='name'>${trackName.textContent}</p>
                  <p class='price'>${license.textContent}</p>
                  <button class="delete-item" type="button"> <img src="img/icons/close.svg">
  
  
                  </button>
                  </span>`
        )
      }

      totalAmount.textContent = updateTotalAmount(
        document.querySelectorAll('.header .price')
      )
      let cartItems = cartHeader.querySelectorAll('.cart-list-item')

      cartQuantity.textContent = cartItems.length

      addDeleteEvent()

      document.querySelector('.cart-header').classList.add('_active')
      setTimeout(() => {
        document.querySelector('.cart-header').classList.remove('_active')
      }, 3000)
    })
  })

  function cartDeleteEvent() {
    const cartDeleteButtons = document.querySelectorAll(
      '.page__cart .delete-item'
    )
    cartDeleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        let cartItem = button.closest('.cart-list-item')
        let totalAmount = document.querySelector(
          '.page__cart .total-amount span'
        )
        cartItem.remove()
        totalAmount.textContent = updateTotalAmount(
          document.querySelectorAll('.page__cart .price')
        )
        cartHeader.innerHTML = cartList.innerHTML

        addDeleteEvent()
        addContinueShopping()
        cartAddEvent()

        let cartItems = document.querySelectorAll('.page__cart .cart-list-item')
        cartQuantity.textContent = cartItems.length
        if (cartItems.length === 0) {
          totalAmount.textContent = '$00.00'
        }
        let track = document
          .querySelector('.playlist_tracks')
          .querySelector(`#${cartItem.id}`)
        let license = track.querySelector('.track_buttons .choose-license')
        license.textContent = 'Choose license'
      })
    })
  }
  function cartAddEvent() {
    const cartButtons = document.querySelectorAll('.to-cart')
    cartButtons.forEach((cartButton) => {
      cartButton.addEventListener('click', () => {
        menu_close()
        body_lock_remove(500)

        let cartItems = document.querySelectorAll('.header .cart-list-item')
        if (cartItems.length == 0) {
          document.querySelector('.cart-review_empty').style.display = ''
        } else {
          document.querySelector('.cart-review_empty').style.display = 'none'
        }

        document.querySelector('.page__cart').classList.remove('hide')
        document
          .querySelectorAll('section:not(.page__cart)')
          .forEach((section) => {
            section.style.display = 'none'
          })
        if (cartItems.length >= 1) {
          cartList.innerHTML = cartHeader.innerHTML
          cartList.classList.remove('hide')
          addContinueShopping()
          cartDeleteEvent()
        } else {
          cartList.classList.add('hide')
        }
      })
    })
  }
  cartAddEvent()

  //.................................................
  const swiper = new Swiper('.license-slider .swiper', {
    // Optional parameters
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 1.2,
      },
      600: {
        slidesPerView: 1.5,
      },
      760: {
        slidesPerView: 1.8,
      },
      800: {
        slidesPerView: 2,
      },

      992: {
        slidesPerView: 2.3,
      },
      1040: {
        slidesPerView: 2.5,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  })
}
//.................................................
//Forms

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()
    let error = formValidate(form)
    let formData = new FormData(form)
    if (error === 0) {
      form.classList.remove('error_text')
      form.closest('.form').classList.add('_sending')
      let response = await fetch('', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        let result = await response.json()
        alert(result.message)

        form.reset()
        form.closest('.form').classList.remove('_sending')
      } else {
        alert('Error!')
        form.closest('.form').classList.remove('_sending')
      }
    } else {
      form.classList.add('error_text')
    }
  }

  function formValidate(form) {
    let error = 0
    let formReq = form.querySelectorAll('._req')
    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i]

      formRemoveError(input)

      if (input.classList.contains('_email')) {
        if (email_test(input)) {
          formAddError(input)
          error++
        }
      }
      if (input.value === '') {
        formAddError(input)
        error++
      }
    }

    return error
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
  }
})

//.................................................
//
