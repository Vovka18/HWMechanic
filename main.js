


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
9.выписать премию сотрудникам у которых зп больше введенной /средней
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
                console.log(client.name, name)
                if(client.name == name) this.clients.splice(idx, 1)
            })
        },
        infoMoney: function() {
            console.log(`Имя: ${this.name}, денги: ${this.money}`)
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














let menu

let mechanic = []

do{
    menu = +prompt('STO \n 1 - Добавить работника сто\n 2 - Добавить клиента\n 3 - завершить сделку с клиентом\n 4 - посмотреть общую прибыль сто\n 5 - посмотреть среднюю прибыль каждого сотрудника\n 6 - показать лучшего и худшего сотрудника\n 7 - показать топ 3 лучших сотрудника\n 8 - уволить 2 самых худших сотрудника\n 9 - выписать премию сотрудникам у которых зп больше введенной\n 10 - уволить сотрудника по имени\n 11 - посмотреть всех сотрудников\n 12 - посмотреть историю всех работ\n 13 - Выход')
    
    switch(menu){
        case 1:{
            let name = prompt('Введи имя сотрудника')
            let specification = prompt('Введи специальность:\n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая\n(можно ввести несколько вариантов: 1,3)')
            addMechanic(name, specification, mechanic) ? console.log('Сотрудник добавлен') : console.log('Ошибка')
            break
        }
        case 2:{
            let name = prompt('Введи имя клиента')
            let defect = prompt('Введи одну неисправность: \n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая')

            if(correctMechanic(name, defect, mechanic) == false) break
            
            let nameMeh = prompt('Введи имя механика')
            addClient(name, defect, nameMeh, mechanic) ? console.log('Клиент добавлен') : console.log('Ошибка')
            break
        }
        case 3:{
            let name = prompt('Имя клиента')
            let rating = +prompt('Введите процент довольности 1 - 100')
            finishWork(name, rating, mechanic) ? console.log('Сделка закрыта') : console.log('Ошибка')
            break
        }
        case 4:{break}
        case 5:{
            mechanic.forEach(mehMoney=>mehMoney.infoMoney())
            break
        }
        case 6:{break}
        case 7:{break}
        case 8:{break}
        case 9:{break}
        case 10:{break}
        case 11:{break}
        case 12:{break}
    }
}while(menu != 13)










































//курва
// function chekNullString(String1, String2){   //Проверка на пустые поля. Ты говорил про правило програмиста не повторяйся "Don't repeat yourself" 
//     if(String1 != '' && String2 != '') return true
//     else return false
// }


// function addMechnic(name, specification, mechanic){
//     if(chekNullString(name, specification) == false)return false
//     specification = specification.split(', ')
//     if(specification.length > 4){return false}
//     for(let numSpec of specification){
//         if(isNaN(numSpec) == false && numSpec < 5 && numSpec > 0){}
//         else return false
//     }
//     specification.sort()
//     mechanic.push({
//         name: name,
//         spec: specification,
//         money: 0,
//         rating: 0,
//         clients: [],
//         history: [],
//     })
//     return true
// }

// function correctMechanik(name, defect, mechanic){
//     if(chekNullString(name, defect) == false || defect.length != 1 || mechanic.length == 0){return `Ошибка`}
    
//     let sortMechanic = mechanic.map(sortWorker=>{
//         if(sortWorker.spec.includes(defect) == true){return sortWorker.name}
//         else{}
//     })

//     sortMechanic = sortMechanic.join(', ')
//     if(sortMechanic == ''){
//         return false
//     }else{console.log(`Вам подходят ${sortMechanic}`)}
// }

// function addClient(name, defect, nameMechanic, mechanic){
//     let  regClient = mechanic.find(worker=>{
//         if(worker.spec.includes(defect) == true && worker.name == nameMechanic){
//             worker.clients.push({name: name, defect: defect})
//             return true
//         }
//     })
//     return regClient
// }

// function finishWork(nameClient, rating, mechanic){
//     if(chekNullString(nameClient, rating) == false || rating < 0 || rating > 100 || mechanic.length == 0){return false}

//     let result = []
//     let chek = false
//     mechanic.filter((findMechanic)=>{
//         let clientsMeh = findMechanic.clients.filter(screachClient =>{
//             if(screachClient.name == nameClient){
//                 chek = true   
//                 findMechanic.rating += rating
//                 let sum = 0 //создать переменную для суммы
//                 if(screachClient.defect == 1){sum = 100 / 100 * rating}   //Покраска
//                 if(screachClient.defect == 2){sum = 300 / 100 * rating}   //Двигатель
//                 if(screachClient.defect == 3){sum = 30 / 100 * rating}    //Колеса
//                 if(screachClient.defect == 4){sum = 80 / 100 * rating}    //Ходовая
//                 findMechanic.money += sum
//                 return false
//             }
//             else{return true}
//         })
//         findMechanic.clients = clientsMeh 
//         result.push(findMechanic)
//     })
//     if(chek == true){
//         console.log('Сделка закрыта')
//         return result
//     }else{return false}
// }

// function showMoneySTO(mechanic){
//     let sum = 0
//     mechanic.forEach(worker=>{
//         sum += worker.money
//     })
//     if(sum == 0){
//         return `Ошибка`
//     }else{return `Общая прибыль СТО: ${sum}`}
// }

// function showMoneyMeh(mechanic){
//         let result = ``
//         let moneyAllWorker = mechanic.forEach(worker=>{
//             console.log(`Имя: ${worker.name}, деньги: ${worker.money}\n`)
//             result += `Имя: ${worker.name}, деньги: ${worker.money}\n`
//             return result
//         })
//         console.log(moneyAllWorker)
//         return moneyAllWorker
// }







// let menu

// let mechanic = [
//     {name: 'vova', spec: 1, money: 123, rating: 0, clients: [{name: 'egor', defect: 1}, {name: 'Adolf', defect: 1}], history: []},
//     {name: 'egor', spec: 1, money: 111, rating: 0, clients: [{name: 'ivan', defect: 1}, {name: 'Adolf', defect: 1}], history: []}
// ]

// do{
//     menu = +prompt('STO \n 1 - Добавить работника сто\n 2 - Добавить клиента\n 3 - завершить сделку с клиентом\n 4 - посмотреть общую прибыль сто\n 5 - посмотреть среднюю прибыль каждого сотрудника\n 6 - показать лучшего и худшего сотрудника\n 7 - показать топ 3 лучших сотрудника\n 8 - уволить 2 самых худших сотрудника\n 9 - выписать премию сотрудникам у которых зп больше введенной\n 10 - уволить сотрудника по имени\n 11 - посмотреть всех сотрудников\n 12 - посмотреть историю всех работ\n 13 - Выход')
    
//     switch(menu){
//         case 1:{
//             let name = prompt('Введите имя сотрудника')
//             let specification = prompt('Введите специальность:\n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая\n(можно ввести несколько вариантов: 1,3)')
//             addMechnic(name, specification, mechanic) ? console.log(`Сотрудник ${name} добавлен`) : console.log('Ошибка')
//             break
//         }
//         case 2:{
//             let name = prompt('Введите имя клиента')
//             let defect = prompt('Введите одну неисправность: \n 1 - Покраска\n 2 - Двигатель\n 3 - Колеса\n 4 - Ходовая')
//             if(correctMechanik(name, defect, mechanic) != false){
//                 let nameMechanic = prompt("Введите имя механика")
//                 addClient(name, defect, nameMechanic, mechanic) ? console.log(`Механик: ${nameMechanic}, Работает с клиентом ${name}`) : console.log('Ошибка')
//                 break
//             }else{console.log('Ошибка')}
//             break
//         }
//         case 3:{
//             let nameClient = prompt('Введите имя клиента')
//             let rating = +prompt('Введите процент довольности 1 - 100')
//             let result = finishWork(nameClient, rating, mechanic)
//             if(result != false){
//                 mechanic = result
//                 break
//             }else{console.log('Ошибка')}
//             break
//         }
//         case 4:{
//             console.log(showMoneySTO(mechanic))
//             break
//         }
//         case 5:{
//             console.log(showMoneyMeh(mechanic))
//             break
//         }
//         case 6:{break}
//         case 7:{break}
//         case 8:{break}
//         case 9:{break}
//         case 10:{break}
//         case 11:{break}
//         case 12:{break}
//     }
// }while(menu != 13)






































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