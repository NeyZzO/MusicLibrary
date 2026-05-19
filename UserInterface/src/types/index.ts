export interface Author {
  id: string;
  name: string;
  photoUrl: string;
  bannerUrl: string;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  authorId: string;
  releaseYear: number;
}

export interface Title {
  id: string;
  name: string;
  duration: number; // in seconds
  albumId: string | null;
  authorId: string | null;
  lyricsId?: string;
  filePath?: string;
  hasAggregatedInfo: boolean;
}
