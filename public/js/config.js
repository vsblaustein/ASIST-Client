// var phaserConfig = {
//     type: Phaser.AUTO,
//     width: 620,
//     height: 500,
//     parent: 'phaser-game',
//     backgroundColor:0xffffff,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 0 },
//             debug: false
//         }
//     }
// };

var phaserConfig = {
    type: Phaser.AUTO,
    backgroundColor:0xffffff,
    scale: {
        _mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        width: 775,
        height: 625,
    },
    dom: {
        createContainer: true
    },
};

// var getMapData  = function(){

//     let mapData = {'cols': 50,'rows': 92,
//     'hallwayBoundaryIndexes':[167, 173, 198, 204, 229, 235, 260, 266, 291, 297, 
//         322, 328, 353, 359,  377, 378, 379, 380, 381, 382, 383, 384, 390, 391, 
//         392, 393, 394, 395, 396, 397,  563, 564, 565, 566, 567, 568, 569, 570, 576, 577, 
//         578, 579, 580, 581, 582, 583, 601,607, 632, 638, 663, 669, 694, 700, 725, 
//         731, 756, 757, 758, 759, 760, 761, 762],
//     "roomWallIndexes":[12, 13, 14, 15, 16, 17, 18, 43, 49, 74, 80, 105, 111, 136, 
//         137, 138, 140, 141, 142, 372, 373, 374, 375, 376, 403,407,434,438,465,
//         496,500,527,531,558, 559, 560,561,562, 398,399,400,401,402, 429, 433, 
//         460, 464, 495, 522, 526, 553, 557, 584, 585,586,587,588],
//     "doorIndexes": [139, 469, 491],
//     'roomViewBlocksMapping': {'139': [44,45,46,47,48,75,76,77,78,79,106,107,108,109,110],
//         "469":[404,405,406,435,436,437,466,467,468,497,498,499,528,529,530], 
//         "491":[430,431,432,461,462,463,492,493,494,523,524,525,554,555,556]},
//     'noGameBox': [0,1,2,3,4,5,6,7,8,9,10,11, 19,20,21,22,23,24,25,26,27,28,29,30,
//         31,32,33,34,35,36,37,38,39,40,41,42,50,51,52,53,54,55,56,57,58,59,60,61,62,
//         63,64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 1, 81,82, 83, 84, 85, 86, 87, 88, 89,
//         90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,112, 113, 114, 
//         115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 
//         131, 132, 133, 134, 135, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 
//         154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 174, 175, 176, 
//         177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 
//         193, 194, 195, 196, 197, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 
//         216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 236, 237, 238, 
//         239, 240, 241, 242, 243, 244, 245, 246, 247, 248,249, 250, 251, 252, 253, 254, 
//         255, 256, 257, 258, 259, 267, 268, 269, 270, 271, 272, 273, 274, 275,276, 277, 
//         278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 298, 299, 300, 
//         301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 
//         317, 318, 319, 320, 321, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 
//         340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352,360, 361, 362, 363, 
//         364, 365, 366, 367, 368, 369, 370, 371, 589, 590, 591, 592, 593, 594, 595, 596, 597, 
//         598, 599, 600,608, 609, 610, 611, 612, 613, 614, 615, 616, 
//         617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 639, 640, 
//         641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 
//         658, 659, 660, 661, 662, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 
//         682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 701, 702, 703, 704, 705, 
//         706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 
//         723, 724, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 
//         747, 748, 749, 750, 751, 752, 753, 754, 755, 763, 764, 765, 766, 767, 768, 769, 770, 
//         771, 772, 773, 774],
//     }
//     return mapData
// }

