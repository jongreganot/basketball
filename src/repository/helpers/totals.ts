import { StatTypes } from "../../constants/stat-type.ts";

export const getTotal = (players, statType) => {
    let sum = 0;
    switch(statType) {
        case StatTypes.Pts:
            if (players.length > 0)
                sum = players.map(player => player.pts).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Rebs:
            if (players.length > 0)
                sum = players.map(player => player.rebs).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Ast:
            if (players.length > 0)
                sum = players.map(player => player.ast).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Stl:
            if (players.length > 0)
                sum = players.map(player => player.stl).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Blk:
            if (players.length > 0)
                sum = players.map(player => player.blk).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtMake:
            if (players.length > 0)
                sum = players.map(player => player.ftMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtAttempt:
            if (players.length > 0)
                sum = players.map(player => player.ftAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtMakeAttemptPercent:
            if (players.length > 0) {
                let totalFtMake = players.map(player => player.ftMake).reduce((prev, next) => prev + next);
                let totalFtAttempt = players.map(player => player.ftAttempt).reduce((prev, next) => prev + next);
                sum = totalFtMake / totalFtAttempt * 100;
            }
            break;
        case StatTypes.FgMake:
            if (players.length > 0)
                sum = players.map(player => player.fgMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FgAttempt:
            if (players.length > 0)
                sum = players.map(player => player.fgAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FgMakeAttemptPercent:
            if (players.length > 0) {
                let totalFgMake = players.map(player => player.fgMake).reduce((prev, next) => prev + next);
                let totalFgAttempt = players.map(player => player.fgAttempt).reduce((prev, next) => prev + next);
                sum = totalFgMake / totalFgAttempt * 100;
            }
            break;
        case StatTypes.ThreePtMake:
            if (players.length > 0) 
                sum = players.map(player => player.threePtMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.ThreePtAttempt:
            if (players.length > 0)
                sum = players.map(player => player.threePtAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.ThreePtMakeAttemptPercent:
            if (players.length > 0) {
                let totalThreeMake = players.map(player => player.threePtMake).reduce((prev, next) => prev + next);
                let totalThreeAttempt = players.map(player => player.threePtAttempt).reduce((prev, next) => prev + next);
                sum = totalThreeMake / totalThreeAttempt * 100;
            }
            break;
        case StatTypes.TotalFgMake:
            if (players.length > 0)
                sum = players.map(player => player.totalFgMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.TotalFgAttempt:
            if (players.length > 0)
                sum = players.map(player => player.totalFgAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.TotalFgMakeAttemptPercent:
            if (players.length > 0) {
                let totalTotalFgMake = players.map(player => player.totalFgMake).reduce((prev, next) => prev + next);
                let totalTotalFgAttempt = players.map(player => player.totalFgAttempt).reduce((prev, next) => prev + next);
                sum = totalTotalFgMake / totalTotalFgAttempt * 100;
            }
            break;
        case StatTypes.Tov:
            if (players.length > 0)
                sum = players.map(player => player.tov).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Fls:
            if (players.length > 0)
                sum = players.map(player => player.fls).reduce((prev, next) => prev + next)
            break;

        default:
            break;
    }

    return sum;
}