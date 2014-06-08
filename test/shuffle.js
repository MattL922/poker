var shuffle = require("../lib/shuffle");
var assert = require("assert");

var sorted_deck = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,
    13,14,15,16,17,18,19,20,21,22,23,24,25,
    26,27,28,29,30,31,32,33,34,35,36,37,38,
    39,40,41,42,43,44,45,46,47,48,49,50,51
];

function num_sort(a, b)
{
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
}

var shuffled_deck = shuffle.getShuffledDeck();
shuffled_deck.sort(num_sort);

assert.strictEqual(
    sorted_deck.length,
    52,
    "Sorted deck does not have 52 cards."
);

assert.strictEqual(
    shuffled_deck.length,
    52,
    "Shuffled deck does not have 52 cards."
);

for(i = 0; i < 52; i++)
{
    assert.strictEqual(
        sorted_deck[i],
        shuffled_deck[i],
        "The shuffled deck does not contain one of each card."
    );
}

console.log("All shuffle.js tests passed!");