import { useState } from 'react';
import { Card, Spin } from 'antd';
import Image from 'next/image';
import { Product } from '@/types/product';

const { Meta } = Card;
interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Card hoverable>
      {isLoading && (
        <div className="w-full h-48 flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}
      <div className="flex justify-center">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="/placeholder.png"
          onLoadingComplete={handleImageLoadingComplete}
        />
      </div>
      <Meta title={product.title} description={`$${product.price}`} />
    </Card>
  );
};
