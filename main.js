let onsale_main = document.querySelector('.mn1')
let mn1_h2 = document.querySelector(".mn1_h2")
let onsale_main2 = document.querySelector('.mn2')
let liked = document.querySelector(".liked")
let swiper = document.querySelector(".swiper")
let swiper2 = document.querySelector('.swiper2')
let logo = document.querySelector(".logo")
let date_day = new Date()
const rub = 138.26
let reg_phone = document.querySelector('.reg_phone')
let top_chat = document.querySelector(".top-chat")
let toBottom = document.querySelector(".toBottom")
let ot_and_do = document.querySelectorAll('.ot_and_do')
let cart_page = document.querySelector(".cart_page")
let phone_search = document.querySelector('.phone-search')
let product_page = document.querySelector(".product_page")
let cart_btn = document.querySelector(".cart_btn")
let cart_hover = document.querySelector('.cart_hover')
let filter_grid = document.querySelector('.filter_grid')
let amount_phone = document.querySelector('.amount_phone')
let no_tovar = document.querySelector('.no_tovar')
let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
let right_1 = 0
let right_2 = 0
let right_3 = 0
let right_4 = 0
let all_amount = document.querySelector('.all_amount')
let all_price = document.querySelector('.all_price')
let all_price_with_discount = document.querySelector('.all_price_with_discount')
let only_discount = document.querySelector('.only_discount')
let toggle_checkbox = document.querySelector('.toggle-checkbox')
let like = undefined
let arr_liked = [] //массив с любимыми товарами
let arr_basket = []
let check = []
console.log(localStorage.getItem('account'));
let obj_acc = undefined
if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
  obj_acc = JSON.parse(localStorage.getItem('account'))
}
fetch('https://ayub-market-default-rtdb.firebaseio.com/user.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let foundObject = data.find(function (item) {
      return item.email === obj_acc.email;
    });
    arr_liked = JSON.parse(foundObject.liked)
    arr_basket = JSON.parse(foundObject.basket)
    obj_acc = foundObject
    localStorage.setItem('account', JSON.stringify(obj_acc))
    showed_basket(arr_basket, check)
  })
setTimeout(() => {
  fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
    .then(res => res.json())
    .then(data => {
      for (let item of data.goods) {
        item.price = parseInt(item.price * rub)
        if (item.salePercentage == 0) {
          item.salePercentage = 72
        }
        if (item.isBlackFriday == true) {
          spy_liked(item)
          reload(onsale_main, item)
        }
        if (item.rating == 5) {
          spy_liked(item)
          reload(onsale_main2, item)
        }
      }
      basket()
      addToFav()
    })
}, 3000)
function spy_liked(obj) {
  let foundObject = arr_liked.find(ob => {
    return ob.id === obj.id;
  });
  if (foundObject) {
    like = 'one'
  } else {
    like = 'zero'
  }
}
function addToFav() {
  // Функция "Добавить в избранное"
  let heart = document.querySelectorAll('.heart')
  fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
    .then(res => res.json())
    .then(data => {
      for (let item of data.goods) {
        item.price = parseInt(item.price * rub)
      }
      for (let it of heart) {
        it.onclick = () => {
          if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
            if (it.id == `zero`) {
              for (let item of data.goods) {
                if (item.id == it.getAttribute("fresh")) {
                  arr_liked.push(item)
                }
              }
              //add
              if (liked.style.display == 'grid' || liked.style.display == 'flex') {
                user_personals[1].click()
              }
              let fresh = document.querySelectorAll(`[fresh="${it.getAttribute('fresh')}"]`)
              for (let item of fresh) {
                item.id = "one"
              }
              change_like_sever(arr_liked)
              //
            } else {
              for (let item of data.goods) {
                if (item.id == it.getAttribute("fresh")) {
                  arr_liked = arr_liked.filter(function (obj) {
                    return obj.id !== item.id;
                  });
                }
              }
              //delete
              if (liked.style.display == 'grid' || liked.style.display == 'flex') {
                user_personals[1].click()
              }
              let fresh = document.querySelectorAll(`[fresh="${it.getAttribute('fresh')}"]`)
              for (let item of fresh) {
                item.id = "zero"
              }
              change_like_sever(arr_liked)
              //
            }
          } else {
            user_personals[0].click()
          }
        }
      }
    }) // конец функции добавить в избранное
  let imgs = document.querySelectorAll("img")
  imgs.forEach(image => {
    image.setAttribute("draggable", "false")
  });
}
let user_personals = document.querySelectorAll(".user_personal")
let register_modal = document.querySelector('.register_modal')
let register_modal_close = document.querySelector(".register_modal_close")
let register = document.querySelector(".register")
let log_in = document.querySelector(".log_in")
register_modal_close.onclick = () => {
  body.style.overflow = "visible"
  register_modal.style.opacity = "0"
  register.style.transform = "translateY(50%)";

  setTimeout(() => {
    register_modal.style.display = "none"
  }, 1000);
  // 
}
user_personals[1].onclick = () => {
  mn1_h2.style.display = "none"
  main_search.value = ''
  phone_search.value = ''
  onsale_main.style.display = "none"
  for (let item of menu_children) {
    item.classList.remove('active-bottom-menu')
  }
  menu_children[3].classList.add('active-bottom-menu')
  liked.style.display = "grid"
  swiper.style.display = "none"
  swiper2.style.display = "none"
  cart_page.style.display = "none"
  product_page.style.display = "none"
  filter_page.style.display = 'none'
  no_tovar.style.display = 'none'
  if (arr_liked.length != 0) {
    liked.innerHTML = ""
    liked.classList.remove('margt')
    liked.classList.add('grid')
    for (let item of arr_liked) {
      spy_liked(item)
      reload(liked, item)
    }
    basket()
    addToFav()
  } else {
    liked.classList.remove('grid')
    liked.style.display = 'flex'
    liked.classList.add('margt')
    if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
      liked.innerHTML = `
      <img width="150px" src="https://uzum.uz/static/img/hearts.cf414be.png" alt="">
      <h2>Добавьте то, что понравилось</h2>
      <p>Перейдите на главную страницу и нажмите на ♡ в товаре</p>`
    } else {
      liked.innerHTML = `
      <img width="150px" src="https://uzum.uz/static/img/hearts.cf414be.png" alt="">
      <h2>Добавьте то, что понравилось</h2>
      <p>Нажмите на ♡ в товаре. Войдите в аккаунт и всё избранное сохранится</p>
      <button class="log_in_btn log_in" id="log">Войти в аккаунт</button>`
    }
    let log_in_btn = document.querySelector('#log')
    log_in_btn.onclick = () => {
      user_personals[0].click()
    }
  }
}
logo.onclick = () => {
  for (let item of menu_children) {
    item.classList.remove('active-bottom-menu')
  }
  menu_children[0].classList.add('active-bottom-menu')
  main_search.value = ''
  phone_search.value = ''
  filter_page.style.display = 'none'
  mn1_h2.style.display = "block"
  onsale_main.style.display = "grid"
  liked.classList.remove('grid')
  swiper.style.display = "flex"
  if (document.body.offsetWidth < 981) {
    swiper2.style.display = "flex"
  }
  liked.style.display = "none"
  cart_page.style.display = "none"
  product_page.style.display = "none"
  no_tovar.style.display = 'none'
}

