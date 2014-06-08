var lookups = require("./lookups");
var bs = require("binary-search");

function compare(a, b)
{
    return a - b;
}

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

module.exports = {
    eval5Card: eval5Card
};
