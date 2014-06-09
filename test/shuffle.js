var shuffle = require("../lib/shuffle");
var assert = require("assert");

var passCount = 0;
var failCount = 0;

function test()
{
    passCount = 0;
    failCount = 0;

    console.log("shuffle");

    var sorted_deck = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,
        13,14,15,16,17,18,19,20,21,22,23,24,25,
        26,27,28,29,30,31,32,33,34,35,36,37,38,
        39,40,41,42,43,44,45,46,47,48,49,50,51
    ];

    var shuffled_deck = shuffle.getShuffledDeck();
    shuffled_deck.sort(compare);
    
    // #1
    // Check that the sorted deck has 52 cards
    try
    {
        assert.strictEqual(
            sorted_deck.length,
            52,
            "Sorted deck does not have 52 cards."
        );
        passCount++;
        console.log("\t[✓] #1 PASS");
    }
    catch(e)
    {
        failCount++;
        console.log("\t[x] #1 FAIL");
        console.log("\t\t%s\n\t\tExpected: %s\n\t\tActual: %s", e.message, e.expected, e.actual);
    }

    // #2
    // Check that the shuffled deck has 52 cards
    try
    {
        assert.strictEqual(
            shuffled_deck.length,
            52,
            "Shuffled deck does not have 52 cards."
        );
        passCount++;
        console.log("\t[✓] #2 PASS");
    }
    catch(e)
    {
        failCount++;
        console.log("\t[x] #2 FAIL");
        console.log("\t\t%s\n\t\tExpected: %s\n\t\tActual: %s", e.message, e.expected, e.actual);
    }

    // #3
    // Check that the shuffled deck contains one of each card
    try
    {
        for(i = 0; i < 52; i++)
        {
            assert.strictEqual(
                sorted_deck[i],
                shuffled_deck[i],
                "The shuffled deck does not contain one of each card."
            );
        }
        passCount++;
        console.log("\t[✓] #3 PASS");
    }
    catch(e)
    {
        failCount++;
        console.log("\t[x] #3 FAIL");
        console.log("\t\t%s\n\t\tExpected: %s\n\t\tActual: %s", e.message, e.expected, e.actual);
    }
}

function getPassCount()
{
    return passCount;
}

function getFailCount()
{
    return failCount;
}

function compare(a, b)
{
    return a - b;
}

module.exports = {
    test: test,
    getPassCount: getPassCount,
    getFailCount: getFailCount
};