let chats = document.querySelectorAll('.chat')
let white_body = document.querySelector('.white_body')
for (let item of chats) {
  item.onclick = () => {
    if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
      white_body.style.display = 'flex'
      document.body.style.overflow = "hidden"
    } else {
      user_personals[0].click()
    }
  }
}
let comeback = document.querySelector('.comeback')
comeback.onclick = () => {
  white_body.style.display = 'none'
}
let send = document.querySelector('.send')
let input_chat = document.querySelector('.inputforchat')
let chat_block = document.querySelector('.chat_block')
// 
let answer = ''
async function askQuestion(question) {
  const apiKey = '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';
  const prompt = `Q: ${question}\nA:`;
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 150,
    }),
  });
  const data = await response.json();
  answer = data.choices[0].text.trim()
  if (answer != undefined) {
    chat_block.innerHTML += `<div class="message-block">
    <img src="data:image/png;base64,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" alt="" class="art-mess">
    <div class="message">
      <p>Assistаnt</p>
      ${answer}
    </div>
  </div>`
    chat_block.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })
    answer = ''
  }
}
input_chat.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    if (answer == '') {
      chatting()
    }
  }
});
send.onclick = () => {
  if (answer == '') {
    chatting()
  }
}

top_chat.onclick = () => {
  white_body.style.display = 'none'
  document.body.style.overflow = "visible"
}
function chatting() {
  chat_block.onclick = () => {
    setTimeout(() => {
      chat_block.lastElementChild.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    }, 1);
  }
  if (input_chat.value != '') {
    let m = 'https://cdn1.iconfinder.com/data/icons/sport-94/550/volley-256.png'
    let objt = JSON.parse(localStorage.getItem('account'))
    if (objt.image != 'https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-256.png' && objt.image != undefined) {
      m = objt.image
    } else {
      m = 'https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-256.png'
    }
    chat_block.scrollTop = chat_block.scrollHeight
    chat_block.innerHTML += `<div class="message-block mess-left">
    <div class="message">
      <p>You</p>
      ${input_chat.value}
    </div>
    <img src="${m}" alt="" class="art-mess">
  </div>`
    chat_block.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })
    askQuestion(input_chat.value);
    chat_block.scrollTop = chat_block.scrollHeight
    input_chat.value = ''
  }
}
// registr
let arr_accounts = []
let get_code = document.querySelector('.register')
let inp_acc = document.querySelectorAll('.inp_acc')
let permission = false
function add_account(arr) {
  for (let item of arr) {
    if (item.email == inp_acc[2].value) {
      alert("Аккаунт с такой почтой уже занят !")
    } else {
      permission = true
    }
  }
  if (permission == true) {
    let obj = {
      name: inp_acc[0].value,
      password: inp_acc[1].value,
      email: inp_acc[2].value,
    }
    localStorage.setItem("account", JSON.stringify(obj))
    arr.push(obj)
    fetch(`https://ayub-market-default-rtdb.firebaseio.com/user.json`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json.charset=utf-8'
      },
      body: JSON.stringify(arr)
    })
      .then(res => res.json())
    permission = false
    setTimeout(() => {
      location.reload()
    }, 1500)
  }
}
let get_code_btn = document.querySelectorAll('.get_code')
let id_btn = ''
for (let item of get_code_btn) {
  item.onclick = () => {
    id_btn = item.value
  }
}
let third_object;
fetch('https://ayub-market-default-rtdb.firebaseio.com/user.json')
  .then(res => res.json())
  .then(data => {
    if (data != undefined) {
      arr_accounts.push(data)
      get_code.onsubmit = (e) => {
        e.preventDefault()
        if (id_btn == 'Войти') {
          loged(arr_accounts[0])
        } else if (id_btn == 'Зарегистрироваться') {
          add_account(arr_accounts[0])
        }
      }
    } else {
      localStorage.setItem('account', 'havent')
      permission = true
      get_code.onsubmit = (e) => {
        e.preventDefault()
        if (id_btn == 'Войти') {
          loged(arr_accounts)
        } else if (id_btn == 'Зарегистрироваться') {
          add_account(arr_accounts)
        }
      }
    }
  })
