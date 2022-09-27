


//func in obj = method

//this

/*
Реализовать метод добавления машины персону.
Каждый персон может иметь неогранниченое количество машин
Каждая машина представляет собой уникальный объект
Метод инфо должен так же показывать информацию об всех машинах
*/

/*
function createPerson(name,age) {
    return {
        name:name,
        age:age,
        friends: [],
        cars:[],
        info: function() {
            console.log(`name - ${this.name}\nage - ${this.age}\nfriends -`)
            let counter = 0
            this.friends.forEach(friend=>{
                console.log(friend.name)
            })
            console.log(`cars - `)
            this.cars.forEach(car=>{
                counter++
                console.log(`${counter}) ${car.info()}`)
            })
        },
        addCar: function(car){
            this.cars.push(car)
        },
        addFriend: function(friend){
            this.friends.push(friend)
            friend.friends.push(this)
        }
    }
}


function createCar(model, mark, sell){
    return{
        model: model,
        mark: mark,
        price: sell,
        info: function() {
            return `${this.model}, ${this.mark}, ${this.price}`
        }
    }
}



const pasha = createPerson("Pasha",21)
const sasha = createPerson("Sasha",14)

pasha.addFriend(sasha)

const bmw = createCar("BMW","X5",31231)
const lexus = createCar("LEXUS","ES200",37631)

pasha.addCar(bmw)
pasha.addCar(lexus)
sasha.addCar(lexus)

pasha.info()
sasha.info()
*/









/*
1.Добавить работника сто
    имя
    1 - красит                                              //что умеет делать
    2 - двигатель
    3 - колеса
    4 - ходовка
    он может ввести несколько вариантов => 2,3
2.Добавить клиента 
    имя 
    1 - красит                                              //что нужно сделать
    2 - двигатель
    3 - колеса
    4 - ходовка
    имя работника                                           
    ПРОВЕРИТЬ ЧТО ЭТОТ РАБОТНИК РЕАЛЬНО ДЕЛАЕТ ЭТИ ВЕЩИ
3.завершить сделку с клиентом 
    имя клиента
    вводится процент довольности - 85
4.посмотреть общую прибыль сто
    общая зарплата всех работников
5.посмотреть среднюю прибыль каждого сотрудника
6.показать лучшего и худшего сотрудника
7.показать топ 3 лучших сотрудника
8.уволить 2 самых худших сотрудника
9.выписать премию сотрудникам у которых зп больше введенной
    премия                          //ввести зп от которой выдавать премию
    и порого для начисления         //и сколько выдавать премии
10.уволить сотрудника по имени
11.посмотреть всех сотрудников
12.посмотреть историю всех работ
    кто делал. что делал. кому делал. качество
13.Выход


Готовый проект залить на гит и скинуть ссылку

*/

//> 4, 2, 3 = spec: [2, 3, 4]
function chekNullString(str1, str2){
    if(str1 == '' || str2 == ''){return false}
}


function addMechanic(name, specification, mechanic){
    specification = specification.split(', ')
    let selectionSpec = specification.filter(sortNumber=>isNaN(Number(sortNumber)) == false)

    if(chekNullString(name, specification) == false || specification.length > 4 || selectionSpec.length == 0){return false}

    mechanic.push({
        name: name,
        spec: selectionSpec,
        money: 0,
        rating: 0,
        clients: [],
        history: [],
        infoSpec: function(){
            return this.spec
        },
        addClient: function(name, defect){
            this.clients.push({name: name, defect: defect})
        },
        removeClient: function(name, rating, defect){
            let sum = 0
            if(defect == 1){sum = 100 / 100 * rating}   //Покраска
            if(defect == 2){sum = 300 / 100 * rating}   //Двигатель
            if(defect == 3){sum = 30 / 100 * rating}    //Колеса
            if(defect == 4){sum = 80 / 100 * rating}    //Ходовая
            this.money += sum
            this.history.push({
                name: name,
                defect: defect,
                rating: rating,
                money: sum,
            })
            this.rating += rating
            this.clients.forEach((client, idx)=>{
                if(client.name == name) this.clients.splice(idx, 1)
            })
        },
        infoMoney: function() {
            console.log(`Имя: ${this.name}, денги: ${this.money}`)
        },
        showMoney: function(){
            return this.money
        },

    })
    return true
}

