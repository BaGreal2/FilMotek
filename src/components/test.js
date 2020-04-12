//localStorage
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
    closeModal1: document.querySelector('.close'),
    body: document.getElementById('up'),
    logo: document.querySelector('.logo'),
    removeLocalQueu: document.querySelector('.removeLocalQueu'),
    removeLocalWatched: document.querySelector('.removeLocalWatched'),
    tumbler: document.querySelector('.js-switch-input'),
    allButtons: document.getElementsByTagName('button'),
    logoDiv: document.querySelector('.logo_div'),
    homeAndLibrary: document.querySelector('.home_and_library'),
    hey: document.querySelector('.hey'),
    html: document.getElementsByTagName('html'),
    closeImg: document.querySelector('.close_image')
}
if(localStorage.getItem('theme') === null){
  localStorage.setItem('theme', 'light-theme')
}
if(window.innerWidth>=768 && window.innerWidth<1024){
  refs.logo.style.left='28%'
}
if(window.innerWidth>=768){
const waitForAnimation=()=>{
refs.logo.style.transitionPropery='font-size, margin-right, top, left';
refs.logo.style.transitionDuration='2.4s';
refs.logoDiv.style.transitionPropery='background-color';
refs.logoDiv.style.transitionDuration='2.4s';
refs.logoDiv.style.backgroundColor='rgba(207, 235, 205, 0)'
if(window.innerWidth>=1024){
refs.logo.style.left='32px'
refs.logo.style.top='-9px'
} else {
  refs.logo.style.left='18px'
refs.logo.style.top='-8px'
}
refs.logo.style.fontSize='35px'
if(window.innerWidth>=320 && window.innerWidth<=767){
  refs.homeAndLibrary.style.marginLeft="0";
} else if(window.innerWidth>=768 && window.innerWidth<=1023){
  refs.homeAndLibrary.style.marginLeft="50vw"
} else{
  refs.homeAndLibrary.style.marginLeft="70vw"
  console.log('what?')
}
}
setTimeout(waitForAnimation, 400)
const waitForChangeClass = ()=>{
  refs.logoDiv.classList='';
  refs.logo.style.position='static';
  refs.html[0].style.overflowY='scroll';
}
setTimeout(waitForChangeClass, 2400)
const waitForDisableHey =()=>{
  refs.hey.classList="not_show";
}
setTimeout(waitForDisableHey, 2400)
} else{
  refs.logoDiv.classList='';
  refs.logo.style.position='static';
  refs.logo.style.fontSize='35px'
  refs.html[0].style.overflowY='scroll'
  refs.hey.classList="not_show";
}
let isLibrary=false
let isWatched=false
let isQueu=false
refs.removeLocalWatched.classList='not_show'
refs.removeLocalQueu.classList="not_show"
var module = {
  options: [],
  header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
  dataos: [
      { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
      { name: 'Windows', value: 'Win', version: 'NT' },
      { name: 'iPhone', value: 'iPhone', version: 'OS' },
      { name: 'iPad', value: 'iPad', version: 'OS' },
      { name: 'Kindle', value: 'Silk', version: 'Silk' },
      { name: 'Android', value: 'Android', version: 'Android' },
      { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
      { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
      { name: 'Macintosh', value: 'Mac', version: 'OS X' },
      { name: 'Linux', value: 'Linux', version: 'rv' },
      { name: 'Palm', value: 'Palm', version: 'PalmOS' }
  ],
  databrowser: [
      { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
      { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
      { name: 'Safari', value: 'Safari', version: 'Version' },
      { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
      { name: 'Opera', value: 'Opera', version: 'Opera' },
      { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
      { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
  ],
  init: function () {
      var agent = this.header.join(' '),
          os = this.matchItem(agent, this.dataos),
          browser = this.matchItem(agent, this.databrowser);
      
      return { os: os, browser: browser };
  },
  matchItem: function (string, data) {
      var i = 0,
          j = 0,
          html = '',
          regex,
          regexv,
          match,
          matches,
          version;
      
      for (i = 0; i < data.length; i += 1) {
          regex = new RegExp(data[i].value, 'i');
          match = regex.test(string);
          if (match) {
              regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
              matches = string.match(regexv);
              version = '';
              if (matches) { if (matches[1]) { matches = matches[1]; } }
              if (matches) {
                  matches = matches.split(/[._]+/);
                  for (j = 0; j < matches.length; j += 1) {
                      if (j === 0) {
                          version += matches[j] + '.';
                      } else {
                          version += matches[j];
                      }
                  }
              } else {
                  version = '0';
              }
              return {
                  name: data[i].name,
                  version: parseFloat(version)
              };
          }
      }
      return { name: 'unknown', version: 0 };
  }
};
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
    if(module.init().os.name==='iPad'){
      data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
    }else{
    data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
    }
    if(number===1){
      refs.previous.classList='previous not_show'
    }else{
      refs.previous.classList='previous'
    }
  })
  
let isSearch = false
refs.home.classList = 'home active_button'
//localStorage
let searchValue;
const searchClick = (e) => {
  number = 1
    e.preventDefault()
    if(refs.search.value!==''){
    const searchFetch = () =>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
  .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        if(number===1){
          refs.previous.classList='previous not_show'
        } else{
          refs.previous.classList='previous'
        }
        console.log(data.results.length)
        refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
        if(module.init().os.name==='iPad' && data.results.length>=1){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        }else if(data.results.length>=1){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))}
                    else{
                      refs.main.innerHTML=`<div class='empty'></div>`
                    }
        })}
      refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch, 1000)
    if(refs.search.value !== ''){
    isSearch=true
    searchValue = refs.search.value
    }
  }else{
      return;
    }   
    //refs.main.innerHTML = data.results.map(elem => data.results.map(elem => refs.main.innerHTML = `<li class="film"><h2>${elem.original_title}</h2><img src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
    }
