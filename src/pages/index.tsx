import { useQuery } from '@tanstack/react-query';
import { Input, Col, Row, Select, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { fetchCategory, fetchProductList } from '@/services/api';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Paragraph from 'antd/es/typography/Paragraph';

const { Option } = Select;

const HomePage: React.FC = () => {
  const { push } = useRouter();

  const [category, setCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [search, setSearch] = useState<string>('');

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products', sortOrder, category, search],
    queryFn: () => fetchProductList(category, search),
    staleTime: 60 * 1000, // Cache for 1 minute
    enabled: !!category || !!sortOrder || !!search,
  });

  const { data: categories, isLoading: isLoadingCat } = useQuery<[]>({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const sortedProducts = products?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleProductClick = (productId: number) => {
    push(`/product/${productId}`);
  };

  return (
    <div className="m-[100px]">
      <Paragraph className="mb-10 text-5xl font-bold text-center">Product List</Paragraph>
      <Row gutter={16}>
        <Col span={6}>
          <Select
            placeholder="Select Category"
            value={category}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
          >
            <Option value="">All Categories</Option>
            {categories?.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <Select
            placeholder="Sort by Price"
            value={sortOrder}
            onChange={handleSortChange}
            style={{ width: '100%' }}
          >
            <Option value="asc">Price: Low to High</Option>
            <Option value="desc">Price: High to Low</Option>
          </Select>
        </Col>

        <Col span={12}>
          <Input.Search
            placeholder="Search products"
            style={{ width: '100%' }}
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        {sortedProducts?.map((product) => (
          <Col
            span={8}
            key={product.id}
            className="my-2"
            onClick={() => handleProductClick(product.id)}
          >
            <ProductCard product={product} key={product.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });
