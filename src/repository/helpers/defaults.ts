export const defaultToZero = (player) => {
  
    if (player.pts < 0)
      player.pts = 0;
  
    if (player.rebs < 0)
        player.rebs = 0;
  
    if (player.ast < 0)
        player.ast = 0;
    
    if (player.stl < 0)
        player.stl = 0;
    
    if (player.blk < 0)
        player.blk = 0;

    if (player.fgMake < 0)
        player.fgMake = 0;

    if (player.fgAttempt < 0)
        player.fgAttempt = 0;

    if (player.ftMake < 0)
        player.ftMake = 0;

    if (player.ftAttempt < 0)
        player.ftAttempt = 0;

    if (player.threePtMake < 0)
        player.threePtMake = 0;

    if (player.threePtAttempt < 0)
        player.threePtAttempt = 0;

    if (player.totalFgMake < 0)
        player.totalFgMake = 0;

    if (player.totalFgAttempt < 0)
        player.totalFgAttempt = 0;
    
    if (player.tov < 0)
        player.tov = 0;
      
    if (player.fls < 0)
        player.fls = 0;
}