refs.submit.addEventListener('click', searchClick)
const searchOnEnter=(e)=>{
  e.preventDefault()
  if(refs.search.value!=='' && e.keyCode === 13){
    number = 1
    const searchFetch = () =>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${refs.search.value}`)
  .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        if(number===1){
          refs.previous.classList='previous not_show'
        } else{
          refs.previous.classList='previous'
        }
        console.log(data.results.length)
        refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
        if(module.init().os.name==='iPad' && data.results.length>=1){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        }else if(data.results.length>=1){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))}
                    else{
                      refs.main.innerHTML=`<div class='empty'></div>`
                    }
        })}
      refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch, 1000)
    if(refs.search.value !== ''){
    isSearch=true
    searchValue = refs.search.value
    }
  }
}
refs.search.addEventListener('keyup', searchOnEnter)
const nextClick = (e) => {
  const searchFetch2 =()=>{
    refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
    if(isSearch){
    number+=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${searchValue}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        if(number===1){
          refs.previous.classList='previous not_show'
        } else{
          refs.previous.classList='previous'
        }
        if(module.init().os.name==='iPad'){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        }else{
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))}
      })
    } else {
      number+=1
      fetcher(number).then(response => {
          if(response.ok){
            return response.json();
          }
        }).then(data => {
          if(number===1){
            refs.previous.classList='previous not_show'
          } else{
            refs.previous.classList='previous'
            if(refs.tumbler.checked === true){
              localStorage.setItem('theme', 'dark-theme')
              refs.tumbler.checked = true;
            refs.body.classList.add('dark-body')
            refs.main.classList.add('dark-ul')
            refs.content.classList.add('dark-content')
            refs.search.classList.add('dark-body')
            refs.submit.classList.add('dark-button')
            refs.home.classList.add('dark-button')
            refs.library.classList.add('dark-button')
            refs.next.classList.add('dark-button')
            refs.previous.classList.add('dark-button')
            refs.watchedButton.classList.add('dark-button')
            refs.queuButton.classList.add('dark-button')
            refs.removeLocalWatched.classList.add('dark-button')
            refs.removeLocalQueu.classList.add('dark-button')
            refs.libraryQueu.classList.add('dark-button')
            refs.libraryWatched.classList.add('dark-button')
            
            refs.body.classList.remove('light-body')
            refs.main.classList.remove('light-ul')
            refs.content.classList.remove('light-content')
            refs.search.classList.remove('light-body')
            refs.submit.classList.remove('light-button')
            refs.home.classList.remove('light-button')
            refs.library.classList.remove('light-button')
            refs.next.classList.remove('light-button')
            refs.previous.classList.remove('light-button')
            refs.watchedButton.classList.remove('light-button')
            refs.queuButton.classList.remove('light-button')
            refs.removeLocalWatched.classList.remove('light-button')
            refs.removeLocalQueu.classList.remove('light-button')
            refs.libraryQueu.classList.remove('light-button')
            refs.libraryWatched.classList.remove('light-button')
            } else if(refs.tumbler.checked === false){
              localStorage.setItem('theme', 'light-theme')
              refs.tumbler.checked = false;
            refs.body.classList.add('light-body')
            refs.main.classList.add('light-ul')
            refs.content.classList.add('light-content')
            refs.search.classList.add('light-body')
            refs.submit.classList.add('light-button')
            refs.home.classList.add('light-button')
            refs.library.classList.add('light-button')
            refs.next.classList.add('light-button')
            refs.previous.classList.add('light-button')
            refs.watchedButton.classList.add('light-button')
            refs.queuButton.classList.add('light-button')
            refs.removeLocalWatched.classList.add('light-button')
            refs.removeLocalQueu.classList.add('light-button')
            refs.libraryQueu.classList.add('light-button')
            refs.libraryWatched.classList.add('light-button')
            
            refs.body.classList.remove('dark-body')
            refs.main.classList.remove('dark-ul')
            refs.content.classList.remove('dark-content')
            refs.search.classList.remove('dark-body')
            refs.submit.classList.remove('dark-button')
            refs.home.classList.remove('dark-button')
            refs.library.classList.remove('dark-button')
            refs.next.classList.remove('dark-button')
            refs.previous.classList.remove('dark-button')
            refs.watchedButton.classList.remove('dark-button')
            refs.queuButton.classList.remove('dark-button')
            refs.removeLocalWatched.classList.remove('dark-button')
            refs.removeLocalQueu.classList.remove('dark-button')
            refs.libraryQueu.classList.remove('dark-button')
            refs.libraryWatched.classList.remove('dark-button')
            }
          }
            console.log(data.results)
            if(module.init().os.name==='iPad'){
              data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
            }else{
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))}
        })
    }}
    refs.loader.classList = 'loader show'
      refs.loaderBox.classList = 'loader_box loader_while_open'
      refs.main.innerHTML = ''
      setTimeout(searchFetch2, 1000)
}
refs.next.addEventListener('click', nextClick)

const previousClick = (e) => {
  if(number>=2){
  const searchFetch3 =()=>{
  refs.loader.classList = 'loader not_show'
        refs.loaderBox.classList = 'loader_box'
  if(isSearch){
    if(number>=2){
    number-=1
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4aa539255aa0c2506cf45806a15a8a0a&language=en-US&page=${number}&include_adult=false&query=${searchValue}`)
      .then(response => {
      if(response.ok){
        return response.json();
      }})
      .then(data => {
        if(number===1){
          refs.previous.classList='previous not_show'
        } else{
          refs.previous.classList='previous'
        }
        if(module.init().os.name==='iPad'){
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        }else{
          return(refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
        }
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
          if(number===1){
            refs.previous.classList='previous not_show'
          } else{
            refs.previous.classList='previous'
          }
            console.log(data.results)
            if(module.init().os.name==='iPad'){
            data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
            }else{
              data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
            }
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
  }else{
    return;
  }
}
refs.previous.addEventListener('click', previousClick)
let overviewText='';
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
    if(number===1){
      refs.previous.classList='previous not_show'
    } else{
      refs.previous.classList='previous'
    }
    refs.overview.innerHTML = `<p class="overview_text">${data.overview}</p>`
    overviewText=document.querySelector('.overview_text')
    if(overviewText.textContent.length>=380 && innerWidth>=320 && innerWidth<=767){
      refs.overview.innerHTML = `<p class="overview_text small_text">${data.overview}</p>`
    }else{
      refs.overview.innerHTML = `<p class="overview_text">${data.overview}</p>`
    }
      overviewText = document.querySelector('.overview_text')
      refs.rating.innerHTML = `
      <h2 class="film_title_modal" data-id="${data.id}">${data.original_title}(${data.release_date})</h2>
      <table class="info">
      <tr><td><p>Rating:</p></td><td><h5>${data.vote_average}</h5></td></tr>
      <tr><td><p>Voted:</p></td><td><h5>${data.vote_count}</h5></td></tr>
      <tr><td><p>Popularity:</p></td><td><h5>${data.popularity}</h5></td></tr>
      </table>
      `
  })
  refs.modal.classList = 'modal isOn'
  refs.modal.dataset.id = modalId
  refs.watchedButton.classList='watched_button'
  refs.queuButton.classList='queu_button'
  refs.removeLocalWatched.classList='not_show'
  refs.removeLocalQueu.classList="not_show"
  if(localStorage.getItem('theme')==='dark-theme'){
    refs.closeImg.src = "https://i.postimg.cc/SK56Pfbp/Users-Exit-icon-white.png"
  } else{
    refs.closeImg.src = "http://icons.iconarchive.com/icons/icons8/windows-8/256/Users-Exit-icon.png"
  }
  if(isLibrary){
    refs.watchedButton.classList='not_show'
    refs.queuButton.classList='not_show'
    if(isWatched){
    refs.removeLocalWatched.classList='removeLocalWatched'
    if(refs.tumbler.checked === true){
      localStorage.setItem('theme', 'dark-theme')
      refs.tumbler.checked = true;
    refs.body.classList.add('dark-body')
    refs.main.classList.add('dark-ul')
    refs.content.classList.add('dark-content')
    refs.search.classList.add('dark-body')
    refs.submit.classList.add('dark-button')
    refs.home.classList.add('dark-button')
    refs.library.classList.add('dark-button')
    refs.next.classList.add('dark-button')
    refs.previous.classList.add('dark-button')
    refs.watchedButton.classList.add('dark-button')
    refs.queuButton.classList.add('dark-button')
    refs.removeLocalWatched.classList.add('dark-button')
    refs.removeLocalQueu.classList.add('dark-button')
    refs.libraryQueu.classList.add('dark-button')
    refs.libraryWatched.classList.add('dark-button')
    
    refs.body.classList.remove('light-body')
    refs.main.classList.remove('light-ul')
    refs.content.classList.remove('light-content')
    refs.search.classList.remove('light-body')
    refs.submit.classList.remove('light-button')
    refs.home.classList.remove('light-button')
    refs.library.classList.remove('light-button')
    refs.next.classList.remove('light-button')
    refs.previous.classList.remove('light-button')
    refs.watchedButton.classList.remove('light-button')
    refs.queuButton.classList.remove('light-button')
    refs.removeLocalWatched.classList.remove('light-button')
    refs.removeLocalQueu.classList.remove('light-button')
    refs.libraryQueu.classList.remove('light-button')
    refs.libraryWatched.classList.remove('light-button')
    } else if(refs.tumbler.checked === false){
      localStorage.setItem('theme', 'light-theme')
      refs.tumbler.checked = false;
    refs.body.classList.add('light-body')
    refs.main.classList.add('light-ul')
    refs.content.classList.add('light-content')
    refs.search.classList.add('light-body')
    refs.submit.classList.add('light-button')
    refs.home.classList.add('light-button')
    refs.library.classList.add('light-button')
    refs.next.classList.add('light-button')
    refs.previous.classList.add('light-button')
    refs.watchedButton.classList.add('light-button')
    refs.queuButton.classList.add('light-button')
    refs.removeLocalWatched.classList.add('light-button')
    refs.removeLocalQueu.classList.add('light-button')
    refs.libraryQueu.classList.add('light-button')
    refs.libraryWatched.classList.add('light-button')
    
    refs.body.classList.remove('dark-body')
    refs.main.classList.remove('dark-ul')
    refs.content.classList.remove('dark-content')
    refs.search.classList.remove('dark-body')
    refs.submit.classList.remove('dark-button')
    refs.home.classList.remove('dark-button')
    refs.library.classList.remove('dark-button')
    refs.next.classList.remove('dark-button')
    refs.previous.classList.remove('dark-button')
    refs.watchedButton.classList.remove('dark-button')
    refs.queuButton.classList.remove('dark-button')
    refs.removeLocalWatched.classList.remove('dark-button')
    refs.removeLocalQueu.classList.remove('dark-button')
    refs.libraryQueu.classList.remove('dark-button')
    refs.libraryWatched.classList.remove('dark-button')
    }
    } else if(isQueu){
    refs.removeLocalQueu.classList="removeLocalQueu"
    if(refs.tumbler.checked === true){
      localStorage.setItem('theme', 'dark-theme')
      refs.tumbler.checked = true;
    refs.body.classList.add('dark-body')
    refs.main.classList.add('dark-ul')
    refs.content.classList.add('dark-content')
    refs.search.classList.add('dark-body')
    refs.submit.classList.add('dark-button')
    refs.home.classList.add('dark-button')
    refs.library.classList.add('dark-button')
    refs.next.classList.add('dark-button')
    refs.previous.classList.add('dark-button')
    refs.watchedButton.classList.add('dark-button')
    refs.queuButton.classList.add('dark-button')
    refs.removeLocalWatched.classList.add('dark-button')
    refs.removeLocalQueu.classList.add('dark-button')
    refs.libraryQueu.classList.add('dark-button')
    refs.libraryWatched.classList.add('dark-button')
    
    refs.body.classList.remove('light-body')
    refs.main.classList.remove('light-ul')
    refs.content.classList.remove('light-content')
    refs.search.classList.remove('light-body')
    refs.submit.classList.remove('light-button')
    refs.home.classList.remove('light-button')
    refs.library.classList.remove('light-button')
    refs.next.classList.remove('light-button')
    refs.previous.classList.remove('light-button')
    refs.watchedButton.classList.remove('light-button')
    refs.queuButton.classList.remove('light-button')
    refs.removeLocalWatched.classList.remove('light-button')
    refs.removeLocalQueu.classList.remove('light-button')
    refs.libraryQueu.classList.remove('light-button')
    refs.libraryWatched.classList.remove('light-button')
    } else if(refs.tumbler.checked === false){
      localStorage.setItem('theme', 'light-theme')
      refs.tumbler.checked = false;
    refs.body.classList.add('light-body')
    refs.main.classList.add('light-ul')
    refs.content.classList.add('light-content')
    refs.search.classList.add('light-body')
    refs.submit.classList.add('light-button')
    refs.home.classList.add('light-button')
    refs.library.classList.add('light-button')
    refs.next.classList.add('light-button')
    refs.previous.classList.add('light-button')
    refs.watchedButton.classList.add('light-button')
    refs.queuButton.classList.add('light-button')
    refs.removeLocalWatched.classList.add('light-button')
    refs.removeLocalQueu.classList.add('light-button')
    refs.libraryQueu.classList.add('light-button')
    refs.libraryWatched.classList.add('light-button')
    
    refs.body.classList.remove('dark-body')
    refs.main.classList.remove('dark-ul')
    refs.content.classList.remove('dark-content')
    refs.search.classList.remove('dark-body')
    refs.submit.classList.remove('dark-button')
    refs.home.classList.remove('dark-button')
    refs.library.classList.remove('dark-button')
    refs.next.classList.remove('dark-button')
    refs.previous.classList.remove('dark-button')
    refs.watchedButton.classList.remove('dark-button')
    refs.queuButton.classList.remove('dark-button')
    refs.removeLocalWatched.classList.remove('dark-button')
    refs.removeLocalQueu.classList.remove('dark-button')
    refs.libraryQueu.classList.remove('dark-button')
    refs.libraryWatched.classList.remove('dark-button')
    }
    }
  }
  if(refs.tumbler.checked === true){
    localStorage.setItem('theme', 'dark-theme')
    refs.tumbler.checked = true;
  refs.body.classList.add('dark-body')
  refs.main.classList.add('dark-ul')
  refs.content.classList.add('dark-content')
  refs.search.classList.add('dark-body')
  refs.submit.classList.add('dark-button')
  refs.home.classList.add('dark-button')
  refs.library.classList.add('dark-button')
  refs.next.classList.add('dark-button')
  refs.previous.classList.add('dark-button')
  refs.watchedButton.classList.add('dark-button')
  refs.queuButton.classList.add('dark-button')
  refs.removeLocalWatched.classList.add('dark-button')
  refs.removeLocalQueu.classList.add('dark-button')
  refs.libraryQueu.classList.add('dark-button')
  refs.libraryWatched.classList.add('dark-button')
  
  refs.body.classList.remove('light-body')
  refs.main.classList.remove('light-ul')
  refs.content.classList.remove('light-content')
  refs.search.classList.remove('light-body')
  refs.submit.classList.remove('light-button')
  refs.home.classList.remove('light-button')
  refs.library.classList.remove('light-button')
  refs.next.classList.remove('light-button')
  refs.previous.classList.remove('light-button')
  refs.watchedButton.classList.remove('light-button')
  refs.queuButton.classList.remove('light-button')
  refs.removeLocalWatched.classList.remove('light-button')
  refs.removeLocalQueu.classList.remove('light-button')
  refs.libraryQueu.classList.remove('light-button')
  refs.libraryWatched.classList.remove('light-button')
  } else if(refs.tumbler.checked === false){
    localStorage.setItem('theme', 'light-theme')
    refs.tumbler.checked = false;
  refs.body.classList.add('light-body')
  refs.main.classList.add('light-ul')
  refs.content.classList.add('light-content')
  refs.search.classList.add('light-body')
  refs.submit.classList.add('light-button')
  refs.home.classList.add('light-button')
  refs.library.classList.add('light-button')
  refs.next.classList.add('light-button')
  refs.previous.classList.add('light-button')
  refs.watchedButton.classList.add('light-button')
  refs.queuButton.classList.add('light-button')
  refs.removeLocalWatched.classList.add('light-button')
  refs.removeLocalQueu.classList.add('light-button')
  refs.libraryQueu.classList.add('light-button')
  refs.libraryWatched.classList.add('light-button')
  
  refs.body.classList.remove('dark-body')
  refs.main.classList.remove('dark-ul')
  refs.content.classList.remove('dark-content')
  refs.search.classList.remove('dark-body')
  refs.submit.classList.remove('dark-button')
  refs.home.classList.remove('dark-button')
  refs.library.classList.remove('dark-button')
  refs.next.classList.remove('dark-button')
  refs.previous.classList.remove('dark-button')
  refs.watchedButton.classList.remove('dark-button')
  refs.queuButton.classList.remove('dark-button')
  refs.removeLocalWatched.classList.remove('dark-button')
  refs.removeLocalQueu.classList.remove('dark-button')
  refs.libraryQueu.classList.remove('dark-button')
  refs.libraryWatched.classList.remove('dark-button')
  }
}
refs.main.addEventListener('click', modalClick)

