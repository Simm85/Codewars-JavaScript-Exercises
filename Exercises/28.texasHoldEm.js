function hand(holeCards, communityCards) {
      const totalCards = [...holeCards, ...communityCards];
      const pattern = /(?<kind>[AKQJ\d]+)(?<paint>[♠♣♦♥]{1})/;
      const cardElements = string => pattern.exec(string);
      const result = {
            type: null,
            ranks: [],
      }
      let isHandFinished = false;

      while (!isHandFinished) {
            isHandFinished = straightFlush();
            break;
      }

      function straightFlush() {
            let isStraight = false;
            if (isFlushDraw(totalCards)) {
                  removeSpareCardsByPaint(totalCards);
                  sortCardsInDescendingOrder(totalCards);
                  removeSpareCardsByLowestValue(totalCards);
                  console.log(totalCards);
                  return true;
            }
      }

      function removeSpareCardsByLowestValue(array) {
            if (array.length > 5) {
                  array.splice(5, 2);
            }
            return array;
      }

      function fourOfAKind() {

      }

      function fullHouse() {

      }

      function flush() {

      }

      function straight() {

      }

      function threeOfAkind() {

      }

      function twoPair() {

      }

      function pair() {

      }

      function nothing() {

      }

      function isFlushDraw(array) {
            let spades = 0;
            let clubs = 0;
            let diamonds = 0;
            let hearts = 0;
            let cardPaint = '';

            for (const card of array) {
                  cardPaint = cardElements(card)[2];
                  switch (cardPaint) {
                        case '♠': spades++; break;
                        case '♣': clubs++; break;
                        case '♦': diamonds++; break;
                        case '♥': hearts++; break;
                  }

                  if (spades >= 5 || clubs >= 5 || diamonds >= 5 || hearts >= 5) {
                        return true;
                  }
            }
      }

      function removeSpareCardsByPaint(array) {
            array.reduce((prevCard, currentCard, i) => {
                  const prevCardPaint = cardElements(prevCard)[2];
                  const currentCardPaint = cardElements(currentCard)[2];
                  if (prevCardPaint !== currentCardPaint) {
                        array.splice(i, 1);
                        return prevCard = array[i];
                  }
                  return prevCard = currentCard;
            });
      }

      function sortCardsInDescendingOrder(array) {
            return array.sort((a, b) => {
                  let cardA = cardElements(a)[1];
                  let cardB = cardElements(b)[1];

                  const isCardAbove10 = /[AKQJ]{1}/.test(cardA) || /[AKQJ]{1}/.test(cardB);

                  if (isCardAbove10) {
                        cardA = reassignCardAsNumber(cardA);
                        cardB = reassignCardAsNumber(cardB);
                  }

                  return Number(cardB) - Number(cardA);
            });

            function reassignCardAsNumber(card) {
                  switch (card) {
                        case 'A': card = 14; break;
                        case 'K': card = 13; break;
                        case 'Q': card = 12; break;
                        case 'J': card = 11; break;
                  }
                  return card;
            }
      }
}

// 1. Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠']);

// 2. Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
//hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']);

// 3. Full house (three cards with the same rank, two with another).
// Tiebreaker is first the rank of the three cards, then rank of the pair.
//hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']);

// 4. Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥']);

// 5. Straight (five consecutive ranks). Higher rank is better.
hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦']);

// 6. Three-of-a-kind (three cards of the same rank).
// Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']);

// 7. Two pair (two cards of the same rank, two cards of another rank). 
// Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']);

// 8. Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']);

// 9. Nothing. Tiebreaker is the rank of the cards from high to low.
hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']); 