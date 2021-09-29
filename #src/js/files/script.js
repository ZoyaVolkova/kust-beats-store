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
      let response = await fetch('phpmailer/src/sendmail.php', {
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
