import cryptoya from "./cryptoya";

export const getSatoshiTangoUsdcArsPair = () =>
  cryptoya.get("/satoshitango/usdc");

export const getSatoshiTangoDaiArsPair = () =>
  cryptoya.get("/satoshitango/dai");