var getMapData = function(){
    let mapData = {"cols": 50, "rows": 92, "victimIndexes": [],
    "hallwayBoundaryIndexes": [106, 107, 108, 109, 110, 154, 155, 156, 160, 161, 162, 202, 203, 204, 
        212, 213, 214, 252, 264, 301, 302, 314, 315, 351, 365, 400, 401, 415, 416, 450, 466, 500, 501, 
        502, 503, 504, 505, 506, 507, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 
        522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 
        541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 576, 585, 599, 600, 626, 635, 640, 649, 650, 
        666, 667, 676, 690, 699, 700, 716, 717, 723, 726, 734, 735, 740, 741, 749, 750, 766, 767, 773, 
        776, 783, 784, 785, 790, 791, 792, 799, 800, 816, 817, 823, 826, 830, 831, 832, 833, 834, 835, 
        840, 841, 842, 843, 844, 845, 849, 850, 866, 867, 872, 873, 876, 885, 890, 899, 900, 916, 917, 
        921, 922, 923, 926, 949, 950, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 
        971, 972, 973, 974, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 990, 991, 992, 993, 994, 
        995, 996, 998, 999, 1000, 1007, 1008, 1040, 1049, 1050, 1056, 1057, 1058, 1090, 1099, 1100, 1104, 
        1105, 1106, 1107, 1108, 1140, 1149, 1150, 1158, 1190, 1191, 1199, 1200, 1208, 1213, 1214, 1215, 
        1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 
        1233, 1234, 1235, 1240, 1241, 1242, 1249, 1250, 1263, 1283, 1284, 1285, 1290, 1291, 1292, 1293, 
        1294, 1295, 1299, 1300, 1301, 1303, 1304, 1305, 1306, 1307, 1308, 1313, 1334, 1335, 1340, 1349, 
        1350, 1358, 1363, 1385, 1399, 1400, 1408, 1413, 1435, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 
        1447, 1448, 1449, 1450, 1458, 1463, 1485, 1490, 1499, 1500, 1508, 1513, 1535, 1540, 1549, 1550, 
        1558, 1563, 1564, 1585, 1590, 1599, 1600, 1608, 1613, 1614, 1615, 1635, 1640, 1641, 1649, 1650, 
        1658, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 
        1678, 1679, 1680, 1681, 1683, 1684, 1685, 1690, 1691, 1692, 1699, 1700, 1708, 1740, 1741, 1742, 
        1743, 1744, 1745, 1749, 1750, 1758, 1790, 1799, 1800, 1807, 1808, 1849, 1850, 1856, 1857, 1858, 
        1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1904, 1905, 1906, 1907, 1908, 
        1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1924, 1926, 1927, 1928, 1929, 1930, 
        1931, 1932, 1933, 1934, 1935, 1940, 1949, 1950, 1958, 1963, 1964, 1965, 1974, 1983, 1984, 1985, 
        1990, 1999, 2000, 2013, 2014, 2024, 2034, 2035, 2040, 2049, 2050, 2051, 2052, 2053, 2054, 2056, 
        2057, 2058, 2063, 2074, 2085, 2090, 2091, 2099, 2100, 2108, 2113, 2124, 2135, 2140, 2141, 2142, 
        2149, 2150, 2158, 2163, 2174, 2185, 2190, 2191, 2192, 2193, 2194, 2195, 2199, 2200, 2208, 2213, 
        2224, 2235, 2240, 2249, 2250, 2258, 2263, 2274, 2285, 2299, 2300, 2308, 2313, 2324, 2335, 2340, 
        2341, 2342, 2343, 2344, 2345, 2346, 2347, 2349, 2350, 2358, 2363, 2364, 2365, 2366, 2367, 2368, 
        2369, 2370, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2390, 
        2399, 2400, 2408, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2423, 2424, 2425, 2426, 2427, 
        2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2440, 2449, 2450, 2458, 2463, 2467, 2490, 2499, 
        2500, 2508, 2513, 2517, 2526, 2535, 2540, 2541, 2549, 2550, 2558, 2563, 2567, 2569, 2571, 2572, 
        2573, 2575, 2576, 2578, 2580, 2581, 2582, 2584, 2585, 2590, 2591, 2592, 2599, 2600, 2608, 2613, 
        2617, 2619, 2622, 2623, 2626, 2628, 2631, 2632, 2635, 2640, 2641, 2642, 2643, 2644, 2645, 2649, 
        2650, 2657, 2658, 2666, 2667, 2669, 2672, 2673, 2676, 2678, 2681, 2682, 2685, 2690, 2699, 2700, 
        2706, 2707, 2708, 2713, 2714, 2715, 2716, 2717, 2719, 2722, 2723, 2726, 2728, 2731, 2732, 2735, 
        2749, 2750, 2754, 2755, 2756, 2757, 2758, 2763, 2764, 2765, 2766, 2767, 2769, 2770, 2771, 2772, 
        2773, 2774, 2775, 2776, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2790, 2791, 2792, 2793, 
        2794, 2795, 2796, 2797, 2798, 2799, 2800, 2808, 2840, 2849, 2850, 2890, 2899, 2900, 2901, 2902, 
        2903, 2904, 2905, 2906, 2907, 2908, 2940, 2949, 2950, 2958, 2990, 2991, 2999, 3000, 3008, 3013, 
        3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3025, 3026, 3027, 3028, 3029, 3030, 
        3031, 3032, 3033, 3034, 3035, 3040, 3041, 3042, 3049, 3050, 3063, 3085, 3090, 3091, 3092, 3093, 
        3094, 3095, 3099, 3100, 3108, 3113, 3135, 3140, 3149, 3150, 3158, 3163, 3166, 3170, 3174, 3178, 
        3182, 3185, 3199, 3200, 3208, 3213, 3216, 3220, 3224, 3228, 3232, 3235, 3240, 3241, 3242, 3243, 
        3244, 3245, 3246, 3247, 3248, 3249, 3250, 3258, 3263, 3266, 3267, 3268, 3269, 3270, 3271, 3272, 
        3273, 3274, 3275, 3276, 3277, 3278, 3279, 3280, 3281, 3282, 3285, 3290, 3299, 3300, 3308, 3313, 
        3316, 3320, 3324, 3328, 3332, 3335, 3340, 3349, 3350, 3351, 3352, 3353, 3354, 3355, 3356, 3357, 
        3358, 3363, 3366, 3370, 3374, 3378, 3382, 3385, 3390, 3399, 3400, 3408, 3413, 3435, 3440, 3441, 
        3449, 3450, 3490, 3491, 3492, 3499, 3500, 3508, 3513, 3535, 3540, 3541, 3542, 3543, 3544, 3545, 
        3549, 3550, 3551, 3552, 3553, 3554, 3555, 3556, 3557, 3558, 3563, 3566, 3570, 3574, 3578, 3582, 
        3585, 3590, 3599, 3600, 3607, 3613, 3616, 3620, 3624, 3628, 3632, 3635, 3649, 3650, 3657, 3663, 
        3666, 3667, 3668, 3669, 3670, 3671, 3672, 3673, 3674, 3675, 3676, 3677, 3678, 3679, 3680, 3681, 
        3682, 3685, 3690, 3691, 3692, 3693, 3694, 3695, 3696, 3698, 3699, 3700, 3713, 3716, 3720, 3724, 
        3728, 3732, 3735, 3740, 3749, 3750, 3757, 3763, 3766, 3770, 3774, 3778, 3782, 3785, 3790, 3799, 
        3800, 3807, 3812, 3813, 3835, 3840, 3849, 3850, 3857, 3861, 3862, 3863, 3885, 3890, 3891, 3899, 
        3900, 3901, 3902, 3903, 3904, 3905, 3906, 3907, 3908, 3909, 3910, 3911, 3912, 3913, 3914, 3915, 
        3916, 3917, 3918, 3919, 3920, 3921, 3922, 3923, 3924, 3925, 3926, 3927, 3928, 3929, 3930, 3931, 
        3932, 3933, 3934, 3935, 3940, 3941, 3942, 3949, 3985, 3990, 3991, 3992, 3993, 3994, 3995, 3999, 
        4035, 4040, 4049, 4085, 4099, 4135, 4140, 4141, 4142, 4143, 4144, 4145, 4146, 4147, 4148, 4149, 
        4185, 4190, 4199, 4235, 4240, 4249, 4285, 4290, 4299, 4335, 4340, 4341, 4349, 4385, 4390, 4391, 
        4392, 4399, 4435, 4440, 4441, 4442, 4443, 4444, 4445, 4449, 4485, 4490, 4499, 4535, 4549, 4585, 
        4586, 4587, 4588, 4589, 4590, 4591, 4592, 4593, 4594, 4595, 4596, 4597, 4598, 4599], 
    "doorIndexes": [508, 935, 940, 975, 1216, 1258, 1390, 1840, 1923, 1925, 2008, 2290, 2663, 2740, 2768, 
        2777, 2858, 3058, 3190, 3458, 3463, 3640, 3707, 4090, 4540],
    "gapIndexes": [566, 567, 590, 616, 617, 685, 997, 1302, 1682, 2055, 2348, 2371, 2372, 2421, 2422, 2476,
        2485, 3024, 3485, 3697, 3697],
    "rubbleIndexes": [888, 937, 939, 986, 1509, 1510, 1511, 1512, 1735, 1785, 1835, 1885, 2536, 2537, 2538, 
        2539, 2826, 2827, 2828, 2829, 3434, 3484, 3534], 
    "roomGapMapping": {"508": [], "935": [685], "940": [590, 997], "975": [567, 617], "1216": [1682], 
        "1258": [566, 616, 1302], "1390": [997], "1840": [], "1923": [2371, 2372], "1925": [], 
        "2008": [1302, 2055], "2290": [2348], "2663": [], "2740": [2348], "2768": [2421, 2422, 2476], 
        "2777": [2476, 2485], "2858": [2801, 2055], "3058": [], "3190": [], "3458": [], "3463": [3024, 3485], 
        "3640": [3697], "3707": [], "4090": [3697], "4540": []}, 
    "roomFloorMapping": {"508": [157, 158, 159, 205, 206, 207, 208, 209, 210, 211, 253, 254, 255, 256, 257, 
        258, 259, 260, 261, 262, 263, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 352, 353, 354, 
        355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 
        412, 413, 414, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465], 
    "935": [577, 578, 579, 580, 581, 582, 583, 584, 627, 628, 629, 630, 631, 632, 633, 634, 677, 678, 679, 
        680, 681, 682, 683, 684, 727, 728, 729, 730, 731, 732, 733, 777, 778, 779, 780, 781, 782, 827, 828, 
        829, 877, 878, 879, 880, 881, 882, 883, 884, 927, 928, 929, 930, 931, 932, 933, 934], 
    "940": [591, 592, 593, 594, 595, 596, 597, 598, 641, 642, 643, 644, 645, 646, 647, 648, 691, 692, 693, 694, 
        695, 696, 697, 698, 742, 743, 744, 745, 746, 747, 748, 793, 794, 795, 796, 797, 798, 846, 847, 848, 891, 
        892, 893, 894, 895, 896, 897, 898, 941, 942, 943, 944, 945, 946, 947, 948], 
    "975": [568, 569, 570, 571, 572, 573, 574, 575, 618, 619, 620, 621, 622, 623, 624, 625, 668, 669, 670, 
        671, 672, 673, 674, 675, 718, 719, 720, 721, 722, 724, 725, 768, 769, 770, 771, 772, 774, 775, 818, 
        819, 820, 821, 822, 824, 825, 868, 869, 870, 871, 874, 875, 918, 919, 920, 924, 925], 
    "1216": [1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 
        1280, 1281, 1282, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 
        1328, 1329, 1330, 1331, 1332, 1333, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 
        1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 
        1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1464, 1465, 1466, 
        1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 
        1484, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 
        1530, 1531, 1532, 1533, 1534, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 
        1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 
        1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634], 
    "1258": [551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 601, 602, 603, 604, 
        605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 651, 652, 653, 654, 655, 656, 657, 658, 659, 
        660, 661, 662, 663, 664, 665, 701, 702, 703, 704, 705, 707, 708, 709, 710, 711, 712, 713, 714, 715, 
        751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 801, 802, 803, 804, 805, 
        806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 
        861, 862, 863, 864, 865, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 
        951, 952, 953, 954, 955, 956, 957, 1001, 1002, 1003, 1004, 1005, 1006, 1051, 1052, 1053, 1054, 1055, 
        1101, 1102, 1103, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 
        1251, 1252, 1253, 1254, 1255, 1256, 1257], 
    "1390": [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 
        1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1243, 1244, 
        1245, 1246, 1247, 1248, 1296, 1297, 1298, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1391, 1392, 
        1393, 1394, 1395, 1396, 1397, 1398], 
    "1840": [1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548, 
        1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1693, 1694, 
        1695, 1696, 1697, 1698, 1746, 1747, 1748, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1841, 1842, 
        1843, 1844, 1845, 1846, 1847, 1848], 
    "1923": [1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 2015, 
        2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 
        2073, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2164, 2165, 2166, 2167, 2168, 2169, 
        2170, 2171, 2172, 2173, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2264, 2265, 2266, 
        2267, 2268, 2269, 2270, 2271, 2272, 2273, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323], 
    "1925": [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 
        2033, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 
        2132, 2133, 2134, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2225, 2226, 2227, 2228, 2229, 
        2230, 2231, 2232, 2233, 2234, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2325, 2326, 2327, 
        2328, 2329, 2330, 2331, 2332, 2333, 2334], 
    "2008": [1351, 1352, 1353, 1354, 1355, 1356, 1357, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1451, 1452, 
        1453, 1454, 1455, 1456, 1457, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1551, 1552, 1553, 1554, 1555, 1556, 
        1557, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1701, 1702, 1703, 
        1704, 1705, 1706, 1707, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1801, 1802, 1803, 1804, 1805, 1806, 1851, 
        1852, 1853, 1854, 1855, 1901, 1902, 1903, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 2001, 2002, 2003, 2004, 
        2005, 2006, 2007], 
    "2290": [1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 2041, 
        2042, 2043, 2044, 2045, 2046, 2047, 2048, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2143, 2144, 2145, 2146, 
        2147, 2148, 2196, 2197, 2198, 2241, 2242, 2243, 2244, 2245, 2246, 2247, 2248, 2291, 2292, 2293, 2294, 2295, 
        2296, 2297, 2298], 
    "2663": [2464, 2465, 2466, 2514, 2515, 2516, 2564, 2565, 2566, 2614, 2615, 2616, 2664, 2665], 
    "2740": [2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2491, 2492, 
        2493, 2494, 2495, 2496, 2497, 2498, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2593, 2594, 2595, 2596, 2597, 2598, 
        2646, 2647, 2648, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748], 
    "2768": [2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525, 2568, 2570, 
        2574, 2618, 2620, 2621, 2624, 2625, 2668, 2670, 2671, 2674, 2675, 2718, 2720, 2721, 2724, 2725], 
    "2777": [2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2577, 2579, 
        2583, 2627, 2629, 2630, 2633, 2634, 2677, 2679, 2680, 2683, 2684, 2727, 2729, 2730, 2733, 2734], 
    "2858": [2101, 2102, 2103, 2104, 2105, 2106, 2107, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2201, 2202, 2203, 2204, 
        2205, 2206, 2207, 2251, 2252, 2253, 2254, 2255, 2256, 2257, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2351, 2352, 
        2353, 2354, 2355, 2356, 2357, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 
        2501, 2502, 2503, 2504, 2505, 2506, 2507, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2601, 2602, 2603, 2604, 2605, 
        2606, 2607, 2651, 2652, 2653, 2654, 2655, 2656, 2701, 2702, 2703, 2704, 2705, 2751, 2752, 2753, 2801, 2802, 2803, 
        2804, 2805, 2806, 2807, 2851, 2852, 2853, 2854, 2855, 2856, 2857], 
    "3058": [2951, 2952, 2953, 2954, 2955, 2956, 2957, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3051, 3052, 3053, 3054, 
        3055, 3056, 3057, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3151, 3152, 3153, 3154, 3155, 3156, 3157, 3201, 3202, 
        3203, 3204, 3205, 3206, 3207, 3251, 3252, 3253, 3254, 3255, 3256, 3257, 3301, 3302, 3303, 3304, 3305, 3306, 3307], 
    "3190": [2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2941, 2942, 
        2943, 2944, 2945, 2946, 2947, 2948, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 3043, 3044, 3045, 3046, 3047, 3048, 
        3096, 3097, 3098, 3141, 3142, 3143, 3144, 3145, 3146, 3147, 3148, 3191, 3192, 3193, 3194, 3195, 3196, 3197, 3198], 
    "3458": [3401, 3402, 3403, 3404, 3405, 3406, 3407, 3451, 3452, 3453, 3454, 3455, 3456, 3457, 3501, 3502, 3503, 3504, 
        3505, 3506, 3507], 
    "3463": [3064, 3065, 3066, 3067, 3068, 3069, 3070, 3071, 3072, 3073, 3074, 3075, 3076, 3077, 3078, 3079, 3080, 3081, 
        3082, 3083, 3084, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3125, 3126, 3127, 3128, 3129, 
        3130, 3131, 3132, 3133, 3134, 3164, 3165, 3167, 3168, 3169, 3171, 3172, 3173, 3175, 3176, 3177, 3179, 3180, 3181, 
        3183, 3184, 3214, 3215, 3217, 3218, 3219, 3221, 3222, 3223, 3225, 3226, 3227, 3229, 3230, 3231, 3233, 3234, 3264, 
        3265, 3283, 3284, 3314, 3315, 3317, 3318, 3319, 3321, 3322, 3323, 3325, 3326, 3327, 3329, 3330, 3331, 3333, 3334, 
        3364, 3365, 3367, 3368, 3369, 3371, 3372, 3373, 3375, 3376, 3377, 3379, 3380, 3381, 3383, 3384, 3414, 3415, 3416, 
        3417, 3418, 3419, 3420, 3421, 3422, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3430, 3431, 3432, 3433, 3434, 3464, 
        3465, 3466, 3467, 3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475, 3476, 3477, 3478, 3479, 3480, 3481, 3482, 3483, 
        3484, 3514, 3515, 3516, 3517, 3518, 3519, 3520, 3521, 3522, 3523, 3524, 3525, 3526, 3527, 3528, 3529, 3530, 3531, 
        3532, 3533, 3534, 3564, 3565, 3567, 3568, 3569, 3571, 3572, 3573, 3575, 3576, 3577, 3579, 3580, 3581, 3583, 3584, 
        3614, 3615, 3617, 3618, 3619, 3621, 3622, 3623, 3625, 3626, 3627, 3629, 3630, 3631, 3633, 3634, 3664, 3665, 3683, 
        3684, 3714, 3715, 3717, 3718, 3719, 3721, 3722, 3723, 3725, 3726, 3727, 3729, 3730, 3731, 3733, 3734, 3764, 3765, 
        3767, 3768, 3769, 3771, 3772, 3773, 3775, 3776, 3777, 3779, 3780, 3781, 3783, 3784, 3814, 3815, 3816, 3817, 3818, 
        3820, 3821, 3822, 3823, 3824, 3825, 3826, 3827, 3828, 3829, 3830, 3831, 3832, 3833, 3834, 3864, 3865, 3866, 3867, 
        3868, 3870, 3871, 3872, 3873, 3874, 3875, 3876, 3877, 3878, 3879, 3880, 3881, 3882, 3883, 3884], 
    "3640": [3291, 3292, 3293, 3294, 3295, 3296, 3297, 3298, 3341, 3342, 3343, 3344, 3345, 3346, 3347, 3348, 3391, 3392, 
        3393, 3394, 3395, 3396, 3397, 3398, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3493, 3494, 3495, 3496, 3497, 3498, 
        3546, 3547, 3548, 3591, 3592, 3593, 3594, 3595, 3596, 3597, 3598, 3641, 3642, 3643, 3644, 3645, 3646, 3647, 3648], 
    "3707": [],
    "4090": [3741, 3742, 3743, 3744, 3745, 3746, 3747, 3748, 3791, 3792, 3793, 3794, 3795, 3796, 3797, 3798, 3841, 3842, 
        3843, 3844, 3845, 3846, 3847, 3848, 3892, 3893, 3894, 3895, 3896, 3897, 3898, 3943, 3944, 3945, 3946, 3947, 3948, 
        3996, 3997, 3998, 4041, 4042, 4043, 4044, 4045, 4046, 4047, 4048, 4091, 4092, 4093, 4094, 4095, 4096, 4097, 4098], 
    "4540": [4191, 4192, 4193, 4194, 4195, 4196, 4197, 4198, 4241, 4242, 4243, 4244, 4245, 4246, 4247, 4248, 4291, 4292, 
        4293, 4294, 4295, 4296, 4297, 4298, 4342, 4343, 4344, 4345, 4346, 4347, 4348, 4393, 4394, 4395, 4396, 4397, 4398, 
        4446, 4447, 4448, 4491, 4492, 4493, 4494, 4495, 4496, 4497, 4498, 4541, 4542, 4543, 4544, 4545, 4546, 4547, 4548]}, 
    "roomVictimMapping": {"508": [], "935": [], "940": [], "975": [], "1216": [], "1258": [], "1390": [], "1840": [], 
    "1923": [], "1925": [], "2008": [], "2290": [], "2663": [], "2740": [], "2768": [], "2777": [], "2858": [], 
    "3058": [], "3190": [], "3458": [], "3463": [], "3640": [], "3707": [], "4090": [], "4540": []}, 
    "noGameBox": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 
        29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
        58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 
        87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 111, 112, 113, 114, 115, 116, 117, 
        118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 
        141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 
        173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 
        196, 197, 198, 199, 200, 201, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 
        232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 265, 266, 267, 
        268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 
        291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 
        329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 366, 
        367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 
        390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 
        430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 467, 468, 469, 
        470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 
        493, 494, 495, 496, 497, 498, 499, 3950, 3951, 3952, 3953, 3954, 3955, 3956, 3957, 3958, 3959, 3960, 3961, 3962, 
        3963, 3964, 3965, 3966, 3967, 3968, 3969, 3970, 3971, 3972, 3973, 3974, 3975, 3976, 3977, 3978, 3979, 3980, 3981, 
        3982, 3983, 3984, 4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010, 4011, 4012, 4013, 4014, 4015, 
        4016, 4017, 4018, 4019, 4020, 4021, 4022, 4023, 4024, 4025, 4026, 4027, 4028, 4029, 4030, 4031, 4032, 4033, 4034, 
        4050, 4051, 4052, 4053, 4054, 4055, 4056, 4057, 4058, 4059, 4060, 4061, 4062, 4063, 4064, 4065, 4066, 4067, 4068, 
        4069, 4070, 4071, 4072, 4073, 4074, 4075, 4076, 4077, 4078, 4079, 4080, 4081, 4082, 4083, 4084, 4100, 4101, 4102, 
        4103, 4104, 4105, 4106, 4107, 4108, 4109, 4110, 4111, 4112, 4113, 4114, 4115, 4116, 4117, 4118, 4119, 4120, 4121, 
        4122, 4123, 4124, 4125, 4126, 4127, 4128, 4129, 4130, 4131, 4132, 4133, 4134, 4150, 4151, 4152, 4153, 4154, 4155, 
        4156, 4157, 4158, 4159, 4160, 4161, 4162, 4163, 4164, 4165, 4166, 4167, 4168, 4169, 4170, 4171, 4172, 4173, 4174, 
        4175, 4176, 4177, 4178, 4179, 4180, 4181, 4182, 4183, 4184, 4200, 4201, 4202, 4203, 4204, 4205, 4206, 4207, 4208, 
        4209, 4210, 4211, 4212, 4213, 4214, 4215, 4216, 4217, 4218, 4219, 4220, 4221, 4222, 4223, 4224, 4225, 4226, 4227, 
        4228, 4229, 4230, 4231, 4232, 4233, 4234, 4250, 4251, 4252, 4253, 4254, 4255, 4256, 4257, 4258, 4259, 4260, 4261, 
        4262, 4263, 4264, 4265, 4266, 4267, 4268, 4269, 4270, 4271, 4272, 4273, 4274, 4275, 4276, 4277, 4278, 4279, 4280, 
        4281, 4282, 4283, 4284, 4300, 4301, 4302, 4303, 4304, 4305, 4306, 4307, 4308, 4309, 4310, 4311, 4312, 4313, 4314, 
        4315, 4316, 4317, 4318, 4319, 4320, 4321, 4322, 4323, 4324, 4325, 4326, 4327, 4328, 4329, 4330, 4331, 4332, 4333, 
        4334, 4350, 4351, 4352, 4353, 4354, 4355, 4356, 4357, 4358, 4359, 4360, 4361, 4362, 4363, 4364, 4365, 4366, 4367, 
        4368, 4369, 4370, 4371, 4372, 4373, 4374, 4375, 4376, 4377, 4378, 4379, 4380, 4381, 4382, 4383, 4384, 4400, 4401, 
        4402, 4403, 4404, 4405, 4406, 4407, 4408, 4409, 4410, 4411, 4412, 4413, 4414, 4415, 4416, 4417, 4418, 4419, 4420, 
        4421, 4422, 4423, 4424, 4425, 4426, 4427, 4428, 4429, 4430, 4431, 4432, 4433, 4434, 4450, 4451, 4452, 4453, 4454, 
        4455, 4456, 4457, 4458, 4459, 4460, 4461, 4462, 4463, 4464, 4465, 4466, 4467, 4468, 4469, 4470, 4471, 4472, 4473, 
        4474, 4475, 4476, 4477, 4478, 4479, 4480, 4481, 4482, 4483, 4484, 4500, 4501, 4502, 4503, 4504, 4505, 4506, 4507, 
        4508, 4509, 4510, 4511, 4512, 4513, 4514, 4515, 4516, 4517, 4518, 4519, 4520, 4521, 4522, 4523, 4524, 4525, 4526, 
        4527, 4528, 4529, 4530, 4531, 4532, 4533, 4534, 4550, 4551, 4552, 4553, 4554, 4555, 4556, 4557, 4558, 4559, 4560,
        4561, 4562, 4563, 4564, 4565, 4566, 4567, 4568, 4569, 4570, 4571, 4572, 4573, 4574, 4575, 4576, 4577, 4578, 4579, 
        4580, 4581, 4582, 4583, 4584],
    "leaderMovementIndexes": null,
    }

    return mapData
}


