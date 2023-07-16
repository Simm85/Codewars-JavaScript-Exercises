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
      //  const Object.values = object => Object.values(object);
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
            const cardsArray = totalCards.slice();
            if (isFlushDraw(cardsArray)) {
                  removeSpareCardsByPaint(cardsArray);
                  sortCardsInDescendingOrder(cardsArray);
                  removeSpareCardsByLowestValue(cardsArray, 5);

                  if (isStraightDraw(cardsArray)) {
                        const result = new Result();
                        result.type = 'straight-flush';
                        cardsArray.forEach(card => result.ranks.push(cardElements(card)[1]));
                        console.log(JSON.stringify(result));
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
                  Object.entries(cardCollection).forEach(entry => {
                        const [card, count] = entry;
                        if (count === 4) {
                              result.ranks.unshift(card);
                        }
                        result.ranks.push(card);
                  });

                  const tieBreaker = result.ranks.shift();
                  sortCardsInDescendingOrder(result.ranks);
                  result.ranks.unshift(tieBreaker);
                  removeSpareCardsByLowestValue(result.ranks, 2);
                  console.log(JSON.stringify(result));
                  return result;
            }
      }

      function flush() {
            const cardsArray = totalCards.slice();
            if (isFlushDraw(cardsArray)) {
                  removeSpareCardsByPaint(cardsArray);
                  sortCardsInDescendingOrder(cardsArray);
                  removeSpareCardsByLowestValue(cardsArray, 5);

                  if (!isStraightDraw(cardsArray)) {
                        const result = new Result();
                        result.type = 'flush';
                        cardsArray.forEach(card => result.ranks.push(cardElements(card)[1]));
                        console.log(JSON.stringify(result));
                        return result;
                  }
            }
      }

      function straight() {
            const cardsArray = totalCards.slice();
            if (!isFlushDraw(cardsArray)) {
                  sortCardsInDescendingOrder(cardsArray);
                  removeSpareCardsByLowestValue(cardsArray, 5);

                  if (isStraightDraw(cardsArray)) {
                        const result = new Result();
                        result.type = 'straight';
                        cardsArray.forEach(card => result.ranks.push(cardElements(card)[1]));
                        console.log(JSON.stringify(result));
                        return result;
                  }
            }
      }

      function threeOfAkind() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            const isNumMissing = Object.values(cardCollection).includes(2);

            if (Object.values(cardCollection).includes(3) && !Object.values(cardCollection).includes(4)) {
                  const result = new Result();
                  Object.keys(cardCollection).forEach(card => result.ranks.push(card));
                  sortCardsInDescendingOrder(result.ranks);

                  if (!isNumMissing) {
                        result.type = 'three-of-a-kind';
                        removeSpareCardsByLowestValue(result.ranks, 3);
                  } else {
                        result.type = 'full house';
                        removeSpareCardsByLowestValue(result.ranks, 2);
                  }

                  console.log(JSON.stringify(result));
                  return result;
            }
      }

      function pairs() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            const len = Object.values(cardCollection).filter(value => value === 2).length;

            if (len > 0 && !Object.values(cardCollection).includes(3)) {
                  const result = new Result();

                  Object.keys(cardCollection).forEach(card => {
                        if (!result.ranks.includes(card)) {
                              result.ranks.push(card);
                        }
                  });

                  sortCardsInDescendingOrder(result.ranks);

                  if (len === 1) {
                        result.type = 'pair';
                        const highCard = result.ranks.shift();
                        result.ranks.splice(1, 0, highCard);
                        removeSpareCardsByLowestValue(result.ranks, 4);
                  } else {
                        result.type = 'two pair';
                        removeSpareCardsByLowestValue(result.ranks, 3);
                  }
                  console.log(JSON.stringify(result));
                  return result;
            }
      }

      function nothing() {
            const cardsArray = totalCards.slice();
            const cardCollection = countAndCollectCards(cardsArray);
            sortCardsInDescendingOrder(cardsArray);
            removeSpareCardsByLowestValue(cardsArray, 5);

            if (!isFlushDraw(cardsArray) &&
                  !isStraightDraw(cardsArray) &&
                  Object.values(cardCollection).every(value => value === 1)
            ) {
                  const result = new Result();
                  result.type = 'nothing';
                  Object.keys(cardCollection).forEach(card => result.ranks.push(card));
                  sortCardsInDescendingOrder(result.ranks);
                  removeSpareCardsByLowestValue(result.ranks, 5);
                  console.log(JSON.stringify(result));
                  return result;
            }
      }

      function removeSpareCardsByPaint(cards) {
            cards.reduce((prevCard, currentCard) => {
                  const prevCardPaint = cardElements(prevCard)[2];
                  const currentCardPaint = cardElements(currentCard)[2];

                  if (prevCardPaint !== currentCardPaint) {
                        cards.splice(cards.indexOf(prevCard), 1);
                  }
                  return prevCard = currentCard;
            });
      }

      function sortCardsInDescendingOrder(cards) {
            return cards.sort((a, b) => {
                  let cardA = a;
                  let cardB = b;

                  if (a.length > 1 && b.length > 1) {
                        cardA = cardElements(a)[1];
                        cardB = cardElements(b)[1];
                  }

                  if (isCardAbove10(cardA, cardB)) {
                        cardA = reassignCardAsNumber(cardA);
                        cardB = reassignCardAsNumber(cardB);
                  }
                  return Number(cardB) - Number(cardA);
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

      function removeSpareCardsByLowestValue(cards, n) {
            if (cards.length > n) {
                  cards.splice(n, cards.length);
            }
            return cards;
      }

      function isFlushDraw(cards) {
            let spades = 0;
            let clubs = 0;
            let diamonds = 0;
            let hearts = 0;
            let cardPaint = '';

            for (const card of cards) {
                  cardPaint = cardElements(card);
                  console.log(cardPaint);
                  switch (cardPaint) {
                        case '♠': spades++; break;
                        case '♣': clubs++; break;
                        case '♦': diamonds++; break;
                        case '♥': hearts++; break;
                  }
            }
            return [spades, clubs, diamonds, hearts].some(card => card >= 5);
      }

      function isStraightDraw(cards) {
            let isStraight = true;
            cards.reduce((cardA, cardB) => {
                  let num_A = cardElements(cardA)[1];
                  let num_B = cardElements(cardB)[1];

                  if (isCardAbove10(num_A, num_B)) {
                        num_A = reassignCardAsNumber(num_A);
                        num_B = reassignCardAsNumber(num_B);
                  }

                  if (Number(num_A) - Number(num_B) !== 1) {
                        isStraight = false;
                  }
                  return cardA = cardB;
            });
            return isStraight;
      }

      function countAndCollectCards(cards) {
            const cardCollection = {};
            for (const card of cards) {
                  let cardKind = cardElements(card)[1];

                  if (cardCollection.hasOwnProperty(cardKind)) {
                        cardCollection[cardKind]++;
                        continue;
                  }

                  cardCollection[cardKind] = 1;
            }
            return cardCollection;
      }
}

// hand(['8♠','6♠'],['7♠','5♠','9♠','J♠','10♠']); // straight-flush

//hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']); // four-of-a-kind

// hand(['A♠','A♦'],['K♣','K♥','A♥','Q♥','3♦']); // full house

hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥']); // flush

// hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦']); // straight

// hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']); // three-of-a-kind

// hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']); // pair

// hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']); // two pair

// hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']); // nothing
