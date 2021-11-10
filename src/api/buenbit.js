import cryptoya from "./cryptoya";

export const getBuenBitDaiArsPair = () => cryptoya.get("/buenbit/dai");
