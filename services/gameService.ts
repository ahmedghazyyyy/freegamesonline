import { Game, GameCategory } from '../types';

export async function fetchGames(): Promise<Game[]> {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error(`Server error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn('GameMonetize feed is not an array:', data);
      return [];
    }

    console.log(`Successfully fetched ${data.length} games from server proxy.`);
    return data.map((item: any, index: number) => ({
      id: item.id || `gm-${index}`,
      title: item.title || 'Untitled Game',
      description: item.description || '',
      category: mapCategory(item.category),
      imageUrl: item.thumb || item.image || `https://picsum.photos/seed/${index}/600/400`,
      gameUrl: item.url,
      rating: parseFloat(item.rating) || (4 + Math.random()),
      players: `${Math.floor(Math.random() * 900 + 100)}k`,
      isFeatured: index < 4
    }));
  } catch (error) {
    console.error('Failed to fetch games from server proxy:', error);
    // If server proxy fails, we could fallback to client-side proxies, 
    // but usually if the server can't reach it, client-side proxies might also fail.
    // Let's just return empty array and use the static fallback in App.tsx
    return [];
  }
}

function mapCategory(cat: string): GameCategory {
  const categoryMap: { [key: string]: GameCategory } = {
    'Action': GameCategory.ACTION,
    'Adventure': GameCategory.ADVENTURE,
    'Puzzle': GameCategory.PUZZLE,
    'Strategy': GameCategory.STRATEGY,
    'Racing': GameCategory.RACING,
    'Sports': GameCategory.SPORTS,
  };
  return categoryMap[cat] || GameCategory.ALL;
}
