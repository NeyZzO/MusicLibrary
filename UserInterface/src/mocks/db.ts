import type { Author, Album, Title } from '../types';

export const AUTHORS: Author[] = [
  {
    id: 'a1',
    name: 'Daft Punk',
    photoUrl: 'https://i.scdn.co/image/ab6761610000e5ebb33ac798e4d35272a0899ab4',
    bannerUrl: 'https://i.scdn.co/image/ab676186000010165b4c952ff75c1fcab9e8dcdc'
  },
  {
    id: 'a2',
    name: 'The Weeknd',
    photoUrl: 'https://i.scdn.co/image/ab6761610000e5eb2dd7e4244f776ac713807204',
    bannerUrl: 'https://i.scdn.co/image/ab67618600001016d9a9cb274483cf31cd3472dc'
  }
];

export const ALBUMS: Album[] = [
  {
    id: 'al1',
    title: 'Random Access Memories',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273b313ef00bd27acae4ffbda6d',
    authorId: 'a1',
    releaseYear: 2013
  },
  {
    id: 'al2',
    title: 'Discovery',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2732a393dc5871f76f4e17c0a6b',
    authorId: 'a1',
    releaseYear: 2001
  },
  {
    id: 'al3',
    title: 'Starboy',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    authorId: 'a2',
    releaseYear: 2016
  }
];

export const TITLES: Title[] = [
  { id: 't1', name: 'Get Lucky', duration: 369, albumId: 'al1', authorId: 'a1', hasAggregatedInfo: true },
  { id: 't2', name: 'Instant Crush', duration: 338, albumId: 'al1', authorId: 'a1', hasAggregatedInfo: true },
  { id: 't3', name: 'One More Time', duration: 320, albumId: 'al2', authorId: 'a1', hasAggregatedInfo: true },
  { id: 't4', name: 'Harder, Better, Faster, Stronger', duration: 224, albumId: 'al2', authorId: 'a1', hasAggregatedInfo: true },
  { id: 't5', name: 'Starboy', duration: 230, albumId: 'al3', authorId: 'a2', hasAggregatedInfo: true },
  { id: 't6', name: 'I Feel It Coming', duration: 269, albumId: 'al3', authorId: 'a2', hasAggregatedInfo: true },
  { id: 't7', name: 'Unknown Track 1.mp3', duration: 180, albumId: null, authorId: null, hasAggregatedInfo: false, filePath: '/home/user/Music/Unknown Track 1.mp3' },
];
