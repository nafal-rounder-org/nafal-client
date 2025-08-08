import { create } from 'zustand';

export interface RankingProduct {
  id: string;
  rank: number;
  name: string;
  eventName: string;
  currentPrice: number;
  bidCount: number;
  remainingTime: string;
  imageUrl: string;
  isLiked: boolean;
  categories: string[];
  viewCount: number;
  createdAt: string;
}

interface RankingStore {
  // 상태
  products: RankingProduct[];
  selectedCategories: string[];
  sortType: 'bidCount' | 'maxBid';
  isLoading: boolean;
  refreshTime: Date;
  error: string | null;

  // 액션
  setProducts: (products: RankingProduct[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSortType: (sortType: 'bidCount' | 'maxBid') => void;
  setIsLoading: (loading: boolean) => void;
  setRefreshTime: (time: Date) => void;
  setError: (error: string | null) => void;

  // 비즈니스 로직
  fetchRankingProducts: () => Promise<void>;
  toggleLike: (productId: string) => Promise<void>;
  refreshData: () => Promise<void>;
  sortProducts: () => RankingProduct[];
  filterProducts: () => RankingProduct[];
}

export const useRankingStore = create<RankingStore>((set, get) => ({
  // 초기 상태
  products: [],
  selectedCategories: [
    '최애의 아이템', '위대한 쇼룸', '0번째 작품', '관계자 외 출입 가능'
  ],
  sortType: 'bidCount',
  isLoading: false,
  refreshTime: new Date(),
  error: null,

  // 액션
  setProducts: (products) => set({ products }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setSortType: (sortType) => set({ sortType }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setRefreshTime: (time) => set({ refreshTime: time }),
  setError: (error) => set({ error }),

  // 비즈니스 로직
  fetchRankingProducts: async () => {
    const { setIsLoading, setProducts, setError } = get();
    setIsLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출 대신 모의 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: RankingProduct[] = [
        {
          id: '1',
          rank: 1,
          name: '미니멀리스트의 꿈, 모던 아트 컬렉션',
          eventName: '현대 미술의 거장들',
          currentPrice: 150000,
          bidCount: 12,
          remainingTime: '24시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=1',
          isLiked: false,
          categories: ['최애의 아이템'],
          viewCount: 1500,
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          rank: 2,
          name: '클래식의 재해석, 빈티지 디자인',
          eventName: '디자인 히스토리',
          currentPrice: 180000,
          bidCount: 8,
          remainingTime: '18시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=2',
          isLiked: true,
          categories: ['위대한 쇼룸'],
          viewCount: 1200,
          createdAt: '2024-01-14T15:30:00Z'
        },
        {
          id: '3',
          rank: 3,
          name: '자연의 아름다움, 오가닉 아트',
          eventName: '자연과 예술',
          currentPrice: 120000,
          bidCount: 15,
          remainingTime: '36시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=3',
          isLiked: false,
          categories: ['0번째 작품'],
          viewCount: 2000,
          createdAt: '2024-01-13T09:15:00Z'
        },
        {
          id: '4',
          rank: 4,
          name: '미래를 그리는 디지털 아트',
          eventName: '테크 아트 컬렉션',
          currentPrice: 200000,
          bidCount: 6,
          remainingTime: '12시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=4',
          isLiked: false,
          categories: ['관계자 외 출입 가능'],
          viewCount: 800,
          createdAt: '2024-01-12T14:45:00Z'
        },
        {
          id: '5',
          rank: 5,
          name: '감성의 표현, 추상 미술',
          eventName: '추상의 세계',
          currentPrice: 160000,
          bidCount: 10,
          remainingTime: '48시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=5',
          isLiked: true,
          categories: ['최애의 아이템', '위대한 쇼룸'],
          viewCount: 1800,
          createdAt: '2024-01-11T11:20:00Z'
        },
        {
          id: '6',
          rank: 6,
          name: '전통의 현대적 해석',
          eventName: '전통과 현대',
          currentPrice: 140000,
          bidCount: 7,
          remainingTime: '30시간 남음',
          imageUrl: 'https://picsum.photos/200/200?random=6',
          isLiked: false,
          categories: ['0번째 작품'],
          viewCount: 950,
          createdAt: '2024-01-10T16:10:00Z'
        }
      ];
      
      setProducts(mockProducts);
    } catch (error) {
      setError('상품 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  },

  toggleLike: async (productId: string) => {
    const { products, setProducts } = get();
    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, isLiked: !product.isLiked }
        : product
    );
    setProducts(updatedProducts);
  },

  refreshData: async () => {
    const { fetchRankingProducts, setRefreshTime } = get();
    await fetchRankingProducts();
    setRefreshTime(new Date());
  },

  sortProducts: () => {
    const { products, sortType } = get();
    return [...products].sort((a, b) => {
      if (sortType === 'bidCount') {
        return b.bidCount - a.bidCount;
      } else {
        return b.currentPrice - a.currentPrice;
      }
    });
  },

  filterProducts: () => {
    const { products, selectedCategories } = get();
    if (selectedCategories.length === 0) return products;
    
    return products.filter(product =>
      product.categories.some(category => selectedCategories.includes(category))
    );
  }
}));
