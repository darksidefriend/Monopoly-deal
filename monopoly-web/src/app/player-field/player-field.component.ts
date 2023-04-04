import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, AfterContentChecked } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked{

  playerHand : Card[] = [];
  // playerMoney : Card[] = [];
  playerMoney : number = 0;
  playerOpenCards : Card[] = [];
  cardsPlayed : number = 0;
  cardSelectorMode : boolean = false;
  opponentSelectorIsActive : boolean = false;
  waitingCard! : Card;
  selected! : {card : Card, opponent : string};
  selectedOpp! : string;
  _playedCard! : Card;
  emptyCard : Card = new Card();
  gameWinner : boolean = false;
  local0ppList : string[] = [];
  

  @Input() initialCards! : Card[]; 
  @Input() opponentsList! : string[];
  @Input() isActivePlayer! : boolean;
  @Input() playerName! : string;
  @Input() recievedCards! : Card[];
  @Input() cardsToSelect! : Array<{playerName : string, playerCards : Card[]}>;
  @Output() playedCard = new EventEmitter<Card>();
  @Output() passTurn = new EventEmitter();
  @Output() sendToDeck = new EventEmitter<Card>();
  @Output() finalChackWithOpponents = new EventEmitter<{card : Card, opponentName : string, action : Card}>();
  @Output() playerWon = new EventEmitter();

  ngOnInit(){
    this.local0ppList = this.opponentsList;
  }

  ngOnChanges(){
    for (const card of this.recievedCards) {
      this.playerHand.push(card);
    }
    
    this.recievedCards = [];
    this.isWinner();

    // if (isWinner()){
    //   // this.playerWon.emit();
    // }     
  }

  ngAfterViewInit(){
 
  }

  ngAfterContentChecked(){

  }
  

  selectCard(selectedCard : Card){

    let selectedCardIndex = this.playerHand.indexOf(selectedCard);

    switch (selectedCard.action){
      case 'property':
        this.playerOpenCards.push(selectedCard);
        this.playerHand.splice(selectedCardIndex, 1);
        this.cardsPlayed++;
        break;
      case 'money':
        this.playerMoney += selectedCard.price;
        this.sendToDeck.emit(selectedCard);
        this.playerHand.splice(selectedCardIndex, 1);
        this.cardsPlayed++;
        break;
      case 'justno':
        alert('Эта карта используется автоматически');
        break;
      default:
        this._playedCard = selectedCard;
        this.playedCard.emit(selectedCard);
        break;
    }

    if (this.cardsPlayed == 3){
      this.endTurn();
    }
  }

  endTurn(){
    this.isActivePlayer = false;
    this.cardSelectorMode = false;
    this.opponentSelectorIsActive = false;
    this.cardsPlayed = 0;
    this.passTurn.emit();
  }

  checkDeal(){
    if (this._playedCard.action == 'birthday'){
      this.finalChackWithOpponents.emit({card : this._playedCard, opponentName : '', action : this._playedCard});
    } else {
      if (this._playedCard.action == 'rent' || this._playedCard.action == 'tax'){
        this.opponentSelectorIsActive = true;
        this.cardSelectorMode = false;
        this.waitingCard = this.selected.card;
      } else{
        this.finalChackWithOpponents.emit({card : this.selected.card, opponentName : this.selected.opponent, action : this._playedCard});
        this.cardSelectorMode = false;
        this.selected = {card : this.emptyCard, opponent : ''};
      }
    }
  }

  checkDealWithOpponent(){
    this.finalChackWithOpponents.emit({card : this.waitingCard, opponentName : this.selectedOpp, action : this._playedCard});
    this.opponentSelectorIsActive = false;
    this.selected = {card : this.emptyCard, opponent : ''};
    this.selectedOpp = '';
  }

  createTempObject(cardInput : Card, opponentInput : string){
    return {card : cardInput, opponent : opponentInput}
  }

  isWinner(){
    let objectCounter = {red : 0, yellow : 0, blue : 0, station : 0, brown : 0, lightBlue : 0, pink : 0, orange : 0, green : 0, community : 0}
    for (const card of this.playerOpenCards) {
      switch (card?.color){
        case 'red':
          objectCounter.red++;
          break;
        case 'yellow':
          objectCounter.yellow++;
          break;
        case 'blue':
          objectCounter.blue++;
          break;
        case 'station':
          objectCounter.station++;
          break;
        case 'brown':
          objectCounter.brown++;
          break;
        case 'light-blue':
          objectCounter.lightBlue++;
          break;
        case 'pink':
          objectCounter.pink++;
          break;
        case 'orange':
          objectCounter.orange++;
          break;
        case 'green':
          objectCounter.green++;
          break;
        case 'community':
          objectCounter.community++;
          break;
      }
    }
    let completeProperties = 0;
    let temp : string[] = Object.keys(objectCounter);
    for (const key of temp) {
      if (this.isComplete(objectCounter, key)){
        completeProperties++;
      }
    }

    console.log('complete safsda', completeProperties);
    

    if(completeProperties == 3){
      this.gameWinner = true;
    } else {
      this.gameWinner = false;
    }
  }

  isComplete(obj : any, color : string){
    switch (true){
      case color === 'red' || color === 'yellow' || color === 'pink' || color === 'orange' || color === 'green':
        if (obj[color] >= 3){
          return true;
        } else {
          return false;
        }
      case color === 'blue' || color === 'brown' || color === 'community':
        if (obj[color] >= 2){
          return true;
        } else {
          return false;
        }
      case color === 'station':
        if (obj[color] >= 4){
          return true;
        } else {
          return false;
        }
      case color === 'light-blue':
        if (obj.lightBlue >= 3){
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }





}
