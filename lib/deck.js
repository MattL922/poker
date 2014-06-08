/*
 * A 52 card deck represented as 4 byte hex numbers.
 * The bit scheme is as follows:
 *
 * xxxb bbbb bbbb bbbb cdhs rrrr xxpp pppp
 *
 * where:
 *
 * x = unused bit (0)
 * b = bit turned on depending on rank of card
 * c = club
 * d = diamond
 * h = heart
 * s = spade
 * r = rank of card (0-12)
 * p = prime number of rank (2, 3, 5, 7, ..., 41)
 */
var deck = [
    0x00018002, // 2c
    0x00028103, // 3c
    0x00048205, // 4c
    0x00088307, // 5c
    0x0010840b, // 6c
    0x0020850d, // 7c
    0x00408611, // 8c
    0x00808713, // 9c
    0x01008817, // Tc
    0x0200891d, // Jc
    0x04008a1f, // Qc
    0x08008b25, // Kc
    0x10008c29, // Ac

    0x00014002, // 2d
    0x00024103, // 3d
    0x00044205, // 4d
    0x00084307, // 5d
    0x0010440b, // 6d
    0x0020450d, // 7d
    0x00404611, // 8d
    0x00804713, // 9d
    0x01004817, // Td
    0x0200491d, // Jd
    0x04004a1f, // Qd
    0x08004b25, // Kd
    0x10004c29, // Ad

    0x00012002, // 2h
    0x00022103, // 3h
    0x00042205, // 4h
    0x00082307, // 5h
    0x0010240b, // 6h
    0x0020250d, // 7h
    0x00402611, // 8h
    0x00802713, // 9h
    0x01002817, // Th
    0x0200291d, // Jh
    0x04002a1f, // Qh
    0x08002b25, // Kh
    0x10002c29, // Ah

    0x00011002, // 2s
    0x00021103, // 3s
    0x00041205, // 4s
    0x00081307, // 5s
    0x0010140b, // 6s
    0x0020150d, // 7s
    0x00401611, // 8s
    0x00801713, // 9s
    0x01001817, // Ts
    0x0200191d, // Js
    0x04001a1f, // Qs
    0x08001b25, // Ks
    0x10001c29, // As
];

var card_index = {
    "2c": 0,
    "3c": 1,
    "4c": 2,
    "5c": 3,
    "6c": 4,
    "7c": 5,
    "8c": 6,
    "9c": 7,
    "Tc": 8,
    "Jc": 9,
    "Qc": 10,
    "Kc": 11,
    "Ac": 12,
    
    "2d": 13,
    "3d": 14,
    "4d": 15,
    "5d": 16,
    "6d": 17,
    "7d": 18,
    "8d": 19,
    "9d": 20,
    "Td": 21,
    "Jd": 22,
    "Qd": 23,
    "Kd": 24,
    "Ad": 25,
    
    "2h": 26,
    "3h": 27,
    "4h": 28,
    "5h": 29,
    "6h": 30,
    "7h": 31,
    "8h": 32,
    "9h": 33,
    "Th": 34,
    "Jh": 35,
    "Qh": 36,
    "Kh": 37,
    "Ah": 38,
    
    "2s": 39,
    "3s": 40,
    "4s": 41,
    "5s": 42,
    "6s": 43,
    "7s": 44,
    "8s": 45,
    "9s": 46,
    "Ts": 47,
    "Js": 48,
    "Qs": 49,
    "Ks": 50,
    "As": 51,
};

module.exports = {
    deck: deck,
    card_index: card_index
};

