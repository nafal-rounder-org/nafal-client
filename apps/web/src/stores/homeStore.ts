import { create } from 'zustand';

export interface Product {
  id: string;
  title: string;
  eventName: string;
  currentPrice: number;
  bidCount: number;
  remainingTime: string;
  imageUrl: string;
  isLiked: boolean;
  category: string[];
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export interface HomeState {
  // 탭 상태
  activeTab: 'recommend' | 'new' | 'ranking' | 'upcoming' | 'ending' | 'ended';

  // 신규 탭 상태
  newProducts: Product[];
  newRefreshTime: Date;
  newIsLoading: boolean;

  // 액션
  setActiveTab: (tab: HomeState['activeTab']) => void;
  setNewProducts: (products: Product[]) => void;
  setNewRefreshTime: (time: Date) => void;
  setNewIsLoading: (loading: boolean) => void;
  toggleProductLike: (productId: string) => void;
}

export const useHomeStore = create<HomeState>((set, get) => ({
  // 초기 상태
  activeTab: 'recommend',
  newProducts: [],
  newRefreshTime: new Date(),
  newIsLoading: false,

  // 액션
  setActiveTab: (tab) => set({ activeTab: tab }),

  setNewProducts: (products) => set({ newProducts: products }),

  setNewRefreshTime: (time) => set({ newRefreshTime: time }),

  setNewIsLoading: (loading) => set({ newIsLoading: loading }),

  toggleProductLike: (productId) => {
    const { newProducts } = get();
    const updatedProducts = newProducts.map((product) =>
      product.id === productId ? { ...product, isLiked: !product.isLiked } : product
    );
    set({ newProducts: updatedProducts });
  },
}));