let leave_phone_ac = document.querySelector('.leave-phone-ac')
if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
  let obj_acc = JSON.parse(localStorage.getItem('account'))
  fetch('https://ayub-market-default-rtdb.firebaseio.com/user.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let foundObject = data.find(function (item) {
        return item.email === obj_acc.email;
      });
      obj_acc = foundObject
      localStorage.setItem('account', JSON.stringify(obj_acc))
    })
  let lo = document.getElementById("lo")
  lo.style.display = 'none'
  log_in.onclick = () => {
    location.assign("/registor.html")
  }
  leave_phone_ac.style.display = 'flex'
  reg_phone.children[0].innerHTML = '<img src="https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-256.png" style="width: 24px; height: 24px;"> Профиль'
} else {
  leave_phone_ac.style.display = 'none'
  log_in.onclick = () => {
    body.style.overflow = "hidden"
    register_modal.style.display = "block"
    setTimeout(() => {
      register.style.transform = "translateY(0%)";
      register_modal.style.opacity = "1"
    }, 100);
  }
}
function loged(arr) {
  let obj = {
    name: inp_acc[0].value,
    password: inp_acc[1].value,
    email: inp_acc[2].value,
  }
  if (arr.length < 1) {
    alert("Аккаунт не найден !")
  } else {
    for (let item of arr) {
      if (obj.name == item.name && obj.email == item.email && obj.password == item.password) {
        localStorage.setItem('account', JSON.stringify(item))
        setTimeout(() => {
          location.reload()
        }, 1500)
      } else {
        setTimeout(() => {
          alert("Аккаунт не найден !")
        }, 2000)
      }
    }
  }
}
async function reload(place, item) {
  let colors = Object.values(item.colors)
  colors = JSON.stringify(colors)
  colors = colors.replace(/\s/g, "")
  if (item.salePercentage == 0) {
    item.salePercentage = 72
  }
  place.innerHTML += `<div id="${item.id}" class="onsale_item" col='${colors}'>
  <div id="${item.id}" class="onsale_item_img" style="background-image: url(${item.media[0]});"></div>
  <div class="heart" id="${like}" fresh="${item.id}">
  <svg data-v-ff0a7354="" width="20" height="20" class="heart_not_active" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" alt="like" class="ui-icon ">
  <path d="M5.95 2C8.51792 2 10 4.15234 10 4.15234C10 4.15234 11.485 2 14.05 2C16.705 2 19 4.07 19 6.95C19 11.1805 12.5604 15.6197 10.3651 17.5603C10.1582 17.7432 9.84179 17.7432 9.63488 17.5603C7.44056 15.6209 1 11.1803 1 6.95C1 4.07 3.295 2 5.95 2Z" fill="white" fill-opacity="0.8"></path>
  <path d="M1 6.86486C1 4.20297 3.15017 2 5.86486 2C7.98685 2 9.35921 3.35876 10 4.18673C10.6408 3.35876 12.0132 2 14.1351 2C16.8506 2 19 4.20302 19 6.86486C19 8.02987 18.5328 9.18622 17.8534 10.265C17.1716 11.3476 16.252 12.3903 15.29 13.3377C13.9567 14.6508 12.4757 15.8387 11.4134 16.6907C10.9618 17.0529 10.5859 17.3544 10.3293 17.579C10.1407 17.7439 9.85926 17.7439 9.67075 17.579C9.41405 17.3544 9.03815 17.0529 8.58659 16.6907C7.52431 15.8387 6.04326 14.6508 4.70997 13.3377C3.74802 12.3903 2.82836 11.3476 2.14659 10.265C1.46724 9.18622 1 8.02987 1 6.86486ZM5.86486 3C3.70929 3 2 4.74838 2 6.86486C2 7.76743 2.36553 8.73607 2.99277 9.73208C3.61759 10.7242 4.47833 11.706 5.41165 12.6252C6.71033 13.9042 8.08423 15.005 9.13396 15.8461C9.45728 16.1052 9.74985 16.3396 10 16.547C10.2501 16.3396 10.5427 16.1052 10.866 15.8461C11.9158 15.005 13.2897 13.9042 14.5883 12.6252C15.5217 11.706 16.3824 10.7242 17.0072 9.73208C17.6345 8.73607 18 7.76743 18 6.86486C18 4.74833 16.2914 3 14.1351 3C12.0406 3 10.8181 4.70211 10.5033 5.21028C10.2727 5.5825 9.72727 5.58249 9.4967 5.21027C9.1819 4.7021 7.95944 3 5.86486 3Z" fill="#15151A"></path>
  </svg>
  <img src="./img/uzum.uz_ru__1_-removebg-preview.png" class="active-heart-image">
  </div>
  <div class="onsale_item_text">
    <p class="item_title">${item.title}</p>
    <p style="color: #989BA5;"><span style="color: #FDB44B;">★</span> ${item.rating} (? оценок)</p>
    <span class="rassrochka">
      <p>${parseInt(Math.ceil(item.price / 100 * (100 - item.salePercentage)) / 8).toLocaleString()} сум/мес</p>
    </span>
    <div class="add_cart_block">
      <div>
        <p class="without_sale">${item.price.toLocaleString()} сум</p>
        <p>${Math.ceil(item.price / 100 * (100 - item.salePercentage)).toLocaleString()} сум</p>
      </div>
      <img id="${item.id}" class="add_cart" width="24px"
        src="https://cdn1.iconfinder.com/data/icons/actnia-ecommerce-delivery/24/bag-add-256.png" alt="">
    </div>
  </div>
</div>`
  let product_img = document.querySelector(".cart_page_left img")
  let product_name = document.querySelector(".cart_page_mainfo h2")
  let rate = document.querySelector(".cart_page_rating p")
  let heart = document.querySelectorAll('.heart')
  let onsale_items = document.querySelectorAll(".onsale_item_img")
  onsale_items.forEach(elem => {
    heart.forEach(hert => {
      document.addEventListener('DOMContentLoaded', function () {
        var allowedArea = document.getElementById('allowedArea');
        document.addEventListener('click', function (event) {
          // Проверяем, находится ли элемент, по которому кликнули, внутри разрешенной области
          if (event.target.closest(elem)) {
            alert('Click allowed in the allowed area!');
          } else {
            alert('Click disabled in the disallowed area!');
            event.preventDefault(); // Предотвращаем выполнение действия
          }
        });
      });
    })
    elem.onclick = () => {
      main_search.value = ''
      phone_search.value = ''
      for (let item of menu_children) {
        item.classList.remove('active-bottom-menu')
      }
      inp_basket2.value = 1
      if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
        fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
          .then(res => res.json())
          .then(data => {
            for (let item of data.goods) {
              item.price = parseInt(item.price * rub)
            }
            let finded = data.goods.find(element => {
              return element.id == elem.id
            })
            third_object = finded
            let countsit = document.querySelectorAll('.countsit')
            countsit.forEach(it => {
              it.onclick = () => {
                count_in_third_page(it.innerHTML)
              }
            });
            let title_third = document.querySelector('.title_third')
            title_third.innerHTML = `${third_object.title}`
            let inp_basket2 = document.querySelector('.inp_basket2')
            inp_basket2.onchange = () => {
              if (inp_basket2.value < 1) {
                inp_basket2.value = 1
              } else if (inp_basket2.value >= 100) {
                inp_basket2.value = 100
              }
              prov2()
            }
            product_img.src = finded.media[0]
            product_name.innerHTML = finded.title
            prov2()
            rate.innerHTML = `<span style="color: #FDB44B;">★</span>${finded.rating}`
          })
        mn1_h2.style.display = "none"
        onsale_main.style.display = "none"
        liked.style.display = 'none'
        swiper.style.display = "none"
        swiper2.style.display = "none"
        liked.classList.remove('grid')
        cart_page.style.display = "none"
        product_page.style.display = "flex"
        filter_page.style.display = 'none'
        no_tovar.style.display = 'none'
      } else {
        user_personals[0].click()
      }
    }
  });
  let imgs = document.querySelectorAll("img")
  imgs.forEach(image => {
    image.setAttribute("draggable", "false")
  });
}
let go_in_basket = document.querySelector('.go_in_basket')
go_in_basket.onclick = () => {
  user_personals[2].click()
}
function basket() {
  let add_carts = document.querySelectorAll(".add_cart")
  for (let item of add_carts) {
    item.onclick = () => {
      if (localStorage.getItem("account") != 'havent' && localStorage.getItem("account") != null) {
        if (no_tovar.style.display != 'none') {
          cart_page.style.display = 'flex'
        }
        no_tovar.style.display = 'none'
        if (localStorage.getItem("active_page") == "cart") {
          cart_page.style.display = "flex"
        }
        fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
          .then(res => res.json())
          .then(data => {
            for (let item of data.goods) {
              item.price = parseInt(item.price * rub)
            }
            let finded = data.goods.find(element => {
              return element.id == item.id
            })
            let foundObject = arr_basket.find(function (item) {
              return item.id === finded.id;
            });
            if (foundObject) {
              if (foundObject.amount < 100) {
                foundObject.amount += 1
                change_basket_sever(arr_basket)
                showed_basket(arr_basket, check)
              }
            } else {
              finded.amount = 1
              arr_basket.push(finded)
              change_basket_sever(arr_basket)
              showed_basket(arr_basket, check)
            }
            let item_added_modal = document.querySelector('.item_added_modal')
            item_added_modal.style = 'animation: appearFromTop 1.5s linear forwards;'
            let fast_dissapear_img = document.querySelector('.fast_dissapear_img')
            fast_dissapear_img.src = finded.media[0]
            let fast_dissapear_title = document.querySelector('.fast_dissapear_title')
            fast_dissapear_title.innerHTML = finded.title
            setTimeout(() => {
              item_added_modal.style = ''
            }, 1500)
            if (document.body.offsetWidth < 981) {
              notification.style.display = 'flex';
              setTimeout(function () {
                notification.style.display = 'none';
              }, 2000);
            }
          })
      } else {
        user_personals[0].click()
      }
    }
  }
}
function showed_basket(arr, checkt) {
  let cart_hover_items = document.querySelector(".cart_hover_items")
  cart_hover_items.innerHTML = ''
  let cart_page_items = document.querySelector(".cart_page_items")
  let day = date_day.getDate() + 1
  let month = months[date_day.getMonth()]
  let date = document.querySelectorAll('.date')
  date.forEach(da => {
    da.innerHTML = ` ${day} ${month} (Завтра)`
  })
  cart_page_items.innerHTML = ''
  for (let item of arr) {
    if (item.salePercentage == 0) {
      item.salePercentage = 72
    }
    let price_with = Math.ceil(item.price / 100 * (100 - item.salePercentage))
    cart_hover_items.innerHTML += ` <div class="cart_hover_item" id="${item.id}">
    <img width="30px"
      src="${item.media[0]}"
      alt="">
    <div class="text_place">
      <p class="text_place_name">${item.title}</p>
      <p>${(price_with * item.amount).toLocaleString()} сум <span>x${item.amount.toLocaleString()}</span></p>
    </div>
    <img class="cart_hover_item_remove" width="14px"
      src="https://cdn4.iconfinder.com/data/icons/business-finance-vol-12-2/512/25-256.png" alt="">
  </div>`
    let color = Object.values(item.colors)
    color = color.join(", ")
    let checker = ''
    for (let it of checkt) {
      if (it == item.id) {
        checker = 'checked'
      }
    }
    cart_page_items.innerHTML += `<div class="cart_page_item" id="${item.id}">
  <input class="dependent-checkbox" type="checkbox" ${checker}>
  <img width="100px" src="${item.media[0]}" alt="">
  <div class="w-kor">
    <p>${item.title}</p>
    <p>Цвет: ${color}</p>
  </div>
  <div class="kol-vo">
    <button class="btns_count">+</button>
    <input type="number" class="inp_basket" value="${item.amount.toLocaleString()}">
    <button class="btns_count">-</button>
  </div>
  <div class="price_block">
    <p>${(price_with * item.amount).toLocaleString()} сум</p>
    <p class="without_sale">${(item.price * item.amount).toLocaleString()} сум</p>
  </div>
  <buton class="cart_page_item_delblock_btn">
    <svg data-v-1a3a46a8="" width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" class="ui-icon  filled">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M9.75 3.5C9.33579 3.5 9 3.83579 9 4.25V5H15V4.25C15 3.83579 14.6642 3.5 14.25 3.5H9.75ZM7.5 4.25V5H3.75C3.33579 5 3 5.33579 3 5.75C3 6.16421 3.33579 6.5 3.75 6.5H4.30005L5.62088 19.9681C5.73386 21.1202 6.70255 21.9985 7.86014 21.9985H16.1399C17.2975 21.9985 18.2661 21.1202 18.3791 19.9681L19.7 6.5H20.25C20.6642 6.5 21 6.16421 21 5.75C21 5.33579 20.6642 5 20.25 5H16.5V4.25C16.5 3.00736 15.4926 2 14.25 2H9.75C8.50736 2 7.5 3.00736 7.5 4.25ZM11 9.75C11 9.33579 10.6642 9 10.25 9C9.83579 9 9.5 9.33579 9.5 9.75V17.25C9.5 17.6642 9.83579 18 10.25 18C10.6642 18 11 17.6642 11 17.25V9.75ZM14.5 9.75C14.5 9.33579 14.1642 9 13.75 9C13.3358 9 13 9.33579 13 9.75V17.25C13 17.6642 13.3358 18 13.75 18C14.1642 18 14.5 17.6642 14.5 17.25V9.75Z"
        fill="black"></path>
    </svg>
    <p>Удалить</p>
  </buton>
</div>`
  }
  let amount_tovar = document.querySelector('.amount_tovar')
  amount_tovar.innerHTML = `количество товаров: ${arr.length.toLocaleString()}`
  let btns_count = document.querySelectorAll('.btns_count')
  for (let item of btns_count) {
    item.onclick = () => {
      count_in_basket(item.innerHTML, item.parentElement.parentElement.id)
    }
  }
  let inp_basket = document.querySelectorAll('.inp_basket')
  for (let item of inp_basket) {
    item.onchange = () => {
      if (item.value < 1) {
        item.value = 1
      } else if (item.value >= 100) {
        item.value = 100
      }
      inp_bask(parseInt(item.value), item.parentElement.parentElement.id)
    }
  }
  let cart_hover_item_remove = document.querySelectorAll('.cart_hover_item_remove')
  let cart_page_item_delblock_btn = document.querySelectorAll('.cart_page_item_delblock_btn')
  give_f(cart_hover_item_remove)
  give_f(cart_page_item_delblock_btn)
  function give_f(arr) {
    for (let item of arr) {
      item.onclick = () => {
        delete_basket(item.parentElement.id)
      }
    }
  }
  let dependent_checkbox = document.querySelectorAll('.dependent-checkbox')
  toggle_checkbox.onclick = () => {
    if (toggle_checkbox.checked == true) {
      dependent_checkbox.forEach(checkbox => {
        checkbox.checked = true
        check = []
        for (let tiem of arr_basket) {
          check.push(tiem.id)
        }
      })
    } else {
      dependent_checkbox.forEach(checkbox => {
        checkbox.checked = false
        check = []
      })
    }
    prov()
    top_g()
  }
  function prov() {
    let allChecked = true;
    dependent_checkbox.forEach(checkbox => {
      if (!checkbox.checked) {
        allChecked = false;
      }
    });
    if (allChecked) {
      toggle_checkbox.checked = true
      toggle_checkbox.nextElementSibling.innerHTML = 'Снять все'
    } else {
      toggle_checkbox.checked = false
      toggle_checkbox.nextElementSibling.innerHTML = 'Выбрать все'
    }
  }
  prov()
  for (let item of dependent_checkbox) {
    top_g()
    item.onclick = () => {
      if (item.checked == true) {
        check.push(item.parentElement.id)
      } else {
        for (let it of check) {
          if (it == item.parentElement.id) {
            check = check.filter(obj => obj != it);
          }
        }
      }
      top_g()
      prov()
    }
  }
  if (arr_basket.length > 0) {
    amount_phone.style.display = 'flex'
    amount_phone.innerHTML = arr_basket.length
  } else {
    amount_phone.style.display = 'none'
  }
}
function top_g() {
  right_1 = 0
  right_2 = 0
  right_3 = 0
  right_4 = 0
  for (let g of check) {
    for (let it of arr_basket) {
      if (it.id == g) {
        right_1 += 1
        right_2 += it.price * it.amount
        right_3 += Math.ceil(it.price / 100 * (100 - it.salePercentage)) * it.amount
        right_4 += right_2 - right_3
      }
    }
  }
  all_amount.innerHTML = `Товары (${right_1.toLocaleString()}):`
  all_price.innerHTML = `${right_2.toLocaleString()} сум`
  all_price_with_discount.innerHTML = `${right_3.toLocaleString()} сум`
  only_discount.innerHTML = `Вы экономите: ${right_4.toLocaleString()} сум`
}
function inp_bask(val, aydi) {
  for (let item of arr_basket) {
    if (item.id == aydi) {
      item.amount = val
      change_basket_sever(arr_basket)
      showed_basket(arr_basket, check)
    }
  }
}
function count_in_basket(str, aydi) {
  if (str == '+') {
    for (let item of arr_basket) {
      if (item.id == aydi) {
        if (item.amount < 100) {
          item.amount += 1
          change_basket_sever(arr_basket)
          showed_basket(arr_basket, check)
        }
      }
    }
  } else if (str == '-') {
    for (let item of arr_basket) {
      if (item.id == aydi) {
        if (item.amount > 1) {
          item.amount -= 1
          change_basket_sever(arr_basket)
          showed_basket(arr_basket, check)
        }
      }
    }
  }
}
function delete_basket(idToDelete) {
  arr_basket = arr_basket.filter(obj => obj.id != idToDelete);
  change_basket_sever(arr_basket)
  showed_basket(arr_basket, check)
  if (arr_basket.length < 1) {
    if (cart_page.style.display != 'none') {
      cart_btn.click()
    }
  }
}
cart_btn.onmouseenter = () => {
  if (arr_basket.length > 0) {
    cart_hover.style.display = "block"
    cart_hover.onmouseenter = () => {
      cart_hover.style.display = "block"
      cart_hover.onmouseleave = () => {
        cart_hover.style.display = "none"
        return
      }
      return
    }
    cart_btn.onmouseleave = () => {
      cart_hover.style.display = "none"
    }
  }
}
cart_btn.onclick = () => {
  filter_page.style.display = "none"
  mn1_h2.style.display = "none"
  for (let item of menu_children) {
    item.classList.remove('active-bottom-menu')
  }
  menu_children[2].classList.add('active-bottom-menu')
  onsale_main.style.display = "none"
  main_search.value = ''
  phone_search.value = ''
  liked.classList.remove('grid')
  swiper.style.display = "none"
  swiper2.style.display = "none"
  liked.style.display = "none"
  cart_page.style.display = "flex"
  product_page.style.display = "none"
  no_tovar.style.display = 'none'
  if (arr_basket.length == 0) {
    no_tovar.style.display = 'flex'
    cart_page.style.display = "none"
  }
}
function toggleCheckboxes(mainCheckbox) {
  // Получаем все зависимые чекбоксы
  var dependentCheckboxes = document.getElementsByClassName('dependent-checkbox');

  // Проходимся по всем зависимым чекбоксам и устанавливаем их состояние в соответствии с основным чекбоксом
  for (var i = 0; i < dependentCheckboxes.length; i++) {
    dependentCheckboxes[i].checked = mainCheckbox.checked;
  }
}


