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
