var countByRank = require("./hand_count").countByRank;
var eval = require("../lib/evaluator");
var deck = require("../lib/deck").deck;
var assert = require("assert");
var util = require("util");

var passCount = 0;
var failCount = 0;

/**
 * Evaluate each of the possible 2,598,960 5-card hands and keep a count of
 * the number of hands in each equivalence class.
 */
var counts = [0];

for(i = 0; i < 48; i++)
{
    for(j = i + 1; j < 49; j++)
    {
        for(k = j + 1; k < 50; k++)
        {
            for(l = k + 1; l < 51; l++)
            {
                for(m = l + 1; m < 52; m++)
                {
                    var rank = eval.eval5Card(deck[i], deck[j], deck[k], deck[l], deck[m]);
                    if(counts[rank] === undefined)
                        counts[rank] = 1;
                    else
                        counts[rank]++;
                }
            }
        }
    }
}

/**
 * Compare the observed counts of 5-card hands in each equivalence class
 * to the true counts.
 */
function test()
{
    console.log("evaluator.js");
    try
    {
        for(i = 0; i <= 7462; i++)
        {
            assert.strictEqual(
                countByRank[i],
                counts[i],
                util.format("Hand rank count is incorrect: expected %d, actual %d", countByRank[i], counts[i])
            );
        }
        passCount++;
        console.log("\t[✓] #1 PASS");
    }
    catch(e)
    {
        console.log("\t[x] #1 FAIL");
        console.log("\t\t%s\n\t\tExpexted: %s\n\t\tActual: %s", e.message, e.expected, e.actual);
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

module.exports = {
    test: test,
    getPassCount: getPassCount,
    getFailCount: getFailCount
};