let inp_basket2 = document.querySelector('.inp_basket2')
function count_in_third_page(str) {
  if (str == '+') {
    if (parseInt(inp_basket2.value) < 100) {
      inp_basket2.value = parseInt(inp_basket2.value) + 1
    }
  } else if (str == '-') {
    if (parseInt(inp_basket2.value) > 1) {
      inp_basket2.value = parseInt(inp_basket2.value) - 1
    }
  }
  prov2()
}
function prov2() {
  let price_third = document.querySelector('.price_third')
  let sale_third = document.querySelector('.sale_third')
  let rass_third = document.querySelector('.rass_third')
  if (third_object.salePercentage == 0) {
    third_object.salePercentage = 72
  }
  price_third.innerHTML = `от ${(Math.ceil(third_object.price / 100 * (100 - third_object.salePercentage)) * parseInt(inp_basket2.value)).toLocaleString()} сум`
  sale_third.innerHTML = `${(third_object.price * parseInt(inp_basket2.value)).toLocaleString()} сум`
  rass_third.innerHTML = `${((Math.ceil(third_object.price / 100 * (100 - third_object.salePercentage)) / 8) * parseInt(inp_basket2.value)).toLocaleString()}`
}
let bas_added = document.querySelector('.bas_added')
bas_added.onclick = () => {
  let foundObject = arr_basket.find(function (item) {
    return item.id === third_object.id;
  });
  if (foundObject) {
    if (foundObject.amount < 100) {
      foundObject.amount = foundObject.amount + parseInt(inp_basket2.value)
      if (foundObject.amount > 99) {
        foundObject.amount = 100
      }
    }
    change_basket_sever(arr_basket)
    showed_basket(arr_basket, check)
  } else {
    third_object.amount = parseInt(inp_basket2.value)
    arr_basket.push(third_object)
    change_basket_sever(arr_basket)
    showed_basket(arr_basket, check)
  }
  let item_added_modal = document.querySelector('.item_added_modal')
  item_added_modal.style = 'animation: appearFromTop 1.5s linear forwards;'
  let fast_dissapear_img = document.querySelector('.fast_dissapear_img')
  fast_dissapear_img.src = third_object.media[0]
  let fast_dissapear_title = document.querySelector('.fast_dissapear_title')
  fast_dissapear_title.innerHTML = third_object.title
  setTimeout(() => {
    item_added_modal.style = ''
  }, 1500)
  if (document.body.offsetWidth < 981) {
    notification.style.display = 'flex';
    setTimeout(function () {
      notification.style.display = 'none';
    }, 2000);
  }
}
let katlink = document.querySelectorAll('.kat_link')
let f_tit = document.querySelector('.f_tit')
let filter_page = document.querySelector('.filter_page')
for (let it of katlink) {
  it.onclick = (e) => {
    for (let item of menu_children) {
      item.classList.remove('active-bottom-menu')
    }
    menu_children[1].classList.add('active-bottom-menu')
    no_tovar.style.display = 'none'
    filter_page.style.display = 'flex'
    mn1_h2.style.display = "none"
    onsale_main.style.display = "none"
    swiper.style.display = "none"
    swiper2.style.display = "none"
    cart_page.style.display = "none"
    product_page.style.display = "none"
    liked.style.display = 'none'
    if (it.innerHTML.search(f_tit.innerText) == -1) {
      e.preventDefault()
      main_search.value = ''
      phone_search.value = ''
      f_tit.innerText = it.innerHTML
      filter_grid.innerHTML = ``
      fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
        .then(res => res.json())
        .then(data => {
          for (let item of data.goods) {
            item.price = parseInt(item.price * rub)
            if (item.type == it.id) {
              spy_liked(item)
              reload(filter_grid, item)
            }
          }
          basket()
          addToFav()
          minmax(filter_grid)
        })
      clear_filters.click()
    }
  }
}
let to_homePage = document.querySelector('.to_homePage')
to_homePage.onclick = () => {
  logo.click()
}

