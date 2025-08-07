import { ProductDetailLayout } from '@/components/product/ProductDetailLayout';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailLayout productId={params.id} />;
}
