export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  imageUrl: string;
  gameUrl?: string;
  rating: number;
  players: string;
  isFeatured?: boolean;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  ADVENTURE = 'Adventure',
  PUZZLE = 'Puzzle',
  STRATEGY = 'Strategy',
  RACING = 'Racing',
  SPORTS = 'Sports'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
