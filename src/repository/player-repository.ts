import { StatTypes } from "../constants/stat-type.ts";

export const setDefaultProperties = (player) => {
    player.pts = 0;
    player.rebs = 0;
    player.ast = 0;
    player.stl = 0;
    player.blk = 0;
    player.fgMake = 0;
    player.fgAttempt = 0;
    player.fgMakeAttemptPercent = 0;
    player.ftMake = 0;
    player.ftAttempt = 0;
    player.ftMakeAttemptPercent = 0;
    player.threePtMake = 0;
    player.threePtAttempt = 0;
    player.threePtMakeAttemptPercent = 0;
    player.tov = 0;
    player.fls = 0;
    
    return player;
}

export const updateStat = (player, statPt, statType) => {
    switch (statType) {
        case StatTypes.Pts:
          player.pts += statPt;
    
          if (player.pts < 0)
            player.pts = 0;
          break;
        case StatTypes.Rebs:
          player.rebs += statPt;
    
          if (player.rebs < 0)
            player.rebs = 0;
          break;
        case StatTypes.Ast:
          player.ast += statPt;
      
          if (player.ast < 0)
            player.ast = 0;
          break;
        case StatTypes.Stl:
          player.stl += statPt;
      
          if (player.stl < 0)
            player.stl = 0;
          break;
        case StatTypes.Blk:
          player.blk += statPt;
      
          if (player.blk < 0)
            player.blk = 0;
          break;
        case StatTypes.FgMake:
          player.fgMake += statPt;
          player.fgAttempt++;
          player.pts += 2;
          player.totalFgMake++;
          player.totalFgAttempt++;
          player.fgMakeAttemptPercent = computeFgMakeAttemptPercentage(player);
          player.totalFgMakeAttemptPercent = computeTotalFgMakeAttemptPercentage(player);
          break;
        case StatTypes.FgAttempt:
          player.fgAttempt++;
          player.totalFgAttempt++;
          player.totalFgMakeAttemptPercent = computeTotalFgMakeAttemptPercentage(player);
          player.fgMakeAttemptPercent = computeFgMakeAttemptPercentage(player);
          break;
        case StatTypes.FtMake:
          player.ftMake += statPt;
          player.ftAttempt++;
          player.pts++;
          player.ftMakeAttemptPercent = computeFtMakeAttemptPercentage(player);
          break;
        case StatTypes.FtAttempt:
          player.ftAttempt++;
          player.ftMakeAttemptPercent = computeFtMakeAttemptPercentage(player);
          break;
        case StatTypes.ThreePtMake:
          player.threePtMake += statPt;
          player.threePtAttempt++;
          player.pts += 3;
          player.totalFgMake++;
          player.totalFgAttempt++;
          player.threePtMakeAttemptPercent = computeThreePtMakeAttemptPercentage(player);
          player.totalFgMakeAttemptPercent = computeTotalFgMakeAttemptPercentage(player);
          break;
        case StatTypes.ThreePtAttempt:
          player.threePtAttempt += statPt;
          player.totalFgAttempt++;
          player.totalFgMakeAttemptPercent = computeTotalFgMakeAttemptPercentage(player);
          player.threePtMakeAttemptPercent = computeThreePtMakeAttemptPercentage(player);
          break;
        case StatTypes.Tov:
          player.tov += statPt;
      
          if (player.tov < 0)
            player.tov = 0;
          break;
        case StatTypes.Fls:
          player.fls += statPt;
      
          if (player.fls < 0)
            player.fls = 0;
          break;
  
        default:
          break;
      }

    return player;
}

const computeFgMakeAttemptPercentage = (player) => player.fgMake / player.fgAttempt * 100;
const computeFtMakeAttemptPercentage = (player) => player.ftMake / player.ftAttempt * 100;
const computeThreePtMakeAttemptPercentage = (player) => player.threePtMake / player.threePtAttempt * 100;
const computeTotalFgMakeAttemptPercentage = (player) => (player.fgMake + player.threePtMake) / (player.fgAttempt + player.threePtAttempt) * 100;