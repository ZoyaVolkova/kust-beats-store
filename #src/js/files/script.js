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
    if (targetElement.classList.contains('products__more')) {
      getProducts(targetElement)
      e.preventDefault()
    }
    if (targetElement.classList.contains('actions-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid
      addToCart(targetElement, productId)
      e.preventDefault()
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
      !targetElement.classList.contains('actions-product__button')
    ) {
      document.querySelector('.cart-header').classList.remove('_active')
    }

    if (targetElement.classList.contains('cart-list__delete')) {
      const productId =
        targetElement.closest('.cart-list__item').dataset.cartPid
      updateCart(targetElement, productId, false)
      e.preventDefault()
    }
  }

  // Header
  const headerElement = document.querySelector('.header')

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll')
    } else {
      headerElement.classList.add('_scroll')
    }
  }

  const headerObserver = new IntersectionObserver(callback)
  headerObserver.observe(headerElement)

  // Load More Products
  async function getProducts(button) {
    if (!button.classList.contains('_hold')) {
      button.classList.add('_hold')
      const file = 'json/products.json'
      let response = await fetch(file, {
        method: 'GET',
      })
      if (response.ok) {
        let result = await response.json()
        loadProducts(result)
        button.classList.remove('_hold')
        button.remove()
      } else {
        alert('Ошибка')
      }
    }
  }

  function loadProducts(data) {
    const productsItems = document.querySelector('.products__items')

    data.products.forEach((item) => {
      const productId = item.id
      const productUrl = item.url
      const productImage = item.image
      const productTitle = item.title
      const productText = item.text
      const productPrice = item.price
      const productOldPrice = item.priceOld
      const productShareUrl = item.shareUrl
      const productLikeUrl = item.likeUrl
      const productLabels = item.labels

      let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`
      let productTemplateEnd = `</article>`

      let productTemplateLabels = ''
      if (productLabels) {
        let productTemplateLabelsStart = `<div class="item-product__labels">`
        let productTemplateLabelsEnd = `</div>`
        let productTemplateLabelsContent = ''

        productLabels.forEach((labelItem) => {
          productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`
        })

        productTemplateLabels += productTemplateLabelsStart
        productTemplateLabels += productTemplateLabelsContent
        productTemplateLabels += productTemplateLabelsEnd
      }

      let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="img/products/${productImage}" alt="${productTitle}">
		</a>
	`

      let productTemplateBodyStart = `<div class="item-product__body">`
      let productTemplateBodyEnd = `</div>`

      let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`

      let productTemplatePrices = ''
      let productTemplatePricesStart = `<div class="item-product__prices">`
      let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`
      let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`
      let productTemplatePricesEnd = `</div>`

      productTemplatePrices = productTemplatePricesStart
      productTemplatePrices += productTemplatePricesCurrent
      if (productOldPrice) {
        productTemplatePrices += productTemplatePricesOld
      }
      productTemplatePrices += productTemplatePricesEnd

      let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`

      let productTemplateBody = ''
      productTemplateBody += productTemplateBodyStart
      productTemplateBody += productTemplateContent
      productTemplateBody += productTemplatePrices
      productTemplateBody += productTemplateActions
      productTemplateBody += productTemplateBodyEnd

      let productTemplate = ''
      productTemplate += productTemplateStart
      productTemplate += productTemplateLabels
      productTemplate += productTemplateImage
      productTemplate += productTemplateBody
      productTemplate += productTemplateEnd

      productsItems.insertAdjacentHTML('beforeend', productTemplate)
    })
  }

  // AddToCart
  function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold')
      productButton.classList.add('_fly')

      const cart = document.querySelector('.cart-header__icon')
      const product = document.querySelector(`[data-pid="${productId}"]`)
      const productImage = product.querySelector('.item-product__image')

      const productImageFly = productImage.cloneNode(true)

      const productImageFlyWidth = productImage.offsetWidth
      const productImageFlyHeight = productImage.offsetHeight
      const productImageFlyTop = productImage.getBoundingClientRect().top
      const productImageFlyLeft = productImage.getBoundingClientRect().left

      productImageFly.setAttribute('class', '_flyImage _ibg')
      productImageFly.style.cssText = `
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
		`

      document.body.append(productImageFly)

      const cartFlyLeft = cart.getBoundingClientRect().left
      const cartFlyTop = cart.getBoundingClientRect().top

      productImageFly.style.cssText = `
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity:0;
		`

      productImageFly.addEventListener('transitionend', function () {
        if (productButton.classList.contains('_fly')) {
          productImageFly.remove()
          updateCart(productButton, productId)
          productButton.classList.remove('_fly')
        }
      })
    }
  }

  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header')
    const cartIcon = cart.querySelector('.cart-header__icon')
    const cartQuantity = cartIcon.querySelector('span')
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`)
    const cartList = document.querySelector('.cart-list')

    //Добавляем
    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML
      } else {
        cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
      }
      if (!cartProduct) {
        const product = document.querySelector(`[data-pid="${productId}"]`)
        const cartProductImage = product.querySelector(
          '.item-product__image'
        ).innerHTML
        const cartProductTitle = product.querySelector(
          '.item-product__title'
        ).innerHTML
        const cartProductContent = `
			<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
			<div class="cart-list__body">
				<a href="" class="cart-list__title">${cartProductTitle}</a>
				<div class="cart-list__quantity">Quantity: <span>1</span></div>
				<a href="" class="cart-list__delete">Delete</a>
			</div>`
        cartList.insertAdjacentHTML(
          'beforeend',
          `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`
        )
      } else {
        const cartProductQuantity = cartProduct.querySelector(
          '.cart-list__quantity span'
        )
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML
      }

      // После всех действий
      productButton.classList.remove('_hold')
    } else {
      const cartProductQuantity = cartProduct.querySelector(
        '.cart-list__quantity span'
      )
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML
      if (!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove()
      }

      const cartQuantityValue = --cartQuantity.innerHTML

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue
      } else {
        cartQuantity.remove()
        cart.classList.remove('_active')
      }
    }
  }

  // Furniture Gallery
  const furniture = document.querySelector('.furniture__body')
  if (furniture && !isMobile.any()) {
    const furnitureItems = document.querySelector('.furniture__items')
    const furnitureColumn = document.querySelectorAll('.furniture__column')

    // Скорость анимации
    const speed = furniture.dataset.speed

    // Объявление переменных
    let positionX = 0
    let coordXprocent = 0

    function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0
      furnitureColumn.forEach((element) => {
        furnitureItemsWidth += element.offsetWidth
      })

      const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth
      const distX = Math.floor(coordXprocent - positionX)

      positionX = positionX + distX * speed
      let position = (furnitureDifferent / 200) * positionX

      furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle)
      } else {
        furniture.classList.remove('_init')
      }
    }
    furniture.addEventListener('mousemove', function (e) {
      // Получение ширины
      const furnitureWidth = furniture.offsetWidth

      // Ноль по середине
      const coordX = e.pageX - furnitureWidth / 2

      // Получаем проценты
      coordXprocent = (coordX / furnitureWidth) * 200

      if (!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle)
        furniture.classList.add('_init')
      }
    })
  }
}