let main_search = document.querySelector('.main_search')
phone_search.oninput = () => {
  main_search.value = phone_search.value
}
phone_search.onchange = () => {
  if (phone_search.value != '') {
    chan()
  } else {
    alert('Товаров не найдено!')
  }
}
main_search.addEventListener('change', chan)
function chan() {
  for (let item of menu_children) {
    item.classList.remove('active-bottom-menu')
  }
  menu_children[1].classList.add('active-bottom-menu')
  no_tovar.style.display = 'none'
  filter_page.style.display = 'flex'
  mn1_h2.style.display = "none"
  onsale_main.style.display = "none"
  swiper.style.display = "none"
  swiper2.style.display = "none"
  cart_page.style.display = "none"
  product_page.style.display = "none"
  liked.style.display = 'none'
  no_tovar.style.display = 'none'
  let socer = true
  let f_tit = document.querySelector('.f_tit')
  let filter_grid = document.querySelector('.filter_grid')
  filter_grid.innerHTML = ``
  if (main_search.value != '') {
    fetch("https://raw.githubusercontent.com/Daler-web-dev/mvideo/main/db.json")
      .then(res => res.json())
      .then(data => {
        for (let item of data.goods) {
          item.price = parseInt(item.price * rub)
          if (item.title.toLocaleLowerCase().search(main_search.value.toLocaleLowerCase().trim()) == -1) {
            f_tit.innerText = `Товары не найдены !`
          } else {
            socer = false
            spy_liked(item)
            reload(filter_grid, item)
          }
        }
        basket()
        addToFav()
        minmax(filter_grid)
        if (filter_grid.innerHTML != '') {
          f_tit.innerText = `Товары по запросу: "${main_search.value}"`
        }
        if (socer == true) {
          phone_search.value = "Не найдено!"
          setTimeout(() => {
            phone_search.value = ''
            katlink[2].click()
          }, 1000)
        }
      })
  }
  clear_filters.click()
}

