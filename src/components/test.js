
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const refs = {
    main: document.querySelector('.main'),
    search: document.querySelector('.input'),
    submit: document.querySelector('.submit'),
    previous: document.querySelector('.previous'),
    next: document.querySelector('.next'),
    modal: document.querySelector('.modal'),
    content: document.querySelector('.content'),
    srcChange: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay'),
    overview: document.querySelector('.overview'),
    rating: document.querySelector('.rating'),
    home: document.querySelector('.home'),
    library: document.querySelector('.library'),  
    libraryButtons: document.querySelector('.library_buttons'),
    watchedButton: document.querySelector('.watched_button'),
    queuButton: document.querySelector('.queu_button'),
    subNav: document.querySelector('.sub_navigation'),
    libraryWatched: document.querySelector('.library_watched'),
    libraryQueu: document.querySelector('.library_queu'),
    loader: document.querySelector('.loader'),
    loaderBox:document.querySelector('.loader_box'),
    closeModal1: document.querySelector('.close')
}
const fetcher = (number) => { 
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}`)
  }
let number=1
fetcher(number).then(response => {
  if(response.ok){
    return response.json();
  }
}).then(data => {
    console.log(data.results)
    data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
})
let isSearch = false
refs.home.classList = 'home active_button'

const searchClick = (e) => {
    e.preventDefault()
    const searchFetch = () =>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
  .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
      })}
      refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch, 1000)
    if(refs.search.value !== ''){
    isSearch=true
    }   
    //refs.main.innerHTML = data.results.map(elem => data.results.map(elem => refs.main.innerHTML = `<li class="film"><h2>${elem.original_title}</h2><img src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
    }
refs.submit.addEventListener('click', searchClick)

const nextClick = (e) => {
  const searchFetch2 =()=>{
    refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
    if(isSearch){
    number+=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
      })
    } else {
      number+=1
      fetcher(number).then(response => {
          if(response.ok){
            return response.json();
          }
        }).then(data => {
            console.log(data.results)
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        })
    }}
    refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch2, 1000)
}
refs.next.addEventListener('click', nextClick)

const previousClick = (e) => {
  const searchFetch3 =()=>{
  refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
  if(isSearch){
    if(number>=2){
    number-=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
      })
    } else{
      number = 1
    }
    } else {
      if (number>=2){
        number-=1
        fetcher(number).then(response => {
          if(response.ok){
            return response.json();
          }
        }).then(data => {
            console.log(data.results)
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        })
      }
      else{
        number = 1
      }
    }}
    refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch3, 1000)
}
refs.previous.addEventListener('click', previousClick)

const modalClick = (e) => {
  let element = e.target.closest('li')
  console.log(element.children[1])
  refs.srcChange.src = element.children[1].src
  let modalId = e.target.closest('li').dataset.id
  console.log(modalId)
  fetch(`https://api.themoviedb.org/3/movie/${modalId}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
      refs.overview.innerHTML = `<p class="overview_text">${data.overview}</p>`
      refs.rating.innerHTML = `
      <h2 class="film_title_modal">${data.original_title}(${data.release_date})</h2>
      <table class="info">
      <tr><td><p>Rating:</p></td><td><h5>${data.vote_average}</h5></td></tr>
      <tr><td><p>Voted:</p></td><td><h5>${data.vote_count}</h5></td></tr>
      <tr><td><p>Popularity:</p></td><td><h5>${data.popularity}</h5></td></tr>
      </table>
      `
  })
  refs.modal.classList = 'modal isOn'
  refs.modal.dataset.id = modalId

  
}
refs.main.addEventListener('click', modalClick)

const modalExit = (e) => {
  refs.modal.classList = 'modal'
}
refs.overlay.addEventListener('click', modalExit)
  let localArray = [];
  let localArray2 = [];
const watchedAdding = (e) => {
  let thisId = e.target.closest('.modal').dataset.id
  console.log(thisId)
  fetch(`https://api.themoviedb.org/3/movie/${thisId}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
    // if(!localArray.includes(data)){
    // localArray.push(data)
    // }
    // localStorage.setItem('watched', JSON.stringify(localArray))
    if(localStorage.getItem('watched') === null){
      localStorage.setItem('watched', JSON.stringify([]))
      localArray = JSON.parse(localStorage.getItem('watched'))
      if(!localArray.includes(data)){
        localArray.push(data)
        }
      localStorage.setItem('watched', JSON.stringify(localArray))
    } else{
      localArray = JSON.parse(localStorage.getItem('watched'))
      if(!localArray.includes(data)){
        localArray.push(data)
        }
        localStorage.setItem('watched', JSON.stringify(localArray))
    }
    Swal.fire(
      'Film was added to the "watched"',
      'click "ok"',
      'success'
    )
  })
}
refs.watchedButton.addEventListener('click', watchedAdding)

