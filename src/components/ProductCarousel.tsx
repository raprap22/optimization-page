import React, { useState } from 'react';
import { Carousel, Spin, Row, Col, Typography, Card, Badge, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/api';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ProductDetail } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ProductCarouselProps {
  productId: number;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ productId }) => {
  const {
    data: productDetails,
    isLoading,
    error,
  } = useQuery<ProductDetail>({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductById(productId),
  });
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="flex justify-center items-center h-full p-12">
        <Typography.Text type="danger">Error loading product details.</Typography.Text>
      </div>
    );
  }

  const { title, description, price, images, stock } = productDetails;

  return (
    <div className="py-10 flex">
      <Row gutter={24} className="justify-center">
        <Col span={12}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBackClick}
            className="text-lg font-medium mb-5"
            type='primary'
          >
            Back
          </Button>
          <Card title={title} bordered={true} className="w-full shadow-lg">
            <Carousel autoplay effect="fade" className="w-full rounded-lg">
              {images.map((url, index) => (
                <Image
                  src={url}
                  alt={title}
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                />
              ))}
            </Carousel>
            <Typography.Paragraph className="mt-4">{description}</Typography.Paragraph>
            <Typography.Title level={4} className="mt-2">
              ${price}
            </Typography.Title>
            <Badge
              count={stock > 0 ? 'In Stock' : 'Out of Stock'}
              style={{ backgroundColor: stock > 0 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
