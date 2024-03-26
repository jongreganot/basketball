import { StatTypes } from "../../constants/stat-type.ts";

export const getTotal = (players, statType) => {
    let sum = 0;
    switch(statType) {
        case StatTypes.Pts:
            sum = players.map(player => player.pts).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Rebs:
            sum = players.map(player => player.rebs).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Ast:
            sum = players.map(player => player.ast).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Stl:
            sum = players.map(player => player.stl).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Blk:
            sum = players.map(player => player.blk).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtMake:
            sum = players.map(player => player.ftMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtAttempt:
            sum = players.map(player => player.ftAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FtMakeAttemptPercent:
            let totalFtMake = players.map(player => player.ftMake).reduce((prev, next) => prev + next);
            let totalFtAttempt = players.map(player => player.ftAttempt).reduce((prev, next) => prev + next);
            sum = totalFtMake / totalFtAttempt * 100;
            break;
        case StatTypes.FgMake:
            sum = players.map(player => player.fgMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FgAttempt:
            sum = players.map(player => player.fgAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.FgMakeAttemptPercent:
            let totalFgMake = players.map(player => player.fgMake).reduce((prev, next) => prev + next);
            let totalFgAttempt = players.map(player => player.fgAttempt).reduce((prev, next) => prev + next);
            sum = totalFgMake / totalFgAttempt * 100;
            break;
        case StatTypes.ThreePtMake:
            sum = players.map(player => player.fgMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.ThreePtAttempt:
            sum = players.map(player => player.fgAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.ThreePtMakeAttemptPercent:
            let totalThreeMake = players.map(player => player.threePtMake).reduce((prev, next) => prev + next);
            let totalThreeAttempt = players.map(player => player.threePtAttempt).reduce((prev, next) => prev + next);
            sum = totalThreeMake / totalThreeAttempt * 100;
            break;
        case StatTypes.TotalFgMake:
            sum = players.map(player => player.totalFgMake).reduce((prev, next) => prev + next)
            break;
        case StatTypes.TotalFgAttempt:
            sum = players.map(player => player.totalFgAttempt).reduce((prev, next) => prev + next)
            break;
        case StatTypes.TotalFgMakeAttemptPercent:
            let totalTotalFgMake = players.map(player => player.totalFgMake).reduce((prev, next) => prev + next);
            let totalTotalFgAttempt = players.map(player => player.totalFgAttempt).reduce((prev, next) => prev + next);
            sum = totalTotalFgMake / totalTotalFgAttempt * 100;
            break;
        case StatTypes.Tov:
            sum = players.map(player => player.tov).reduce((prev, next) => prev + next)
            break;
        case StatTypes.Fls:
            sum = players.map(player => player.fls).reduce((prev, next) => prev + next)
            break;

        default:
            break;
    }

    return sum;
}