
export const calcCreatorQuestPool = (quest) => {
  const {players, entryFee} = quest;
  let prizePoolMode = 1;
  if((quest.isFixedPricePool && quest.fixedPricePool && quest.fixedPricePool > 0) || (quest.prizePoolMode === 2 && quest.prizePool > 0) ) {
    prizePoolMode = 2;
  }else if(quest.prizePoolMode === 3 && quest.prizePool > 0 ){
    prizePoolMode = 3;
  }
  if(prizePoolMode === 1){
    return Math.ceil(players.length * entryFee * 0.8)
  }else if(prizePoolMode === 2){
    if(quest.fixedPricePool && quest.fixedPricePool){
      return quest.fixedPricePool;
    }else {
      return quest.prizePool ?? 0;
    }
  }else {
    return (quest.prizePool?? 0) + Number(players.length * entryFee)
  }
}

export const calcFunGameModeReward = (quest) => {
  const {players} = quest;
  const playersCount = players.length;
  const rewardsCount = playersCount >= 3 ? (Math.round(playersCount * 0.3)) : 1;
  const prizePool = quest.prizePoolMode === 2 ? quest.prizePool :0;
  return Math.ceil(((prizePool)/rewardsCount)??0);
}

export const calcFunGameModePlacement = (quest) => {
  const {players } = quest;
  const playersCount = players.length;
  if(playersCount <=3 ){
    return {start:1, end:1}
  }else {
    const rewardsCount = Math.round(playersCount * 0.3);
    return {
      start:1, end:rewardsCount
    }
  }
}

export const calcCreatorQuestTier = (quest) => {
  const {players, entryFee} = quest;
  const playersCount = players.length;
  const isFixedOrHybrid = (quest.isFixedPricePool && quest.fixedPricePool && quest.fixedPricePool > 0) || (quest.prizePoolMode === 2 && quest.prizePool > 0) || (quest.prizePoolMode === 3 && quest.prizePool > 0);
  if(playersCount >= 10){
    const pool = calcCreatorQuestPool(quest);
    const userPerTier = Math.round((playersCount/10));

    const tier1 = isFixedOrHybrid? Math.ceil((pool * 0.5)/userPerTier) : Math.ceil((pool * 0.4)/userPerTier);
    const tier2 = isFixedOrHybrid? Math.ceil((pool * 0.3)/userPerTier) : Math.ceil((pool * 0.24)/userPerTier);
    const tier3 = isFixedOrHybrid? Math.ceil((pool * 0.2)/userPerTier): Math.ceil((pool * 0.16)/userPerTier);
    return {
      tier1,
      tier2,
      tier3
    }
  } else {
    if(isFixedOrHybrid){
      const pool = calcCreatorQuestPool(quest);
      return {
        tier1:Math.ceil(pool * 0.5),
        tier2:Math.ceil(pool * 0.3),
        tier3:Math.ceil(pool * 0.2)
      }
    }else {
      return {
        tier1:entryFee,
        tier2:entryFee,
        tier3:entryFee
      }
    }
  }
}

export const calcCreatorQuestTierPlacement = (quest) => {
  const {players} = quest;
  const playersCount = players.length;
  if(playersCount >= 10){
    const userPerTier = Math.round((playersCount/10));
    const tier1 = {start:1, end:userPerTier};
    const tier2 = {start:userPerTier + 1, end: userPerTier * 2};
    const tier3 = {start:userPerTier * 2 + 1, end: userPerTier * 3};
    return {
      tier1,
      tier2,
      tier3
    }
  }else {
    const tier1 = {start:1, end:1};
    const tier2 = {start:2, end: 2};
    const tier3 = {start:3, end: 3};
    return {
      tier1,
      tier2,
      tier3
    }
  }
}

export const getLevel = (points) => {
  let currentLevel = 0;
  let nextLevel = 1;
  let nextLevelPoints = 150;
  if(points < 150){
    return {
      currentLevel,
      nextLevel,
      nextLevelPoints
    }
  }else if(points >= 150 && points < 400){
    currentLevel = 1;
    nextLevel = 2;
    nextLevelPoints = 400;
  }else if(points >= 400 && points < 1000 ){
    currentLevel = 2;
    nextLevel = 3;
    nextLevelPoints = 1000;
  }else if(points >= 1000 && points < 2500 ){
    currentLevel = 3;
    nextLevel = 4;
    nextLevelPoints = 2500;
  }else if(points >= 2500 && points < 5000 ){
    currentLevel = 4;
    nextLevel = 5;
    nextLevelPoints = 5000;
  }else if(points >= 5000 ){
    currentLevel = 5;
    nextLevel = 5;
    nextLevelPoints = 5000;
  }

  return {
    currentLevel,
    nextLevel,
    nextLevelPoints
  }
}

export const calcProLeagueReward = (quest) => {
  const {players, entryFee, prizePoolMode} = quest; 
  const playersCount = players.length;
  let prizePool = Math.round(playersCount * entryFee * 0.8);
  if(prizePoolMode === 2){
    prizePool = quest?.prizePool??0;
  }else if(prizePool === 3){
    prizePool = (quest.prizePool?? 0) + Number(players.length * entryFee);
  }

  return {
    first:Math.round(prizePool* 0.5),
    second:Math.round(prizePool* 0.3),
    third: Math.round(prizePool * 0.2)
  }
}

export const calcProLeaguePool = (quest) => {
  const {players, entryFee, prizePoolMode} = quest; 
  const playersCount = players.length;
  let prizePool = Math.round(playersCount * entryFee * 0.8);
  if(prizePoolMode === 2){
    prizePool = quest?.prizePool??0;
  }else if(prizePool === 3){
    prizePool = (quest.prizePool?? 0) + Number(players.length * entryFee);
  }
  return prizePool;
}