let filter_color = document.querySelectorAll('.filter_color')
let colrs = []
for (let item of filter_color) {
  item.onclick = () => {
    if (item.className == 'filter_color act_block') {
      colrs = colrs.filter((color) => color !== item.id);
      console.log(colrs);
      if (colrs.length < 1) {
        clear_filters.click()
      } else {
        prov_color()
      }
      item.classList.remove('act_block')
    } else {
      colrs.push(item.id)
      prov_color()
      item.classList.add('act_block')
    }
    minmax(filter_grid)
  }
}
function prov_color() {
  if (filter_grid.children.length > 1) {
    for (let item of filter_grid.children) {
      item.style.display = 'none'
      for (let color of colrs) {
        if (item.getAttribute('col').search(color) != -1) {
          item.style.display = 'block'
        }
      }
    }
  }
}
let clear_filters = document.querySelector('.clear_filters')
clear_filters.onclick = () => {
  for (let item of filter_grid.children) {
    item.style.display = 'block'
  }
  for (let item of filter_color) {
    item.classList.remove("act_block")
  }
  colrs = []
  minmax(filter_grid)
}
let ar = []
let max_at = 0
let min_at = 0
function minmax(place) {
  found_price(place)
  max_at = Math.max(...ar)
  min_at = Math.min(...ar)
  if (max_at == -Infinity || min_at == Infinity) {
    max_at = 0
    min_at = 0
  }
  console.log(max_at, min_at);
  ot_and_do[0].value = min_at
  ot_and_do[1].value = max_at
}
function found_price(place) {
  ar = []
  if (place.children.length > 0) {
    for (let side of place.children) {
      if (side.style.display != 'none') {
        let som = side.children[2].lastElementChild.firstElementChild.lastElementChild
        som = som.innerHTML
        som = som.slice(0, -4)
        som = som.replace(/[ ,\&nbsp;]/g, '');
        console.log(som);
        som = parseInt(som)
        ar.push(som)
      }
    }
  }
}
ot_and_do.forEach(i => {
  i.onchange = () => {
    if (parseInt(i.value) < 0) {
      i.value = 0
    }
    if (parseInt(i.value) > max_at) {
      i.value = max_at
    }
    filter_color.forEach(color => {
      color.classList.remove('act_block')
    })
    if (i.id == 'ot') {
      found_price(filter_grid)
      for (let item of filter_grid.children) {
        item.style.display = 'none'
        let som = item.children[2].lastElementChild.firstElementChild.lastElementChild
        som = som.innerHTML
        som = som.slice(0, -4)
        som = som.replace(/[ ,\&nbsp;]/g, '');
        console.log(som);
        som = parseInt(som)
        if (som >= i.value) {
          let k = som.toString() + ' сум'
          if (item.children[2].lastElementChild.firstElementChild.lastElementChild.innerHTML == k) {
            item.style.display = 'block'
          }
        }
      }
      // 
    } else if (i.id == 'do') {
      if (parseInt(i.value) <= ot_and_do[0].value) {
        i.value = max_at
      }
      found_price(filter_grid)
      for (let item of filter_grid.children) {
        item.style.display = 'none'
        let som = item.children[2].lastElementChild.firstElementChild.lastElementChild
        som = som.innerHTML
        som = som.slice(0, -4)
        som = som.replace(/[ ,\&nbsp;]/g, '');
        console.log(som);
        som = parseInt(som)
        if (som <= i.value) {
          let k = som.toString() + ' сум'
          if (item.children[2].lastElementChild.firstElementChild.lastElementChild.innerHTML == k) {
            item.style.display = 'block'
          }
        }
      }
      // 
    }
  }
});

