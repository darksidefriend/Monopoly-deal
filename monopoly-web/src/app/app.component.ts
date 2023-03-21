import { Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Deck } from './deck';
import { Card } from './card';
import { PlayerFieldComponent } from './player-field/player-field.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  constructor(){
  }

  title = 'monopoly-web';

  @ViewChildren(PlayerFieldComponent)allPlayerComponents! : QueryList<PlayerFieldComponent> ;
  
  gameIsReady : boolean = false;
  gameIsActive : boolean = false;
  playerList : string[] = [];
  activePlayerID = 0;
  activePlayer : string = this.playerList[this.activePlayerID];
  cardDeck = Deck.cardDeck;
  cardsToSend : Card[] = [];
  availableCardsToSelect : Array<{playerName : string, playerCards : Card[]}> = [];

  ngOnInit(){
    console.log('activePlayer', this.activePlayer, this.activePlayerID);
    
  }

  checkGameStartOption(){
    let inputsArray : HTMLInputElement[] = Array.prototype.slice.call(document.getElementsByClassName('player-name-input'));
    let filledInputsCounter : number = 0;
  
    for (const element of inputsArray) {
      if (element.value !== ""){
        filledInputsCounter++;
      }
    }

    if (filledInputsCounter >= 2){

      this.gameIsReady = true;
    } else {
      this.gameIsReady = false;
    }
    
  }

  gameStart(){
    let inputsArray : HTMLInputElement[] = Array.prototype.slice.call(document.getElementsByClassName('player-name-input'));
    for (const element of inputsArray) {
      if (element.value !== ""){
        this.playerList.push(element.value);
      }
    }
    this.gameIsActive = true;
    
  }

  changePlayer(){ 
    this.activePlayerID = (this.activePlayerID + 1) % this.playerList.length;
    this.activePlayer = this.playerList[this.activePlayerID];
    this.cardsToSend = [];
    this.sendCards();
  }

  performAction(cardSelected : Card){
    console.log('recievedActionCard', cardSelected); 

    console.log(this.allPlayerComponents.toArray());
    let availableCards: Array<{playerName : string, playerCards : Card[]}> = [];


    switch (cardSelected.action){

      case 'rent':

        if (cardSelected.color === 'any'){
          this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards;
          console.log(this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards);
          availableCards.push({playerName : this.activePlayer, playerCards : this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards});
        } else {
          let availableColors = cardSelected.color!.split('/');
          this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards.filter(card => (card.color === availableColors[0] || card.color === availableColors[1]));
          console.log(this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards.filter(card => (card.color === availableColors[0] || card.color === availableColors[1])));
          availableCards.push({playerName : this.activePlayer, playerCards : this.allPlayerComponents.toArray().find((elem) => {elem.playerName === this.activePlayer})!.playerOpenCards});
        }        

        break;

      case 'birthday':
        break;

      case 'unfair':
        break;

      case 'fair':
        break;

      case 'steal':
        break;
    }


    
    // for (const player of this.allPlayerComponents.toArray()) {
    //   if (player.playerName !== this.activePlayer){
    //     availableCards.push({playerName : player.playerName, playerCards : player.playerOpenCards})
    //   }
    // }
    this.availableCardsToSelect = availableCards;
    console.log('availableCards',this.availableCardsToSelect);
     
    
  }

  sendCards(){
    if (this.cardDeck.length === 0){
      return;
    }

    for (let i = 0; i < 2;) {
      let selectedCardIndex = Math.floor(Math.random() * (this.cardDeck.length + 1));
      console.log('selectedCardIndex',selectedCardIndex);
      if (selectedCardIndex < this.cardDeck.length){
        this.cardsToSend.push(this.cardDeck[selectedCardIndex]);
        this.cardDeck.splice(selectedCardIndex, 1);
        i++;
      }

    }        

  }


}