var getGameData = function(){
    //game time '00' or minutes like '2'. If it was '2' that is timer with deadline, gameTimeArg would be {precision: 'secondTenths', countdown: true, startValues: {minutes: gameTime}}
    let gameSetUpData = {"roundCount":0, "roundLimit":20000000, "playerX":5, "playerY":77, "playerName":"dude", "playerFrameWidth":32, 
    "playerFrameHeight":48,"leaderName":null, "leaderDelay":null, "leaderX":null, "leaderY":null, 
    gameTime:"00", gameTimeArg:{}}
    return gameSetUpData
}

var getRandomConfig = function(){
    var mapData = getMapData();
    for (let ri in mapData.roomFloorMapping){
        let length = mapData.roomFloorMapping[ri].length;
        let randomVictimIdx = mapData.roomFloorMapping[ri][Math.floor(Math.random()*length)];
        if (randomVictimIdx!=null){
            mapData.victimIndexes.push(randomVictimIdx);
            mapData.roomVictimMapping[ri].push(randomVictimIdx);
        }

    }
    return [mapData.victimIndexes, mapData.roomVictimMapping]
}

const surveyJSON = {"title":"Instruction Attention Check",
"description":"This quiz is based on the instructions of the game that you read on the previous page.",
"focusFirstQuestionAutomatic":false,
"focusOnFirstError":false,
"pages": [{"name": "page1",
            "elements": [{"type": "radiogroup",
                    "name": "q1",
                    "title": "What is your role?",
                    "isRequired":true,
                    "choices": [{"value": "item1", "text": "You are a police man."},
                                {"value": "item2", "text": "You are a fire fighter."},
                                {"value": "item3", "text": "You are a soldier."},
                                {"value": "correct", "text": "You are a medic."}],
                    "choicesOrder":"random"},
                    {"type": "radiogroup",
                    "name": "q2",
                    "title": "How do you save people?",
                    "isRequired":true,
                    "choices": [{"value": "correct", "text": "By standing next to them and pressing R."},
                                {"value": "item2", "text": "By walking around them three times."},
                                {"value": "item3", "text": "By clicking on them with the mouse."},
                                {"value": "item4", "text": "By defeating all the monsters in the area."}],
                    "choicesOrder":"random"},
                    {"type": "radiogroup",
                    "name": "q3",
                    "title": "What do you know about the placement of the victims?",
                    "isRequired":true,
                    "choices": [{"value": "item1", "text": "The minimap will tell you where they are"},
                                {"value": "correct", "text": "There is one victim in each room"},
                                {"value": "item3", "text": "There are 10 victims in total"},
                                {"value": "item4", "text": "Nothing, you have to find out as you explore the building"}],
                    "choicesOrder":"random"},
                    {"type": "radiogroup",
                    "name": "q4",
                    "title": "What does a grey background on the minimap mean?",
                    "isRequired":true,
                    "choices": [{"value": "correct", "text": "That you have accurate information of blockages and openings for that section of the building"},
                                {"value": "item2", "text": "That you know where the victims are for that section of the building"},
                                {"value": "item3", "text": "That there has been a fire in that section"},
                                {"value": "item4", "text": "That you don’t have any up-to-date information for that section of the building"}],
                    "choicesOrder":"random"}
                ]
            }],
"questionsOrder":"random",
"showProgressBar":"both",
"progressBarType":"questions",
"questionTitlePattern":"numTitle",
"completeText": "Check Result",
"questionsOnPageMode":"singlePage"
}

// var socketURL = "http://asist-api.herokuapp.com/"
var socketURL  = "http://127.0.0.1:5000"
export {phaserConfig, getMapData, getGameData, socketURL, getRandomConfig, surveyJSON};
