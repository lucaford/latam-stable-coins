export const sortCoinsBySellValue = (coins) => {
  coins.sort(function (a, b) {
    return b.bid - a.bid;
  });

  return coins;
};
