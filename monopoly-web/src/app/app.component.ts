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
  activePlayer : string = '';
  cardDeck = Deck.cardDeck;
  cardsToSend : Card[] = [];
  availableCardsToSelect : Array<{playerName : string, playerCards : Card[]}> = [];

  ngOnInit(){
    
  }

  finishGame(){
    for (const player of this.allPlayerComponents.toArray()){
      if (player.gameWinner){
        alert(`Игрок ${player.playerName} победил!`);
        this.playerList = [];
        this.cardDeck = Deck.cardDeck;
        this.gameIsActive = false;
        this.gameIsReady = false;
        this.activePlayerID = 0;
        this.activePlayer = '';
      }
    }
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

    this.activePlayer = this.playerList[this.activePlayerID];
    this.gameIsActive = true;

    setTimeout(() => {
      this.firstCardLoad();
    }, 1)
    

    
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
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].checkDeal();
        break;

      case 'unfair':
        let otherPlayers = this.allPlayerComponents.toArray().filter(elem => elem.playerName !== this.activePlayer);
        for (const player of otherPlayers) {
          let redCount = 0;
          let yellowCount = 0;
          let blueCount = 0;
          let stationCount = 0;
          let brownCount = 0;
          let lightBlueCount = 0;
          let pinkCount = 0;
          let orangeCount = 0;
          let greenCount = 0;
          let communityCount = 0;
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
              case 'station':
                stationCount++;
                break;
              case 'brown':
                brownCount++;
                break;
              case 'light-blue':
                lightBlueCount++;
                break;
              case 'pink':
                pinkCount++;
                break;
              case 'orange':
                orangeCount++;
                break;
              case 'green':
                greenCount++;
                break;
              case 'community':
                communityCount++;
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
          if (blueCount % 2 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'blue')) {
              cards.push(i);
            } 
          }
          if (greenCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'green')) {
              cards.push(i);
            } 
          }
          if (orangeCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'orange')) {
              cards.push(i);
            } 
          }
          if (pinkCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'pink')) {
              cards.push(i);
            } 
          }
          if (lightBlueCount % 3 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'light-blue')) {
              cards.push(i);
            } 
          }
          if (brownCount % 2 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'brown')) {
              cards.push(i);
            } 
          }
          if (stationCount % 4 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'station')) {
              cards.push(i);
            } 
          }
          if (communityCount % 2 !== 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'community')) {
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
          let stationCount = 0;
          let brownCount = 0;
          let lightBlueCount = 0;
          let pinkCount = 0;
          let orangeCount = 0;
          let greenCount = 0;
          let communityCount = 0;
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
              case 'station':
                stationCount++;
                break;
              case 'brown':
                brownCount++;
                break;
              case 'light-blue':
                lightBlueCount++;
                break;
              case 'pink':
                pinkCount++;
                break;
              case 'orange':
                orangeCount++;
                break;
              case 'green':
                greenCount++;
                break;
              case 'community':
                communityCount++;
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
          if (blueCount % 2 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'blue')) {
              cards.push(i);
            } 
          }
          if (greenCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'green')) {
              cards.push(i);
            } 
          }
          if (orangeCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'orange')) {
              cards.push(i);
            } 
          }
          if (pinkCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'pink')) {
              cards.push(i);
            } 
          }
          if (lightBlueCount % 3 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'light-blue')) {
              cards.push(i);
            } 
          }
          if (brownCount % 2 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'brown')) {
              cards.push(i);
            } 
          }
          if (stationCount % 4 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'station')) {
              cards.push(i);
            } 
          }
          if (communityCount % 2 === 0){
            for (const i of player.playerOpenCards.filter(elem => elem.color === 'community')) {
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
        this.cardDeck.push(cardSelected);
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(cardSelected),1);
        this.triggerNextTurn();
        // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
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
      let selectedOpponents = this.allPlayerComponents.toArray().filter(elem => elem.playerName !== this.activePlayer);
      console.log('select all opponents', selectedOpponents);
      console.log('birthdayt');
      
      switch (result.action.action){
        case 'birthday':
          for (const player of selectedOpponents) {
            if ((player.playerMoney - 5) < 0){
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += player.playerMoney;
              player.playerMoney = 0;
            } else {
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += 5;
              player.playerMoney = player.playerMoney - 5; 
            }
          }
          this.cardDeck.push(result.action);
          this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
          this.triggerNextTurn();
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
            this.cardDeck.push(result.action);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.triggerNextTurn();
            // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;

          case 'steal':
            let temp = this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerOpenCards.filter(card => card.color === result.card.color);
            for (let index = 0; index < 2; index++) {
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.push(temp[index]);
              temp.splice(0,1);
            }
            this.cardDeck.push(result.action);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.triggerNextTurn();
            // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;

            
            break;

          case 'unfair':
            this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerOpenCards.splice(selectedOpponents.playerOpenCards.indexOf(result.card),1);
            this.cardDeck.push(result.action);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerOpenCards.push(result.card);
            this.triggerNextTurn();
            // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;

          case 'tax':
            if (this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney <= 5){
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney;
              this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney = 0;
              
            } else {
              this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney = this.allPlayerComponents.toArray().filter(elem => (elem.playerName === result.opponentName))[0].playerMoney - 5;
              this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerMoney += 5;
            }
            this.cardDeck.push(result.action);
            this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
            this.triggerNextTurn();
            // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
            break;
      }
      } else {
        alert('Оппонент использовал карточку Просто скажи нет!');
        this.cardDeck.push(result.action);
        this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.splice(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].playerHand.indexOf(result.action),1);
        this.triggerNextTurn();
        // this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
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
      case 'station':
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
      this.cardDeck.push(this.allPlayerComponents.toArray().filter(elem => elem.playerName == opponentName)[0].playerHand.filter(card => card.action === 'justno')[0]);
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

  triggerNextTurn(){
    if(this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed == 2){
      this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].endTurn();
    } else {
      this.allPlayerComponents.toArray().filter(elem => elem.playerName == this.activePlayer)[0].cardsPlayed++;
    }
  }

  firstCardLoad(){

    console.log('first load comp', this.allPlayerComponents.toArray());
    

    for (const player of this.allPlayerComponents.toArray()) {
      if (this.allPlayerComponents.toArray()[0]){
        for (let i = 0; i < 4;) {
          let selectedCardIndex = Math.floor(Math.random() * (this.cardDeck.length + 1));
          console.log('selectedCardIndex',selectedCardIndex);
          if (selectedCardIndex < this.cardDeck.length){
            player.playerHand.push(this.cardDeck[selectedCardIndex]);
            this.cardDeck.splice(selectedCardIndex, 1);
            i++;
          }
    
        }
      } else {
        for (let i = 0; i < 2;) {
          let selectedCardIndex = Math.floor(Math.random() * (this.cardDeck.length + 1));
          console.log('selectedCardIndex',selectedCardIndex);
          if (selectedCardIndex < this.cardDeck.length){
            player.playerHand.push(this.cardDeck[selectedCardIndex]);
            this.cardDeck.splice(selectedCardIndex, 1);
            i++;
          }
        }
      }
      
    }

    console.log('after first load comp', this.allPlayerComponents.toArray());
  }


}
