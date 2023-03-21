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
  
  gameIsReady : boolean = true;
  gameIsActive : boolean = true;
  playerList : string[] = ['dick', 'suck', 'pussy'];
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

  loadOpponentsList(playerName : string){        
    return this.playerList.filter(elem => elem !== playerName);
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
          if (this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.length == 0){
            alert('У вас нет карт собственности!')
            return;
          }
          this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardSelectorMode = true;
          availableCards.push({playerName : this.activePlayer, playerCards : this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards});
        } else {
          let availableColors = cardSelected.color;
          if (this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.filter(card => (card.color === availableColors)).length == 0){
            alert('У вас нет карт собственности такого цвета!')
            return;
          }
          this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardSelectorMode = true;
          availableCards.push({playerName : this.activePlayer, playerCards :  this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.filter(card => (card.color === availableColors))});
        }        

        break;

      case 'birthday':

        break;

      case 'unfair':
        let otherPlayers = this.allPlayerComponents.toArray().filter(elem => elem.playerName !== this.activePlayer);
        for (const player of otherPlayers) {
          let redCount = 0;
          let yellowCount = 0;
          let blueCount = 0;
          let blackCount = 0;
          let whiteCount = 0;
          let cards : Card[] = [];
          for (const card of player.playerOpenCards) {
            switch (card.color){
              case 'red':
                redCount++;
                break;
              case 'yellow':
                yellowCount++;
                break;
              case 'blue':
                blueCount++;
                break;
              case 'black':
                blackCount++;
                break;
              case 'white':
                whiteCount++;
                break;
            }
          }

          if (redCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'red')) {
              cards.push(i);
            } 
          }
          if (yellowCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'yellow')) {
              cards.push(i);
            } 
          }
          if (blueCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'blue')) {
              cards.push(i);
            } 
          }
          if (blackCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'black')) {
              cards.push(i);
            } 
          }
          if (whiteCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'white')) {
              cards.push(i);
            } 
          }

          availableCards.push({playerName : player.playerName, playerCards : cards});
          this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardSelectorMode = true;

        }


        break;

      case 'steal':

        let _otherPlayers = this.allPlayerComponents.toArray().filter(elem => elem.playerName !== this.activePlayer);
        for (const player of _otherPlayers) {
          let redCount = 0;
          let yellowCount = 0;
          let blueCount = 0;
          let blackCount = 0;
          let whiteCount = 0;
          let cards : Card[] = [];
          for (const card of player.playerOpenCards) {
            switch (card.color){
              case 'red':
                redCount++;
                break;
              case 'yellow':
                yellowCount++;
                break;
              case 'blue':
                blueCount++;
                break;
              case 'black':
                blackCount++;
                break;
              case 'white':
                whiteCount++;
                break;
            }
          }

          if (redCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'red')) {
              cards.push(i);
            } 
          }
          if (yellowCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'yellow')) {
              cards.push(i);
            } 
          }
          if (blueCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'blue')) {
              cards.push(i);
            } 
          }
          if (blackCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'black')) {
              cards.push(i);
            } 
          }
          if (whiteCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'white')) {
              cards.push(i);
            } 
          }

          availableCards.push({playerName : player.playerName, playerCards : cards});
          this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardSelectorMode = true;

        }
        
        break;

      case 'tax':
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].opponentSelectorIsActive = true;
        break;

      case 'start':

        if (this.cardDeck.length === 0){
          return;
        }

        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(cardSelected),1);
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
        for (let i = 0; i < 2;) {
          let selectedCardIndex = Math.floor(Math.random() * (this.cardDeck.length + 1));
          console.log('selectedCardIndex',selectedCardIndex);
          if (selectedCardIndex < this.cardDeck.length){
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.push(this.cardDeck[selectedCardIndex]);
            this.cardDeck.splice(selectedCardIndex, 1);
            i++;
          }    
        }  
        return;
    }


    this.availableCardsToSelect = availableCards;
    console.log('availableCards',this.availableCardsToSelect);
     
    
  }

  finalizeDeal(result : any){
    console.log(result);
    if (result.opponentName == ''){
      let selectedOpponents = this.allPlayerComponents.toArray().filter(elem => elem.playerName !== this.activePlayer)[0];
      console.log('select all opponents', selectedOpponents);
      switch (result.action.action){
        case 'birthday':
          break;
      }
      
    } else {
      if (!this.checkJustNoCard(result.opponentName)){
        let selectedOpponents = this.allPlayerComponents.toArray().filter(elem => elem.playerName == result.opponentName)[0];
      
        console.log('select one opponent', selectedOpponents);

        switch (result.action.action){

          case 'rent':
            let propertyCounter = this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.filter(elem => elem.color == result.card.color).length;
            if ((selectedOpponents.playerMoney - this.countRent(result.card.color, propertyCounter)) < 0){
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += selectedOpponents.playerMoney;
              selectedOpponents.playerMoney = 0;
            } else {
              selectedOpponents.playerMoney = selectedOpponents.playerMoney - this.countRent(result.card.color, propertyCounter);
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += this.countRent(result.card.color, propertyCounter);
            }
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;

          case 'steal':
            let temp = this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerOpenCards.filter(card => card.color === result.card.color);
            for (let index = 0; index < 3; index++) {
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.push(temp[index]);
              temp.splice(0,1);
            }
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;

          case 'unfair':
            this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerOpenCards.splice(selectedOpponents.playerOpenCards.indexOf(result.card),1);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.push(result.card);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;

          case 'tax':
            if (this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney <= 5){
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney;
              this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney = 0;
              
            } else {
              this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney = this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney - 5;
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += 5;
            }
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;
      }
      } else {
        alert('Оппонент использовал карточку Просто скажи нет!');
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
      }
    }
  }

  countRent(color : string, count : number){
    switch (color){
      case 'red':
        switch (count){
          case (1):
            return 2;
          case (2):
            return 3;
          case (3):
            return 6;
          default: 
            return 6;
        }
      case 'yellow':
        switch (count){
          case (1):
            return 2;
          case (2):
            return 3;
          case (3):
            return 6;
          default: 
            return 6;
        }
      case 'blue':
        switch (count){
          case (1):
            return 4;
          case (2):
            return 8;
          default: 
            return 8;
        }
      case 'black':
        switch (count){
          case (1):
            return 2;
          case (2):
            return 3;
          case (3):
            return 6;
          default: 
            return 6;
        }
      default:
        switch (count){
          case (1):
            return 2;
          case (2):
            return 3;
          case (3):
            return 6;
          default: 
            return 6;
        }
    }
  }

  checkJustNoCard(opponentName : string){

    if (this.allPlayerComponents.toArray().filter(elem => elem.playerName == opponentName)[0].playerHand.filter(card => card.action === 'justno').length != 0){
      this.allPlayerComponents.toArray().filter(elem => elem.playerName == opponentName)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == opponentName)[0].playerHand.indexOf(this.allPlayerComponents.toArray().filter(elem => elem.playerName == opponentName)[0].playerHand.filter(card => card.action === 'justno')[0]), 1);
      return true;
    } else {
      return false;
    }
    
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
