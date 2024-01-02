const uzbekistanCities = [
    "Аккурган",
    "Алмазар (Чиназский район)",
    "Алмалык",
    "Ангрен",
    "Андижан",
    "Асака",
    "Ахангаран",
    "Байсун",
    "Бекабад",
    "Бешарык",
    "Бухара",
    "Газалкент",
    "Галаасия",
    "Гиждуван",
    "Гузар",
    "Гулистан",
    "Дангара",
    "Денау",
    "Джалакудук",
    "Джизак",
    "Жондор",
    "Зангиота",
    "Зарафшан",
    "Ибрат",
    "Каган",
    "Каракитай",
    "Каракуль",
    "Карасу (Андижанская обл.)",
    "Караулбазар",
    "Карши",
    "Касан",
    "Каттакурган",
    "Келес",
    "Кибрай",
    "Китаб",
    "Коканд",
    "Кувасай",
    "Куксарай",
    "Кунград",
    "Кургантепа",
    "Маргилан",
    "Мубарек",
    "Навои",
    "Назарбек",
    "Наманган",
    "Нукус",
    "Нурафшан",
    "Пскент",
    "Риштан",
    "Самарканд",
    "Ташкент",
    "Термез",
    "Туракурган",
    "Ургенч",
    "Учкудук",
    "Учкурган",
    "Фергана",
    "Фуркат",
    "Ханабад",
    "Хива",
    "Ходжаабад",
    "Ходжейли",
    "Чартак",
    "Чирчик",
    "Чуст",
    "Шафиркан",
    "Шахрисабз",
    "Шахрихан",
    "Эшангузар",
    "Яйпан",
    "Янгибазар",
    "Янгиюль"
];




let pick_up_input = document.querySelector(".pick_up_input")
let cities_block = document.querySelector(".cities")
let pick_up_modal_bg = document.querySelector(".pick_up_modal_bg")
let pick_up_modal_close = document.querySelector(".pick_up_modal_close")
let pick_up_modal = document.querySelector(".pick_up_modal")
let body = document.body
let location_uzum = document.querySelector(".location_uzum")
let gorod_phone = document.querySelector('.gorod-phone')
location_uzum.addEventListener('click', uz_lok)
gorod_phone.addEventListener('click', uz_lok)
function uz_lok() {
    body.style.overflow = "hidden"
    pick_up_modal_bg.style.display = "block"
    setTimeout(() => {
        pick_up_modal_bg.style.opacity = "1"
        pick_up_modal_bg.style.zIndex = "22"
        pick_up_modal.style.transform = "translateY(0%)";
    }, 100);
}
pick_up_modal_close.onclick = () => {
    body.style.overflow = "visible"

    pick_up_modal_bg.style.zIndex = "-1"
    pick_up_modal_bg.style.opacity = "0"
    pick_up_modal.style.transform = "translateY(50%)";
    setTimeout(() => {
        pick_up_modal_bg.style.display = "none"
    }, 1000);

}
city_reload(uzbekistanCities)
pick_up_input.oninput = () => {
    if (uzbekistanCities.filter(item => item.toLocaleLowerCase().includes(pick_up_input.value.toLocaleLowerCase())).length == 0) {
        cities_block.innerHTML = `<div class="not_found">Введённый вами город не найден<br>Пожалуйста, проверьте написание или предложите открыть пункт выдачи заказов в вашем городе</div>`

    } else {
        cities_block.style.display = "unset"
        city_reload(uzbekistanCities.filter(item => item.toLocaleLowerCase().includes(pick_up_input.value.toLocaleLowerCase())))
        let city_divs = document.querySelectorAll(".city")
        city_divs.forEach(div => {
            div.style.borderBottom = "none"
        });
    }
    if (pick_up_input.value == "") {
        cities_block.style.display = "grid"
        let city_divs = document.querySelectorAll(".city")
        city_divs.forEach(div => {
            div.style.borderBottom = "1px solid  rgb(134, 133, 133)"
        });
    }
}






function city_reload(arr) {
    cities_block.innerHTML = ""
    arr.forEach(city => {
        cities_block.innerHTML += `
        <div id="${city}" class="city">
        <p>${city}</p>
      </div>
        `

    });
    let cities = document.querySelectorAll(".city")
    let current_city = document.querySelector(".current_city")

    cities.forEach(city => {
        city.onclick = () => {
            cities.forEach(city => {
                city.classList.remove("active_city")
                city.innerHTML = `<p>${city.id}</p>`
            });
            city.innerHTML = ""
            current_city.innerHTML = city.id
            let gorod_phone = document.querySelector('.gorod-phone')
            gorod_phone.innerHTML = `<img src="./img/uzum.uz_ место.png" class="kab_img">
            Город: ${city.id}`
            city.innerHTML = `<p class="color_gray">Выбран</p><p>${city.id}</p>`
            city.classList.add("active_city")
            body.style.overflow = "visible"
            localStorage.setItem("pickUpAdress", city.id)
            pick_up_modal_bg.style.zIndex = "-1"
            pick_up_modal_bg.style.opacity = "0"
            pick_up_modal.style.transform = "translateY(50%)";
            setTimeout(() => {
                pick_up_modal_bg.style.display = "none"
            }, 1000);

        }
    });
    if (localStorage.getItem("pickUpAdress").length !== 0) {
        cities.forEach(city => {
            if (city.id == localStorage.getItem("pickUpAdress")) {
                city.innerHTML = ""
                city.innerHTML = `<p class="color_gray">Выбран</p><p>${city.id}</p>`
                city.classList.add("active_city")
                current_city.innerHTML = city.id
                let gorod_phone = document.querySelector('.gorod-phone')
                gorod_phone.innerHTML = `<img src="./img/uzum.uz_ место.png" class="kab_img">
                Город: ${city.id}`
            }
        });
    }
}