function correctMechanic(name, defect, mechanic){
    if(chekNullString(name, defect) == false || mechanic.length == 0 || isNaN(Number(defect)) == true){
        console.log('Ошибка')
        return false
    }
    let result = ``
    mechanic.forEach(worker=>{
        let allSpec = worker.infoSpec()
        if(allSpec.includes(defect) == true){
            result += worker.name + ' '       
        }
    })
    if(result != ''){
        console.log(`Вам подходят ${result}`)
        return true
    }
    else{
        console.log('Ошибка')
        return false
    }
}

function addClient(name, defect, nameMeh, mechanic){
    if(chekNullString(nameMeh, ' ') == false || nameMeh == '' || mechanic.length == 0) return false

    let chekAddClient = false

    mechanic.forEach(worker=>{
        if(worker.name == nameMeh){
            worker.addClient(name, defect)
            chekAddClient = true
        }
    })

    return chekAddClient
}

function finishWork(name, rating, mechanic){
    let chekClient = false
    mechanic.forEach(worker=>{
        worker.clients.forEach(nameClient=>{
            if(nameClient.name == name){
                chekClient = true
                worker.removeClient(name, rating, nameClient.defect)
            }
        })
    })
    if(chekNullString(name, rating) == false || mechanic.length == 0 || rating > 100 || rating < 0 || chekClient == false)return false
    else return true
}


function listRatingMechanic(mechanic){
    return mechanic.sort((worker1, worker2)=>worker2.rating - worker1.rating)
}

function showBestWorstWorker(mechanic){
    if(mechanic.length < 2) return false
    let sortMeh = listRatingMechanic(mechanic)
    console.log(`Лучший - ${sortMeh[0].name} с рейтингом ${sortMeh[0].rating}\nХудший - ${sortMeh[sortMeh.length-1].name} с рейтингом ${sortMeh[sortMeh.length-1].rating}`)
}

function topThreeWorker(mechanic){
    if(mechanic.length < 3) return false
    let sortMeh = listRatingMechanic(mechanic)
    console.log(`TOP3\n1 - ${sortMeh[0].name} с рейтингом ${sortMeh[0].rating}\n2 - ${sortMeh[1].name} с рейтингом ${sortMeh[1].rating}\n2 - ${sortMeh[2].name} с рейтингом ${sortMeh[2].rating}`)
}

function removeTwoWorstWorker(mechanic){
    if(mechanic.length < 3) return false
    let sortMeh = listRatingMechanic(mechanic)
    console.log(`Механики ${sortMeh[sortMeh.length-1].name} и ${sortMeh[sortMeh.length-2].name} уволены`)
    sortMeh.pop()
    sortMeh.pop()
}

function premiumMechanic(minRating, premium, mechanic){
    if(mechanic.length < 1) return false
    mechanic.forEach(worker=>{
        if(worker.rating > minRating){
            worker.money += premium
            console.log(`Премия начислена ${worker.name}`)
        }else{}
    })
}

function removeWorker(name, mechanic){
    if(mechanic.length == 0 || name == '') return false
    let chek = false
    let resultMechanic = mechanic.filter(worker=>{
        if(worker.name != name) return true
        else {
            chek = true
            return false
        }
    })
    if(chek == true) return resultMechanic
    else return false
}






























let menu

let mechanic = []

