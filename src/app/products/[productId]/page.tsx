import { Review } from "@app/app/models/review";
import { Product } from "@app/models/product";

async function getProductWithReview(
  id: string
): Promise<{ product: Product; review: Review[] }> {
  const fetchProducts = fetch(`http://localhost:3333/products/1`, {
    next: {
      revalidate: 100,
    },
  });

  const fetchReviews = fetch(`http://localhsot:3334/reviews/?product_id=${id}`);
  const [productResponse, reviewResponse] = await Promise.all([
    fetchProducts,
    fetchReviews,
  ]);
  const [product, reviews] = await Promise.all([
    (await fetchProducts).json(),
    (await fetchReviews).json(),
  ]);
  console.log({ productResponse, reviewResponse });

  return {
    product: {} as Product,
    review: [],
  };
}

type ComponentProps = {
  params: { productId: string };
  searchParams: {};
};
export default async function ProductDetailPage(props: ComponentProps) {
  const { productId } = props.params;

  const productData = await getProductWithReview(productId);
  console.log(productData);

  return (
    <div>
      <h1> Product Details </h1>
      <strong>
        {" "}
        Product Name : <span> {productData.product.name}</span>
      </strong>
      <strong>
        {" "}
        Product Description : <span> {productData.product.description}</span>
      </strong>
    </div>
  );
}
