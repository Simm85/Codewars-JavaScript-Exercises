function hand(holeCards, communityCards) {
      const totalCards = [...holeCards, ...communityCards];
      const cardElements = string => {
            const pattern = /([AKQJ\d]+)([♠♣♦♥]{1})/;
            return pattern.exec(string);
      }
      const isCardAbove10 = (string_1, string_2) => {
            const pattern = /[AKQJ]{1}/;
            return pattern.test(string_1) || pattern.test(string_2);
      }

      class Result {
            constructor() {
                  this.type = null;
                  this.ranks = [];
            }
      }

      let result = straightFlush();
      if (result) {
            return result;
      }
      result = fourOfAKind();
      if (result) {
            return result;
      }
      result = fullHouse();
      if (result) {
            return result;
      }
      result = flush();
      if (result) {
            return result;
      }

      result = straight();
      if (result) {
            return result;
      }
      result = threeOfAkind();
      if (result) {
            return result;
      }
      result = pairs();
      if (result) {
            return result;
      }
      result = nothing();
      if (result) {
            return result;
      }

      function straightFlush() {
            let cardsArray = totalCards.slice();
            if (isFlushDraw(cardsArray)) {
                  cardsArray = removeSpareCardsByPaint(cardsArray);
                  sortCardsInDescendingOrder(cardsArray);
                  const straightObject = isStraightDraw(cardsArray);

                  if (straightObject.bool) {
                        const result = new Result();
                        result.type = 'straight-flush';
                        straightObject.cards.forEach(card => result.ranks.push(cardElements(card)[1]));
                        return result;
                  }
            }
      }

      function fourOfAKind() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);

            if (Object.values(cardCollection).includes(4)) {
                  const result = new Result();
                  result.type = 'four-of-a-kind';
                  for (const entry of Object.entries(cardCollection)) {
                        const [card, count] = entry;

                        if (count === 4) {
                              result.ranks.unshift(card);
                              continue;
                        }
                        result.ranks.push(card);
                  };

                  const tieBreaker = result.ranks.shift();
                  sortCardsInDescendingOrder(result.ranks);
                  result.ranks.unshift(tieBreaker);
                  trimHand(result.ranks, 2);
                  return result;
            }
      }

      function fullHouse() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            if (Object.values(cardCollection).includes(2) && Object.values(cardCollection).includes(3)) {
                  const twoPairs = [];
                  const result = new Result();
                  result.type = 'full house';
                  for (const entry of Object.entries(cardCollection)) {
                        const [card, count] = entry;
                        if (count === 3) {
                              result.ranks.unshift(card);
                        } else if (count === 2) {
                              twoPairs.push(card);
                              result.ranks.splice(1, 0, card);
                        } else {
                              result.ranks.push(card);
                        }
                  }

                  sortCardsInDescendingOrder(twoPairs);
                  result.ranks.splice(1, 1, twoPairs[0]);
                  trimHand(result.ranks, 2);
                  return result;
            }
      }

      function flush() {
            let cardsArray = totalCards.slice();
            if (isFlushDraw(cardsArray)) {
                  cardsArray = removeSpareCardsByPaint(cardsArray);
                  sortCardsInDescendingOrder(cardsArray);
                  const straightObject = isStraightDraw(cardsArray);
                  trimHand(cardsArray, 5);

                  if (!straightObject.bool) {
                        const result = new Result();
                        result.type = 'flush';
                        cardsArray.forEach(card => result.ranks.push(cardElements(card)[1]));
                        return result;
                  }
            }
      }

      function straight() {
            let cardsArray = totalCards.slice();
            if (!isFlushDraw(cardsArray)) {
                  sortCardsInDescendingOrder(cardsArray);
                  const straightObject = isStraightDraw(cardsArray);
                  if (straightObject.bool) {
                        const result = new Result();
                        result.type = 'straight';
                        straightObject.cards.forEach(card => result.ranks.push(cardElements(card)[1]));
                        return result;
                  }
            }
      }

      function threeOfAkind() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            sortCardsInDescendingOrder(cardsArray);
            const straightObject = isStraightDraw(cardsArray);
            trimHand(cardsArray, 5);

            if (Object.values(cardCollection).includes(3) &&
                  !isFlushDraw(cardsArray) &&
                  !straightObject.bool &&
                  !Object.values(cardCollection).includes(4) &&
                  !Object.values(cardCollection).includes(2)
            ) {
                  const result = new Result();

                  for (const entry of Object.entries(cardCollection)) {
                        const [cardKind, count] = entry;
                        if (count === 3) {
                              result.ranks.unshift(cardKind);
                              continue;
                        }
                        result.ranks.push(cardKind);
                  }

                  const tieBreaker = result.ranks.shift();
                  sortCardsInDescendingOrder(result.ranks);
                  result.ranks.unshift(tieBreaker);
                  result.type = 'three-of-a-kind';
                  trimHand(result.ranks, 3);
                  return result;
            }
      }

      function pairs() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            const pairs = Object.values(cardCollection).filter(value => value === 2);

            if (pairs.length > 0 && !Object.values(cardCollection).includes(3)) {
                  const result = new Result();

                  Object.entries(cardCollection).forEach(entry => {
                        const [card, count] = entry;
                        if (count === 2) {
                              result.ranks.unshift(card);
                        } else {
                              result.ranks.push(card);
                        }
                  });


                  if (pairs.length === 1) {
                        result.type = 'pair';
                        const pairCard = result.ranks.shift();
                        sortCardsInDescendingOrder(result.ranks);
                        result.ranks.unshift(pairCard);
                        trimHand(result.ranks, 4);
                  } else {
                        result.type = 'two pair';
                        let pairCardOne = result.ranks.shift();
                        let pairCardTwo = result.ranks.shift();
                        let pairOneAsNumber = 0;
                        let pairTwoAsNumber = 0;
                        sortCardsInDescendingOrder(result.ranks);

                        if (isCardAbove10(pairCardOne, pairCardTwo)) {
                              pairOneAsNumber = reassignCardAsNumber(pairCardOne);
                              pairTwoAsNumber = reassignCardAsNumber(pairCardTwo);
                              if (pairOneAsNumber > pairTwoAsNumber) {
                                    result.ranks.unshift(pairCardTwo);
                                    result.ranks.splice(0, 0, pairCardOne);
                              } else {
                                    result.ranks.unshift(pairCardOne);
                                    result.ranks.splice(0, 0, pairCardTwo);
                              }
                        } else {
                              pairCardOne = Number(pairCardOne);
                              pairCardTwo = Number(pairCardTwo);

                              if (pairCardOne > pairCardTwo) {
                                    result.ranks.unshift(pairCardTwo);
                                    result.ranks.splice(0, 0, pairCardOne);
                              } else {
                                    result.ranks.unshift(pairCardOne);
                                    result.ranks.splice(0, 0, pairCardTwo);
                              }
                        }
                        trimHand(result.ranks, 3);
                  }
                  return result;
            }
      }

      function nothing() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            sortCardsInDescendingOrder(cardsArray);
            const straightObject = isStraightDraw(cardsArray);

            if (!isFlushDraw(cardsArray) &&
                  !straightObject.bool &&
                  Object.values(cardCollection).every(value => value === 1)
            ) {
                  const result = new Result();
                  result.type = 'nothing';
                  Object.keys(cardCollection).forEach(card => result.ranks.push(card));
                  sortCardsInDescendingOrder(result.ranks);
                  trimHand(result.ranks, 5);
                  return result;
            }
      }

      function removeSpareCardsByPaint(cards) {
            const paints = {};
            let drawPaint = '';

            for (const card of cards) {
                  const cardPaint = cardElements(card)[2];
                  if (paints.hasOwnProperty(cardPaint)) {
                        paints[cardPaint]++;
                        continue;
                  }
                  paints[cardPaint] = 1;
            }

            Object.entries(paints).some(value => {
                  const [paint, count] = value;
                  if (count >= 5) {
                        return drawPaint = paint;
                  }
            });

            return cards.filter(card => {
                  const cardPaint = cardElements(card)[2];
                  if (cardPaint === drawPaint) {
                        return card;
                  }
            });
      }


      function sortCardsInDescendingOrder(cards) {
            return cards.sort((a, b) => {
                  let cardOne = a;
                  let cardTwo = b;

                  if (a.length > 1 && b.length > 1) {
                        cardOne = cardElements(a)[1];
                        cardTwo = cardElements(b)[1];
                  }

                  if (isCardAbove10(cardOne, cardTwo)) {
                        cardOne = reassignCardAsNumber(cardOne);
                        cardTwo = reassignCardAsNumber(cardTwo);
                  }
                  return Number(cardTwo) - Number(cardOne);
            });
      }

      function reassignCardAsNumber(card) {
            switch (card) {
                  case 'A': card = 14; break;
                  case 'K': card = 13; break;
                  case 'Q': card = 12; break;
                  case 'J': card = 11; break;
            }
            return card;
      }

      function trimHand(cards, n) {
            if (cards.length > n) {
                  cards.splice(n, cards.length);
            }
            return cards;
      }

      function isFlushDraw(cards) {
            const paints = {};
            for (const card of cards) {
                  const cardPaint = cardElements(card)[2];
                  if (paints.hasOwnProperty(cardPaint)) {
                        paints[cardPaint]++;
                        continue;
                  }
                  paints[cardPaint] = 1;
            }
            return Object.values(paints).some(value => value >= 5);
      }

      function isStraightDraw(cards) {
            let counter = 0;
            const result = { bool: false, cards: [], cardAsNumbers: [] };

            cards.reduce((a, b) => {
                  let cardOne = a;
                  let cardTwo = b;

                  if (a.length > 1 && b.length > 1) {
                        cardOne = cardElements(a)[1];
                        cardTwo = cardElements(b)[1];
                  }

                  if (isCardAbove10(cardOne, cardTwo)) {
                        cardOne = reassignCardAsNumber(cardOne);
                        cardTwo = reassignCardAsNumber(cardTwo);
                  }

                  if (typeof cardOne === 'string' || typeof cardTwo === 'string') {
                        cardOne = Number(cardOne);
                        cardTwo = Number(cardTwo);
                  }

                  if (counter < 4) {
                        if (cardOne - cardTwo === 1) {
                              counter++;
                              result.cards.push(a);
                              result.cardAsNumbers.push(cardOne);

                              if (counter === 4) {
                                    result.cards.push(b);
                                    result.cardAsNumbers.push(cardTwo);
                              }
                        }
                  }
                  return a = b;
            });

            if (result.cardAsNumbers.length === 5) {
                  result.bool = true;
                  result.cardAsNumbers.reduce((a, b) => {
                        if (a - b !== 1) {
                              result.bool = false;
                        }
                        return a = b;
                  });
            }
            return result;
      }

      function countAndCollectCards(cards) {
            const cardCollection = {};
            for (const card of cards) {
                  const cardKind = cardElements(card)[1];
                  if (cardCollection.hasOwnProperty(cardKind)) {
                        cardCollection[cardKind]++;
                        continue;
                  }
                  cardCollection[cardKind] = 1;
            }
            return cardCollection;
      }
}

//hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠']); // straight-flush

//hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']); // four-of-a-kind

//hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']); // full house

//hand(['A♠', '10♥'], ['K♦', '5♥', 'J♥', 'Q♥', '3♥']); // flush

//hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦']); // straight

//hand(['4♠','9♦'],['J♣','Q♥','Q♠','2♥','Q♦']); // three-of-a-kind

//hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']); // pair

hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']); // two pair

//hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']); // nothing