// for phone
let lyo = document.querySelector('.lyo')
lyo.onclick = () => {
  if (document.body.offsetWidth < 981) {
    let filter = document.querySelector('#filt')
    filter.style.left = `0%`
  }
}
let otmen = document.querySelector("#otmen")
otmen.onclick = () => {
  if (document.body.offsetWidth < 981) {
    let filter = document.querySelector('#filt')
    filter.style.left = `-100%`
  }
}
let menu_children = document.querySelectorAll('.menu_child')
let katlink2 = document.querySelectorAll('.katlink2')
for (let i = 0; i < katlink2.length; i++) {
  katlink2[i].onclick = () => {
    katlink[i].click()
  }
}
let my_kab = document.querySelector('.may_kab')
for (let i = 0; i < menu_children.length; i++) {
  menu_children[i].onclick = () => {
    for (let item of menu_children) {
      item.classList.remove('active-bottom-menu')
    }
    my_kab.style.display = 'none'
    if (i == 0) {
      logo.click()
    } else if (i == 1) {
      katlink[2].click()
    } else if (i == 2) {
      cart_btn.click()
    } else if (i == 3) {
      user_personals[1].click()
    } else if (i == 4) {
      my_kab.style.display = 'flex'
      menu_children[i].classList.add('active-bottom-menu')
    }
  }
}
reg_phone.onclick = () => {
  log_in.click()
}
let current_city = document.querySelector('.current_city')
let kab = document.querySelectorAll('.kab_item')
for (let i = 0; i < kab.length - 6; i++) {
  kab[i].onclick = () => {
    if (i == 0) {
      log_in.click()
    } else if (i == 2) {
      menu_children[2].click()
    } else if (i == 3) {
      menu_children[3].click()
    } else if (i == 4) {
      //
    } else if (i == 6) {
      chats[0].click()
    } else if (i == 8) {
      //
    } else {
      alert('Извините, но на данный момент функция не доступна')
    }
  }
}