const queuAdding = (e) => {
  let thisId = e.target.closest('.modal').dataset.id
  console.log(thisId)
  fetch(`https://api.themoviedb.org/3/movie/${thisId}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
    // if(!localArray2.includes(data)){
    // localArray2.push(data)
    // }
    // localStorage.setItem('queu', JSON.stringify(localArray2))
    if(localStorage.getItem('queu') === null){
      localStorage.setItem('queu', JSON.stringify([]))
      localArray2 = JSON.parse(localStorage.getItem('queu'))
      if(!localArray2.includes(data)){
        localArray2.push(data)
      }
      localStorage.setItem('queu', JSON.stringify(localArray2))
    } else{
      localArray2 = JSON.parse(localStorage.getItem('queu'))
      if(!localArray2.includes(data)){
        localArray2.push(data)
        }
        localStorage.setItem('queu', JSON.stringify(localArray2))
    }
    Swal.fire(
      'Film was added to the "queu"',
      'click "ok"',
      'success'
    )
  })
}
refs.queuButton.addEventListener('click', queuAdding)

const homeButton = (e) => {
  const searchFetch4 =()=>{
    refs.loader.classList = 'loader not_show'
          refs.loaderBox.classList = 'loader_box'
  number=1
  isSearch = false
  fetcher(number).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
      console.log(data.results)
      data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
  })
  refs.libraryWatched.classList = 'library_watched not_show'
  refs.libraryQueu.classList = 'library_queu not_show'
  refs.search.classList = 'input show'
  refs.submit.classList = 'submit show'
  refs.home.classList = 'home active_button'
  refs.library.classList = 'library'
  refs.next.classList = 'next show'
  refs.previous.classList = 'previous show'}
      refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch4, 1000)
}
refs.home.addEventListener('click', homeButton)

const libraryButton = (e) => {
  const searchFetch5 =()=>{
    refs.loader.classList = 'loader not_show'
          refs.loaderBox.classList = 'loader_box'
  let elements = JSON.parse(localStorage.getItem('watched'))
  console.log(elements)
  refs.libraryWatched.classList = 'library_watched show'
  refs.libraryQueu.classList = 'library_queu show'
  refs.search.classList = 'input not_show'
  refs.submit.classList = 'submit not_show'
  refs.library.classList = 'library active_button'
  refs.home.classList = 'home'
  refs.next.classList = 'next not_show'
  refs.previous.classList = 'previous not_show'
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }
  refs.loader.classList = 'loader show'
  refs.loaderBox.classList = 'loader_box loader_while_open'
  refs.main.innerHTML = ''
  setTimeout(searchFetch5, 1000)
}
refs.library.addEventListener('click', libraryButton)

const watchedButtonButton2 = (e) => {
  let elements = JSON.parse(localStorage.getItem('watched'))
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
}
refs.libraryWatched.addEventListener('click', watchedButtonButton2)

const queuButtonButton2 = (e) => {
  let elements = JSON.parse(localStorage.getItem('queu'))
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
}
refs.libraryQueu.addEventListener('click', queuButtonButton2)


refs.closeModal1.addEventListener('click', modalExit)