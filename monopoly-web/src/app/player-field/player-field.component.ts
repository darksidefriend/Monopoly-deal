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

  @Input() isActivePlayer! : boolean;
  @Input() playerName! : string;
  @Input() recievedCards! : Card[];
  @Input() cardsToSelect! : Array<{playerName : string, playerCards : Card[]}>;
  @Output() playedCard = new EventEmitter<Card>();
  @Output() passTurn = new EventEmitter();
  @Output() sendToDeck = new EventEmitter<Card>();

  ngOnInit(){

  }

  ngOnChanges(){
    // console.log(this.recievedCards);
    
    for (const card of this.recievedCards) {
      this.playerHand.push(card);
    }
    
    this.recievedCards = [];
  }
  

  selectCard(selectedCard : Card){

    

    let selectedCardIndex = this.playerHand.indexOf(selectedCard);

    switch (selectedCard.action){
      case 'property':
        this.playerOpenCards.push(selectedCard);
        this.playerHand.splice(selectedCardIndex, 1);
        break;
      case 'money':
        this.playerMoney += selectedCard.price;
        this.sendToDeck.emit(selectedCard);
        this.playerHand.splice(selectedCardIndex, 1);
        break;
      default:

        this.playedCard.emit(selectedCard);
        this.cardSelectorMode = true;

    }

    


    this.cardsPlayed++;
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

  }




}
