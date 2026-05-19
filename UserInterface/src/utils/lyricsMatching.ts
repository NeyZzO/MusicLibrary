export function levenshteinDistance(a: string, b: string): number {
  if (!a) return b ? b.length : 0;
  if (!b) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1).toLowerCase() == a.charAt(j - 1).toLowerCase()) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function isPerfectMatch(
  result: any, 
  targetDuration: number, 
  targetName: string, 
  targetArtist: string, 
  targetAlbum: string
): boolean {
  if (!result) return false;
  
  const hasSyncedLyrics = !!result.syncedLyrics;
  const isDurationClose = Math.abs((result.duration || 0) - targetDuration) <= 2;
  
  const nameDist = levenshteinDistance(result.trackName || result.name, targetName);
  const artistDist = levenshteinDistance(result.artistName, targetArtist);
  // We can be a bit more lenient on albums since single vs album versions exist
  const isNameClose = nameDist <= 2;
  const isArtistClose = artistDist <= 2;

  return hasSyncedLyrics && isDurationClose && isNameClose && isArtistClose;
}

export function rankResults(
  results: any[], 
  targetDuration: number, 
  targetName: string, 
  targetArtist: string, 
  targetAlbum: string
) {
  return [...results].sort((a, b) => {
    // Lower score is better
    const getScore = (res: any) => {
      let score = 0;
      
      const nameDist = levenshteinDistance(res.trackName || res.name, targetName);
      const artistDist = levenshteinDistance(res.artistName, targetArtist);
      const albumDist = levenshteinDistance(res.albumName, targetAlbum);
      
      // Heavily penalize text differences
      score += nameDist * 10;
      score += artistDist * 10;
      score += albumDist * 2;
      
      // Penalize duration differences (seconds)
      const durationDiff = Math.abs((res.duration || 0) - targetDuration);
      if (durationDiff <= 2) {
        score -= 50; // Bonus for exact match
      } else {
        score += durationDiff * 2;
      }
      
      // Bonus if it has synced lyrics
      if (res.syncedLyrics) {
        score -= 30;
      }

      return score;
    };

    return getScore(a) - getScore(b);
  });
}
