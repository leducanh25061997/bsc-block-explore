export const decimalMultiplication = (coin?: string) => {
  switch (coin) {
    case "USDT":
      return 18;
    case "USDC":
      return 18;
    case "ETH":
      return 18;
    case "PEPE":
      return 18;
    case "DOGE":
      return 8;
    case "TON":
      return 18;
    case "SHIBA":
      return 18;
    case "BONK":
      return 5;
    case "LINK":
      return 18;
    case "NEAR":
      return 18;
    case "VET":
      return 18;
    case "FLOKI":
      return 9;
    case "OP":
      return 18;
    case "ARB":
      return 18;
    default:
      return 18;
  }
};
