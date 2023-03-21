import { Card } from "./card";

export class Deck{
    static cardDeck : Card[] = [
        {id : 1, color : 'yellow', action : 'property', price : 10, description : '', name : 'yellow1'},
        {id : 2, color : 'yellow', action : 'property', price : 10, description : '', name : 'yellow2'},
        {id : 3, color : 'yellow', action : 'property', price : 10, description : '', name : 'yellow3'},
        {id : 4, color : 'red', action : 'property', price : 10, description : '', name : 'red1'},
        {id : 5, color : 'red', action : 'property', price : 10, description : '', name : 'red2'},
        {id : 6, color : 'red', action : 'property', price : 10, description : '', name : 'red3'},
        {id : 7, color : 'black', action : 'property', price : 10, description : '', name : 'black1'},
        {id : 8, color : 'black', action : 'property', price : 10, description : '', name : 'black2'},
        {id : 9, color : 'black', action : 'property', price : 10, description : '', name : 'black3'},
        {id : 10, color : 'white', action : 'property', price : 10, description : '', name : 'white1'},
        {id : 11, color : 'white', action : 'property', price : 10, description : '', name : 'white2'},
        {id : 12, color : 'white', action : 'property', price : 10, description : '', name : 'white3'},
        {id : 13, color : 'black/red', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'any', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'black/red', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'any', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'black/red', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'any', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'black/red', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 13, color : 'any', action : 'rent', price : 10, description : '', name : 'Рента'},
        {id : 14, color : 'action', action : 'start', price : 10, description : '', name : 'Пройди через старт'},
        {id : 15, color : 'action', action : 'birthday', price : 10, description : '', name : 'День рожедния!'},
        {id : 16, color : 'action', action : 'money', price : 2, description : '', name : '2М'},
        {id : 16, color : 'action', action : 'money', price : 2, description : '', name : '2М'},
        {id : 16, color : 'action', action : 'money', price : 10, description : '', name : '10М'},
        {id : 16, color : 'action', action : 'money', price : 5, description : '', name : '5М'},
        {id : 16, color : 'action', action : 'money', price : 2, description : '', name : '2М'},
        {id : 16, color : 'action', action : 'money', price : 1, description : '', name : '1М'},
        {id : 17, color : 'action', action : 'unfair', price : 10, description : '', name : 'Нечестная сделка'},
        {id : 18, color : 'action', action : 'unfair', price : 10, description : '', name : 'Нечестная сделка'},
        {id : 19, color : 'action', action : 'steal', price : 10, description : '', name : 'Сорви сделку'},
        {id : 19, color : 'action', action : 'justno', price : 10, description : '', name : 'Скажи нет'}
    ]
}