do{
    menu = +prompt('STO \n 1 - Добавить работника сто\n 2 - Добавить клиента\n 3 - завершить сделку с клиентом\n 4 - посмотреть общую прибыль сто\n 5 - посмотреть среднюю прибыль каждого сотрудника\n 6 - показать лучшего и худшего сотрудника\n 7 - показать топ 3 лучших сотрудника\n 8 - уволить 2 самых худших сотрудника\n 9 - выписать премию сотрудникам у которых зп больше введенной\n 10 - уволить сотрудника по имени\n 11 - посмотреть всех сотрудников\n 12 - посмотреть историю всех работ\n 13 - Выход')
    
    switch(menu){
        case 1:{
            let name = prompt('Введи имя сотрудника')
            let specification = prompt('Введи специальность:\n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая\n(можно ввести несколько вариантов: 1,3)')
            addMechanic(name, specification, mechanic) ? console.log(`Сотрудник ${name} добавлен`) : console.log('Ошибка')
            break
        }
        case 2:{
            let name = prompt('Введи имя клиента')
            let defect = prompt('Введи одну неисправность: \n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая')

            if(correctMechanic(name, defect, mechanic) == false) break
            
            let nameMeh = prompt('Введи имя механика')
            addClient(name, defect, nameMeh, mechanic) ? console.log(`Клиент ${name} добавлен`) : console.log('Ошибка')
            break
        }
        case 3:{
            let name = prompt('Имя клиента')
            let rating = +prompt('Введи процент довольности 1 - 100')
            finishWork(name, rating, mechanic) ? console.log('Сделка закрыта') : console.log('Ошибка')
            break
        }
        case 4:{
            let allMoneySto = 0
            mechanic.forEach(mehMoney=>allMoneySto += mehMoney.showMoney())
            console.log(`Общая прибыль сто: ${allMoneySto}`)
            break
        }
        case 5:{
            mechanic.forEach(mehMoney=>mehMoney.infoMoney())
            break
        }
        case 6:{
            if(showBestWorstWorker(mechanic) == false) console.log('Ошибка')
            break
        }
        case 7:{
            if(topThreeWorker(mechanic) == false) console.log('Ошибка')
            break
        }
        case 8:{
            if(removeTwoWorstWorker(mechanic) == false) console.log('Ошибка')
            
            break
        }
        case 9:{
            let minRating = prompt('Введи рейтинг от которого будет выдаваться премия')
            let premium = +prompt('Введи прмеию') 
            if(premiumMechanic(minRating, premium, mechanic) == false) console.log('Ошибка')
            break
        }
        case 10:{
            let name = prompt('Введите имя сотрудника')
            let resultMechanic = removeWorker(name, mechanic)
            if(resultMechanic != false){
                console.log('Сотрудник удален')
                mechanic = resultMechanic
                break
            }
            else if(resultMechanic == false) console.log('Ошибка')
            break
        }
        case 11:{
            if(mechanic.length < 1){
                console.log('Ошибка')
                break
            }
            mechanic.forEach(worker=>{
                let nameClients = ``
                worker.clients.forEach(nameClient => nameClients += nameClient.name + ' ')
                console.log(`Имя: ${worker.name}, рейтинг: ${worker.rating}, деньги: ${worker.money}, клиенты: ${nameClients}`)
            })
            break
        }
        case 12:{
            if(mechanic.length < 1){
                console.log('Ошибка')
                break
            }
            mechanic.forEach(worker=>{
                if(worker.history.length == 0) return false
                console.log(worker.name)
                worker.history.forEach(history=>console.log(`Клиент:  ${history.name} пришел с дефектом ${history.defect}, поставил рейтинг ${history.rating}, заплатил за работу ${history.money}`))
            })
            break
        }
    }
}while(menu != 13)



































/*
Реализовать метод инфо который будет работать так:

name - Pasha
age - 21
friend - null | -
1)  sasha
2)
cars - 
1) mark - bmw, model - x5, price - 31231
2) mark - lexus, model - es3000, price - 353231

*/



/*
const user = {
    name: "Pasha",
    info: function() {
        console.log(this)
    }
}


user.info()
*/