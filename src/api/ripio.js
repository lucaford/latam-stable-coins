import cryptoya from "./cryptoya";

export const getRipioUsdcArsPair = () => cryptoya.get("/ripio/usdc");

export const getRipioDaiArsPair = () => cryptoya.get("/ripio/dai");
