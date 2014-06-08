var lookups = require("./lookups");
var bs = require("binary-search");

function compare(a, b)
{
    return a - b;
}

/**
 * Compute the hand rank of the given 5 cards (lower is better).
 *
 * @param {number} c1 Hex value of card 1.
 * @param {number} c2 Hex value of card 2.
 * @param {number} c3 Hex value of card 3.
 * @param {number} c4 Hex value of card 4.
 * @param {number} c5 Hex value of card 5.
 * @returns {number} Rank of the 5-card hand.
 */
function eval5Card(c1, c2, c3, c4, c5)
{
    var isFlush = c1 & c2 & c3 & c4 & c5 & 0xf000;
    var index = (c1 | c2 | c3 | c4 | c5) >>> 16;
    if(isFlush) return lookups.flushes[index];
    
    var isUnique5 = lookups.unique5[index];
    if(isUnique5) return isUnique5;
    
    var prime_product = (c1 & 0xff) * (c2 & 0xff) * (c3 & 0xff) * (c4 & 0xff) * (c5 & 0xff);
    index = bs(lookups.products, prime_product, compare);
    return lookups.values[index];
}

/**
 * Compute the rank of the best 5-card hand out of 7 cards.
 *
 * @param {array} community The 5 community cards.
 * @param {array} hole The 2 hole cards.
 * @returns {number} Rank of the best 5-card hand.
 */
function eval7Card(community, hole)
{
    var cards = community.concat(hole);
    var bestHand = Infinity;
    for(i = 0; i < lookups.perm7.length; i++)
    {
        var rank = eval5Card(
            cards[lookups.perm7[i][0]],
            cards[lookups.perm7[i][1]],
            cards[lookups.perm7[i][2]],
            cards[lookups.perm7[i][3]],
            cards[lookups.perm7[i][4]]
        );
        if(rank < bestHand) bestHand = rank;
    }
    return rank;
}

module.exports = {
    eval5Card: eval5Card,
    eval7Card: eval7Card
};
