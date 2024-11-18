import { GetServerSideProps } from 'next';
import { Badge, Typography } from 'antd';
import { ProductCarousel } from '@/components/ProductCarousel';
import { Product } from '@/types/product';
import axios from 'axios';
import { BASE_URL } from '@/services/api';

const { Title, Paragraph } = Typography;

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <div style={{ padding: '20px' }} className='bg-white'>
      <ProductCarousel productId={product?.id} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`${BASE_URL}/${id}`);

  return {
    props: {
      product: response.data,
    },
  };
};

export default ProductPage;