//.................................................
// Load tracks from json file

const playlist = document.querySelector('.playlist_tracks')
let trackList = []

const displayTracks = (tracks) => {
  const htmlString = tracks
    .map((track) => {
      return `<div class="playlist_track track">
                  <div class="track_cover">
                    <img src='${track.image}'/>
                    <audio controls id='${track.id}' src='${
        track.audio
      }'></audio>
                  </div>
                  <div class="track_name">
                    <p>${track.name}</p>
                  </div>
                  <div class="track_time"><p>${track.time}</p></div>
                  <div class="track_tags">
                  ${track.tags.map((tag) => {
                    return `
                    <div class="track_tags-tag">#${tag}</div>
                    `
                  })}
                  </div>
  
                  <div class="actions-product__button">
                    <a href="" class="actions-product__link _icon-share">Share</a>
                    <a href="" class="btn">Add to cart</a>
                  </div>
                </div> `
    })

    .join('')

  playlist.innerHTML = htmlString
}
const playerFunctions = () => {
  let playButtons = document.querySelectorAll('.track_cover')

  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', () => {
      let track = playButtons[i].children[1]

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

        let wave = new Wave()
        wave.fromElement(track.id, 'output', {
          type: 'flower',
          colors: ['White'],
        })
      }
    })
  }

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
const loadTracks = async () => {
  try {
    const res = await fetch('json/products.json')

    trackList = await res.json()
    displayTracks(trackList)
    playerFunctions()

    //Search
    const searchBar = document.querySelector('.search-form__input')
    searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase()
      const filteredTracks = trackList.filter((track) => {
        return track.tags.toString().toLowerCase().includes(searchString)
      })
      displayTracks(filteredTracks)
      playerFunctions()
    })

    //

    /*
    const searchBar = document.querySelector('.search-form__input')

    searchBar.addEventListener('input', (e) => {
      const searchString = e.target.value.toLowerCase()
      console.log(searchString)
      const tags = document.querySelectorAll('.track_tags-tag')
      tags.forEach((tag) => {
        if (tag.innerText.includes(searchString)) {
          tag.closest('.track').classList.remove('hidden')
        }
      })
      tags.forEach((tag) => {
        if (tag.innerText.includes(searchString)) {
          tag.closest('.track').classList.remove('hidden')
        }
      })
    })
    */
  } catch (err) {
    console.error(err)
  }
}
//Player
loadTracks()

// Filter

/*

 searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase()
      const filteredTracks = trackList.filter((track) => {
        return track.tags.toString().toLowerCase().includes(searchString)
      })
      displayTracks(filteredTracks)
    })

}
 */
