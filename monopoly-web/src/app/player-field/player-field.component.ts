import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { Card } from '../card';

@Component({
  selector: 'player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit, OnChanges{

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
  

  @Input() opponentsList! : string[];
  @Input() isActivePlayer! : boolean;
  @Input() playerName! : string;
  @Input() recievedCards! : Card[];
  @Input() cardsToSelect! : Array<{playerName : string, playerCards : Card[]}>;
  @Output() playedCard = new EventEmitter<Card>();
  @Output() passTurn = new EventEmitter();
  @Output() sendToDeck = new EventEmitter<Card>();
  @Output() finalChackWithOpponents = new EventEmitter<{card : Card, opponentName : string, action : Card}>();

  ngOnInit(){

  }

  ngOnChanges(){
    
    for (const card of this.recievedCards) {
      this.playerHand.push(card);
    }
    
    this.recievedCards = [];

    if (this.cardsPlayed == 3){
      this.endTurn();
    }
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
    this.cardsPlayed = 0;
    this.passTurn.emit();
  }

  checkDeal(){    
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

  checkDealWithOpponent(){
    this.finalChackWithOpponents.emit({card : this.waitingCard, opponentName : this.selectedOpp, action : this._playedCard});
    this.opponentSelectorIsActive = false;
    this.selected = {card : this.emptyCard, opponent : ''};
    this.selectedOpp = '';
  }

  createTempObject(cardInput : Card, opponentInput : string){
    return {card : cardInput, opponent : opponentInput}
  }





}
