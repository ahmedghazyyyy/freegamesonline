import { Game, GameCategory } from './types';

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Neon Cyber Race 2077',
    description: 'High-voltage racing through a synthwave dream. Drift, dodge, and dominate the digital streets.',
    category: GameCategory.RACING,
    imageUrl: 'https://picsum.photos/seed/game1/600/400',
    gameUrl: 'https://html5.gamemonetize.com/8z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.8,
    players: '1.2M',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Galactic Defender',
    description: 'Neon lasers vs. cosmic terrors. Blast your way through the galaxy in this high-octane shooter.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game2/600/400',
    gameUrl: 'https://html5.gamemonetize.com/9z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.5,
    players: '850k',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Mystery Mansion',
    description: 'A neon-noir puzzle thriller. Solve the mansion\'s dark secrets before the shadows take you.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game3/600/400',
    gameUrl: 'https://html5.gamemonetize.com/7z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.7,
    players: '500k'
  },
  {
    id: '4',
    title: 'Kingdom Wars',
    description: 'Command the neon battlefield. Build, conquer, and rule in this epic strategy showdown.',
    category: GameCategory.STRATEGY,
    imageUrl: 'https://picsum.photos/seed/game4/600/400',
    gameUrl: 'https://html5.gamemonetize.com/6z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.6,
    players: '2M'
  },
  {
    id: '5',
    title: 'Street Hoops',
    description: 'Urban basketball under the glow. Pull off insane tricks and own the court in the neon city.',
    category: GameCategory.SPORTS,
    imageUrl: 'https://picsum.photos/seed/game5/600/400',
    gameUrl: 'https://html5.gamemonetize.com/5z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.4,
    players: '300k'
  },
  {
    id: '6',
    title: 'Zombie Survival',
    description: 'The apocalypse has a neon pulse. Fight the undead and survive the radioactive night.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game6/600/400',
    gameUrl: 'https://html5.gamemonetize.com/4z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.3,
    players: '900k'
  },
  {
    id: '7',
    title: 'Crystal Quest',
    description: 'Vibrant gems and glowing grids. Match your way through a prismatic puzzle adventure.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game7/600/400',
    gameUrl: 'https://html5.gamemonetize.com/3z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.9,
    players: '1.5M'
  },
  {
    id: '8',
    title: 'Moto Xtreme',
    description: 'Adrenaline-fueled stunts on neon tracks. Push your bike to the limit in this extreme racer.',
    category: GameCategory.RACING,
    imageUrl: 'https://picsum.photos/seed/game8/600/400',
    gameUrl: 'https://html5.gamemonetize.com/2z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.2,
    players: '600k'
  },
  {
    id: '9',
    title: 'Deep Sea Explorer',
    description: 'Dive into the bioluminescent abyss. Discover lost worlds in the glowing depths of the ocean.',
    category: GameCategory.ADVENTURE,
    imageUrl: 'https://picsum.photos/seed/game9/600/400',
    gameUrl: 'https://html5.gamemonetize.com/1z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.6,
    players: '450k'
  },
  {
    id: '10',
    title: 'Cyber Punk Runner',
    description: 'Run through the neon rain. Dodge obstacles and collect data chips in this endless runner.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game10/600/400',
    gameUrl: 'https://html5.gamemonetize.com/0z0v6v6v6v6v6v6v6v6v6v6v6v6v6v6v/',
    rating: 4.4,
    players: '700k'
  },
  {
    id: '11',
    title: 'Neon Tetris',
    description: 'The classic block-stacking game with a vibrant neon twist. Clear lines and set high scores.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game11/600/400',
    rating: 4.8,
    players: '3M'
  },
  {
    id: '12',
    title: 'Space Invaders Neo',
    description: 'Defend Earth from glowing alien invaders. Retro arcade action with modern neon visuals.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game12/600/400',
    rating: 4.5,
    players: '1.1M'
  },
  {
    id: '13',
    title: 'Digital Chess',
    description: 'Strategy meets synthwave. Play the game of kings on a glowing digital board.',
    category: GameCategory.STRATEGY,
    imageUrl: 'https://picsum.photos/seed/game13/600/400',
    rating: 4.7,
    players: '400k'
  },
  {
    id: '14',
    title: 'Neon Drift',
    description: 'Master the art of drifting on glowing tracks. High-speed racing with a neon pulse.',
    category: GameCategory.RACING,
    imageUrl: 'https://picsum.photos/seed/game14/600/400',
    rating: 4.3,
    players: '550k'
  },
  {
    id: '15',
    title: 'Glow Golf',
    description: 'Mini-golf like you\'ve never seen it. Putt through neon obstacles and glowing greens.',
    category: GameCategory.SPORTS,
    imageUrl: 'https://picsum.photos/seed/game15/600/400',
    rating: 4.2,
    players: '250k'
  },
  {
    id: '16',
    title: 'Synthwave Samurai',
    description: 'Slice through enemies in a neon-drenched future. Fast-paced action with a retro beat.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game16/600/400',
    rating: 4.6,
    players: '800k'
  },
  {
    id: '17',
    title: 'Laser Labyrinth',
    description: 'Navigate a maze of glowing lasers. Use your wits to find the exit in this neon puzzle.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game17/600/400',
    rating: 4.5,
    players: '350k'
  },
  {
    id: '18',
    title: 'Starship Commander',
    description: 'Lead your neon fleet to victory. Epic space battles and strategic conquests await.',
    category: GameCategory.STRATEGY,
    imageUrl: 'https://picsum.photos/seed/game18/600/400',
    rating: 4.8,
    players: '1.4M'
  },
  {
    id: '19',
    title: 'Neon Bowling',
    description: 'Strike it big in the neon lanes. Classic bowling with a vibrant, glowing atmosphere.',
    category: GameCategory.SPORTS,
    imageUrl: 'https://picsum.photos/seed/game19/600/400',
    rating: 4.1,
    players: '200k'
  },
  {
    id: '20',
    title: 'Digital Dungeon',
    description: 'Explore a glowing dungeon filled with neon monsters. A retro-style RPG adventure.',
    category: GameCategory.ADVENTURE,
    imageUrl: 'https://picsum.photos/seed/game20/600/400',
    rating: 4.7,
    players: '650k'
  },
  {
    id: '21',
    title: 'Neon Snake',
    description: 'The classic snake game with a glowing twist. Grow your snake and avoid the walls.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game21/600/400',
    rating: 4.4,
    players: '2.5M'
  },
  {
    id: '22',
    title: 'Cyber Soccer',
    description: 'Fast-paced soccer in a neon stadium. Score goals and win the digital cup.',
    category: GameCategory.SPORTS,
    imageUrl: 'https://picsum.photos/seed/game22/600/400',
    rating: 4.3,
    players: '750k'
  },
  {
    id: '23',
    title: 'Neon Ninja',
    description: 'Stealth and speed in a glowing world. Master the art of the neon ninja.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game23/600/400',
    rating: 4.6,
    players: '950k'
  },
  {
    id: '24',
    title: 'Glow Blocks',
    description: 'A relaxing puzzle game with glowing blocks. Fit the pieces together and clear the board.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game24/600/400',
    rating: 4.2,
    players: '1.2M'
  },
  {
    id: '25',
    title: 'Neon Kart',
    description: 'Kart racing on vibrant, glowing tracks. Use power-ups and drift to victory.',
    category: GameCategory.RACING,
    imageUrl: 'https://picsum.photos/seed/game25/600/400',
    rating: 4.5,
    players: '1.8M'
  },
  {
    id: '26',
    title: 'Digital Defense',
    description: 'Protect your server from neon viruses. A fast-paced tower defense game.',
    category: GameCategory.STRATEGY,
    imageUrl: 'https://picsum.photos/seed/game26/600/400',
    rating: 4.4,
    players: '500k'
  },
  {
    id: '27',
    title: 'Neon Archer',
    description: 'Test your aim with glowing arrows. Hit the targets and set new high scores.',
    category: GameCategory.ACTION,
    imageUrl: 'https://picsum.photos/seed/game27/600/400',
    rating: 4.3,
    players: '300k'
  },
  {
    id: '28',
    title: 'Glow Rider',
    description: 'Ride your neon bike through a futuristic city. Avoid obstacles and collect coins.',
    category: GameCategory.RACING,
    imageUrl: 'https://picsum.photos/seed/game28/600/400',
    rating: 4.2,
    players: '400k'
  },
  {
    id: '29',
    title: 'Neon Sudoku',
    description: 'The classic number puzzle with a glowing neon interface. Challenge your brain.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game29/600/400',
    rating: 4.6,
    players: '150k'
  },
  {
    id: '30',
    title: 'Cyber Boxing',
    description: 'Step into the neon ring. Punch your way to the top in this digital boxing game.',
    category: GameCategory.SPORTS,
    imageUrl: 'https://picsum.photos/seed/game30/600/400',
    rating: 4.4,
    players: '550k'
  },
  {
    id: '31',
    title: 'Neon Escape',
    description: 'Find your way out of a glowing maze. A challenging adventure in a neon world.',
    category: GameCategory.ADVENTURE,
    imageUrl: 'https://picsum.photos/seed/game31/600/400',
    rating: 4.5,
    players: '300k'
  },
  {
    id: '32',
    title: 'Digital Dominoes',
    description: 'Play the classic game of dominoes with a vibrant neon twist. Fun for everyone.',
    category: GameCategory.PUZZLE,
    imageUrl: 'https://picsum.photos/seed/game32/600/400',
    rating: 4.1,
    players: '100k'
  }
];