leave_phone_ac.onclick = () => {
  localStorage.setItem('account', 'havent')
  setTimeout(() => {
    location.assign("/index.html")
  }, 1500)
}


async function change_like_sever(arr) {
  let obj_acc = JSON.parse(localStorage.getItem('account'))
  fetch('https://ayub-market-default-rtdb.firebaseio.com/user.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let foundObject = data.find(function (item) {
        return item.email === obj_acc.email;
      });
      foundObject.liked = JSON.stringify(arr)
      obj_acc = foundObject
      localStorage.setItem('account', JSON.stringify(obj_acc))
      fetch(`https://ayub-market-default-rtdb.firebaseio.com/user.json`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json.charset=utf-8'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
    })
}

async function change_basket_sever(arr) {
  let obj_acc = JSON.parse(localStorage.getItem('account'))
  fetch('https://ayub-market-default-rtdb.firebaseio.com/user.json')
    .then(res => res.json())
    .then(data => {
      let foundObject = data.find(function (item) {
        return item.email === obj_acc.email;
      });
      foundObject.basket = JSON.stringify(arr)
      obj_acc = foundObject
      localStorage.setItem('account', JSON.stringify(obj_acc))
      fetch(`https://ayub-market-default-rtdb.firebaseio.com/user.json`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json.charset=utf-8'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
    })
}
let animka = document.querySelector('.animka')
setTimeout(()=>{
  animka.style.opacity = 0
  setTimeout(()=>{
    animka.style.display = 'none'
  }, 1000)
}, 3000)