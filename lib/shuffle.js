var deck   = require("./deck").deck;
var crypto = require("crypto");

/**
 * Generates a random number from 0 to range-1 inclusive.
 *
 * @param {number} range The max random number to generate (exclusive).
 * @returns {number} An integer from the range [0, range-1].
 */
function getRand(range)
{
    // This line could be sped up by using a lookup
    var cutoff = Math.floor(65536 / range) * range - 1;
    try
    {
        var buf = crypto.randomBytes(2);
        var num = buf.readUInt16BE(0);
        // To avoid bias, throw out numbers that are greater than 'cutoff'
        // and pick again.  The modulo here is unbiased because 'cutoff' is a
        // multiple of 'range'.
        return (num > cutoff) ? getRand(range) : num % range;
    }
    catch(err)
    {
        console.log("Entropy sources drained!  Resorting to Math.random().");
        return Math.floor(Math.random() * range);
    }
}

/**
 * Shuffles a deck of cards using the Fisher-Yates algorithm.
 *
 * @returns {array} An array of indices into the deck.deck array
 */
function getShuffledDeck()
{
    var shuffled_deck = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,
        13,14,15,16,17,18,19,20,21,22,23,24,25,
        26,27,28,29,30,31,32,33,34,35,36,37,38,
        39,40,41,42,43,44,45,46,47,48,49,50,51
    ];
    for(i = 51; i > 0; i--)
    {
        var j = getRand(i+1);
        var tmp = shuffled_deck[i];
        shuffled_deck[i] = shuffled_deck[j];
        shuffled_deck[j] = tmp;
    }
    return shuffled_deck;
}

module.exports = {
    getRand:         getRand,
    getShuffledDeck: getShuffledDeck
};