const modalExit = (e) => {
  refs.modal.classList = 'modal'
}
//closest
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
      if(localStorage.getItem('watched').includes(JSON.stringify(data)) === false){
        localArray.push(data)
        }
      localStorage.setItem('watched', JSON.stringify(localArray))
    } else{
      localArray = JSON.parse(localStorage.getItem('watched'))
      if(localStorage.getItem('watched').includes(JSON.stringify(data)) === false){
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
      if(localStorage.getItem('queu').includes(JSON.stringify(data)) === false){
        localArray2.push(data)
        }
      localStorage.setItem('queu', JSON.stringify(localArray2))
    } else{
      localArray2 = JSON.parse(localStorage.getItem('queu'))
      if(localStorage.getItem('queu').includes(JSON.stringify(data)) === false){
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
  isLibrary=false
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
    if(number===1){
      refs.previous.classList='previous not_show'
    } else{
      refs.previous.classList='previous'
    }
      console.log(data.results)
      if(module.init().os.name==='iPad'){
        data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
      }else{
      data.results.map(elem => refs.main.innerHTML = data.results.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join(''))
      }
      if(refs.tumbler.checked === true){
        localStorage.setItem('theme', 'dark-theme')
        refs.tumbler.checked = true;
    refs.body.classList.add('dark-body')
    refs.main.classList.add('dark-ul')
    refs.content.classList.add('dark-content')
    refs.search.classList.add('dark-body')
    refs.submit.classList.add('dark-button')
    refs.home.classList.add('dark-button')
    refs.library.classList.add('dark-button')
    refs.next.classList.add('dark-button')
    refs.previous.classList.add('dark-button')
    refs.watchedButton.classList.add('dark-button')
    refs.queuButton.classList.add('dark-button')
    refs.removeLocalWatched.classList.add('dark-button')
    refs.removeLocalQueu.classList.add('dark-button')
    refs.libraryQueu.classList.add('dark-button')
    refs.libraryWatched.classList.add('dark-button')
    
    refs.body.classList.remove('light-body')
    refs.main.classList.remove('light-ul')
    refs.content.classList.remove('light-content')
    refs.search.classList.remove('light-body')
    refs.submit.classList.remove('light-button')
    refs.home.classList.remove('light-button')
    refs.library.classList.remove('light-button')
    refs.next.classList.remove('light-button')
    refs.previous.classList.remove('light-button')
    refs.watchedButton.classList.remove('light-button')
    refs.queuButton.classList.remove('light-button')
    refs.removeLocalWatched.classList.remove('light-button')
    refs.removeLocalQueu.classList.remove('light-button')
    refs.libraryQueu.classList.remove('light-button')
    refs.libraryWatched.classList.remove('light-button')
    } else if(refs.tumbler.checked === false){
        localStorage.setItem('theme', 'light-theme')
        refs.tumbler.checked = false;
    refs.body.classList.add('light-body')
    refs.main.classList.add('light-ul')
    refs.content.classList.add('light-content')
    refs.search.classList.add('light-body')
    refs.submit.classList.add('light-button')
    refs.home.classList.add('light-button')
    refs.library.classList.add('light-button')
    refs.next.classList.add('light-button')
    refs.previous.classList.add('light-button')
    refs.watchedButton.classList.add('light-button')
    refs.queuButton.classList.add('light-button')
    refs.removeLocalWatched.classList.add('light-button')
    refs.removeLocalQueu.classList.add('light-button')
    refs.libraryQueu.classList.add('light-button')
    refs.libraryWatched.classList.add('light-button')
    
    refs.body.classList.remove('dark-body')
    refs.main.classList.remove('dark-ul')
    refs.content.classList.remove('dark-content')
    refs.search.classList.remove('dark-body')
    refs.submit.classList.remove('dark-button')
    refs.home.classList.remove('dark-button')
    refs.library.classList.remove('dark-button')
    refs.next.classList.remove('dark-button')
    refs.previous.classList.remove('dark-button')
    refs.watchedButton.classList.remove('dark-button')
    refs.queuButton.classList.remove('dark-button')
    refs.removeLocalWatched.classList.remove('dark-button')
    refs.removeLocalQueu.classList.remove('dark-button')
    refs.libraryQueu.classList.remove('dark-button')
    refs.libraryWatched.classList.remove('dark-button')
    }
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
      refs.removeLocalWatched.classList='not_show'
      refs.removeLocalQueu.classList="not_show"

}
refs.home.addEventListener('click', homeButton)
refs.logo.addEventListener('click', homeButton)


const libraryButton = (e) => {
  isLibrary=true;
  isWatched=true;
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
  if(elements!==null){
  if(module.init().os.name==='iPad'){
    refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }else{
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')}
  }
  if(refs.main.children.length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
  if(refs.tumbler.checked === true){
    localStorage.setItem('theme', 'dark-theme')
    refs.tumbler.checked = true;
  refs.body.classList.add('dark-body')
  refs.main.classList.add('dark-ul')
  refs.content.classList.add('dark-content')
  refs.search.classList.add('dark-body')
  refs.submit.classList.add('dark-button')
  refs.home.classList.add('dark-button')
  refs.library.classList.add('dark-button')
  refs.next.classList.add('dark-button')
  refs.previous.classList.add('dark-button')
  refs.watchedButton.classList.add('dark-button')
  refs.queuButton.classList.add('dark-button')
  refs.removeLocalWatched.classList.add('dark-button')
  refs.removeLocalQueu.classList.add('dark-button')
  refs.libraryQueu.classList.add('dark-button')
  refs.libraryWatched.classList.add('dark-button')
  
  refs.body.classList.remove('light-body')
  refs.main.classList.remove('light-ul')
  refs.content.classList.remove('light-content')
  refs.search.classList.remove('light-body')
  refs.submit.classList.remove('light-button')
  refs.home.classList.remove('light-button')
  refs.library.classList.remove('light-button')
  refs.next.classList.remove('light-button')
  refs.previous.classList.remove('light-button')
  refs.watchedButton.classList.remove('light-button')
  refs.queuButton.classList.remove('light-button')
  refs.removeLocalWatched.classList.remove('light-button')
  refs.removeLocalQueu.classList.remove('light-button')
  refs.libraryQueu.classList.remove('light-button')
  refs.libraryWatched.classList.remove('light-button')
  } else if(refs.tumbler.checked === false){
    localStorage.setItem('theme', 'light-theme')
    refs.tumbler.checked = false;
  refs.body.classList.add('light-body')
  refs.main.classList.add('light-ul')
  refs.content.classList.add('light-content')
  refs.search.classList.add('light-body')
  refs.submit.classList.add('light-button')
  refs.home.classList.add('light-button')
  refs.library.classList.add('light-button')
  refs.next.classList.add('light-button')
  refs.previous.classList.add('light-button')
  refs.watchedButton.classList.add('light-button')
  refs.queuButton.classList.add('light-button')
  refs.removeLocalWatched.classList.add('light-button')
  refs.removeLocalQueu.classList.add('light-button')
  refs.libraryQueu.classList.add('light-button')
  refs.libraryWatched.classList.add('light-button')
  
  refs.body.classList.remove('dark-body')
  refs.main.classList.remove('dark-ul')
  refs.content.classList.remove('dark-content')
  refs.search.classList.remove('dark-body')
  refs.submit.classList.remove('dark-button')
  refs.home.classList.remove('dark-button')
  refs.library.classList.remove('dark-button')
  refs.next.classList.remove('dark-button')
  refs.previous.classList.remove('dark-button')
  refs.watchedButton.classList.remove('dark-button')
  refs.queuButton.classList.remove('dark-button')
  refs.removeLocalWatched.classList.remove('dark-button')
  refs.removeLocalQueu.classList.remove('dark-button')
  refs.libraryQueu.classList.remove('dark-button')
  refs.libraryWatched.classList.remove('dark-button')
  }
}
  refs.loader.classList = 'loader show'
  refs.loaderBox.classList = 'loader_box loader_while_open'
  refs.main.innerHTML = ''
  setTimeout(searchFetch5, 1000)

  
}
refs.library.addEventListener('click', libraryButton)

const watchedButtonButton2 = (e) => {
  isWatched=true
  isQueu=false
  let elements = JSON.parse(localStorage.getItem('watched'))
  if(elements!==null){
  if(module.init().os.name==='iPad'){
    refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }else{
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }}
  if(refs.main.children.length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
}
refs.libraryWatched.addEventListener('click', watchedButtonButton2)

const queuButtonButton2 = (e) => {
  isWatched=false
  isQueu=true
  let elements = JSON.parse(localStorage.getItem('queu'))
  if(elements!==null){
  if(module.init().os.name==='iPad'){
    refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }else{
  refs.main.innerHTML = elements.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')}
  }
  if(refs.main.children.length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
  if(JSON.parse(localStorage.getItem('queu')).length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
}
refs.libraryQueu.addEventListener('click', queuButtonButton2)

refs.closeModal1.addEventListener('click', modalExit)

let array1=[]
let thisId2;
let thisId3;
const removeFromLocalWatched=(e)=>{
  thisId2 = document.querySelector('.film_title_modal').dataset.id
  fetch(`https://api.themoviedb.org/3/movie/${thisId2}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
  array1=JSON.parse(localStorage.getItem('watched'))
  let arrayPre=[];
  array1.map(elem=> arrayPre.push(elem.id))
  let index1=arrayPre.indexOf(data.id)
  console.log('index: '+index1)
  if (index1 > -1) {
    array1.splice(index1, 1);
  }
  localStorage.setItem('watched', JSON.stringify(array1))
  let array2=JSON.parse(localStorage.getItem('watched'))
  if(module.init().os.name==='iPad'){
    refs.main.innerHTML = array2.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }else{
  refs.main.innerHTML = array2.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }
  refs.modal.classList='modal'
  if(refs.main.children.length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
  Swal.fire(
    'Film was removed from "watched"',
    'click "ok"',
    'success'
  )
  })
}
refs.removeLocalWatched.addEventListener('click', removeFromLocalWatched)

const removeFromLocalQueu =(e)=>{
  thisId3 = document.querySelector('.film_title_modal').dataset.id
  fetch(`https://api.themoviedb.org/3/movie/${thisId3}?api_key=e9f6322f77334e3f0406d6b8eabd79ce`).then(response => {
    if(response.ok){
      return response.json();
    }
  }).then(data => {
  array1=JSON.parse(localStorage.getItem('queu'))
  let arrayPre=[];
  array1.map(elem=> arrayPre.push(elem.id))
  let index1=arrayPre.indexOf(data.id)
  console.log('index: '+index1)
  if (index1 > -1) {
    array1.splice(index1, 1);
  }
  localStorage.setItem('queu', JSON.stringify(array1))
  let array2=JSON.parse(localStorage.getItem('queu'))
  console.log('length: '+refs.main.children.length)
  if(module.init().os.name==='iPad'){
    refs.main.innerHTML = array2.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main2" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }else{
  refs.main.innerHTML = array2.map(elem => refs.main.innerHTML = `<li class="film" data-id="${elem.id}"><div class="title_box"><h2 class="title">${elem.original_title}</h2></div><img class="image_main" src="https://image.tmdb.org/t/p/w300/${elem.poster_path}"/></li>`).join('')
  }
  refs.modal.classList='modal'
  if(refs.main.children.length<1){
    refs.main.innerHTML=`<div class='empty'></div>`
  }
  Swal.fire(
    'Film was removed from "queu"',
    'click "ok"',
    'success'
  )
  })
}
refs.removeLocalQueu.addEventListener('click', removeFromLocalQueu)

if(localStorage.getItem('theme') === 'dark-theme'){
  refs.tumbler.checked = true;
  refs.body.classList.add('dark-body')
  refs.main.classList.add('dark-ul')
  refs.content.classList.add('dark-content')
  refs.search.classList.add('dark-body')
  refs.submit.classList.add('dark-button')
  refs.home.classList.add('dark-button')
  refs.library.classList.add('dark-button')
  refs.next.classList.add('dark-button')
  refs.previous.classList.add('dark-button')
  refs.watchedButton.classList.add('dark-button')
  refs.queuButton.classList.add('dark-button')
  refs.removeLocalWatched.classList.add('dark-button')
  refs.removeLocalQueu.classList.add('dark-button')
  refs.libraryQueu.classList.add('dark-button')
  refs.libraryWatched.classList.add('dark-button')

  refs.body.classList.remove('light-body')
  refs.main.classList.remove('light-ul')
  refs.content.classList.remove('light-content')
  refs.search.classList.remove('light-body')
  refs.submit.classList.remove('light-button')
  refs.home.classList.remove('light-button')
  refs.library.classList.remove('light-button')
  refs.next.classList.remove('light-button')
  refs.previous.classList.remove('light-button')
  refs.watchedButton.classList.remove('light-button')
  refs.queuButton.classList.remove('light-button')
  refs.removeLocalWatched.classList.remove('light-button')
  refs.removeLocalQueu.classList.remove('light-button')
  refs.libraryQueu.classList.remove('light-button')
  refs.libraryWatched.classList.remove('light-button')
} else if(localStorage.getItem('theme') === 'light-theme'){
    refs.content.classList.add('light-content')

    refs.content.classList.remove('dark-content')
  }


const themeChange = (e) => {
  e.preventDefault();
  if(refs.tumbler.checked === true){
      localStorage.setItem('theme', 'dark-theme')
      refs.tumbler.checked = true;
  refs.body.classList.add('dark-body')
  refs.main.classList.add('dark-ul')
  refs.content.classList.add('dark-content')
  refs.search.classList.add('dark-body')
  refs.submit.classList.add('dark-button')
  refs.home.classList.add('dark-button')
  refs.library.classList.add('dark-button')
  refs.next.classList.add('dark-button')
  refs.previous.classList.add('dark-button')
  refs.watchedButton.classList.add('dark-button')
  refs.queuButton.classList.add('dark-button')
  refs.removeLocalWatched.classList.add('dark-button')
  refs.removeLocalQueu.classList.add('dark-button')
  refs.libraryQueu.classList.add('dark-button')
  refs.libraryWatched.classList.add('dark-button')
  
  refs.body.classList.remove('light-body')
  refs.main.classList.remove('light-ul')
  refs.content.classList.remove('light-content')
  refs.search.classList.remove('light-body')
  refs.submit.classList.remove('light-button')
  refs.home.classList.remove('light-button')
  refs.library.classList.remove('light-button')
  refs.next.classList.remove('light-button')
  refs.previous.classList.remove('light-button')
  refs.watchedButton.classList.remove('light-button')
  refs.queuButton.classList.remove('light-button')
  refs.removeLocalWatched.classList.remove('light-button')
  refs.removeLocalQueu.classList.remove('light-button')
  refs.libraryQueu.classList.remove('light-button')
  refs.libraryWatched.classList.remove('light-button')
  } else if(refs.tumbler.checked === false){
      localStorage.setItem('theme', 'light-theme')
      refs.tumbler.checked = false;
  refs.body.classList.add('light-body')
  refs.main.classList.add('light-ul')
  refs.content.classList.add('light-content')
  refs.search.classList.add('light-body')
  refs.submit.classList.add('light-button')
  refs.home.classList.add('light-button')
  refs.library.classList.add('light-button')
  refs.next.classList.add('light-button')
  refs.previous.classList.add('light-button')
  refs.watchedButton.classList.add('light-button')
  refs.queuButton.classList.add('light-button')
  refs.removeLocalWatched.classList.add('light-button')
  refs.removeLocalQueu.classList.add('light-button')
  refs.libraryQueu.classList.add('light-button')
  refs.libraryWatched.classList.add('light-button')

  refs.body.classList.remove('dark-body')
  refs.main.classList.remove('dark-ul')
  refs.content.classList.remove('dark-content')
  refs.search.classList.remove('dark-body')
  refs.submit.classList.remove('dark-button')
  refs.home.classList.remove('dark-button')
  refs.library.classList.remove('dark-button')
  refs.next.classList.remove('dark-button')
  refs.previous.classList.remove('dark-button')
  refs.watchedButton.classList.remove('dark-button')
  refs.queuButton.classList.remove('dark-button')
  refs.removeLocalWatched.classList.remove('dark-button')
  refs.removeLocalQueu.classList.remove('dark-button')
  refs.libraryQueu.classList.remove('dark-button')
  refs.libraryWatched.classList.remove('dark-button')
  }
  console.log(refs.tumbler.checked)
}
refs.tumbler.addEventListener('change', themeChange)