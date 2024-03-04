import { Product } from "../models";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3333/products", {
    next: {
      revalidate: 10, // cache dinamico
      tags: ["tags"], // cache sobre demanda
    },
  }).then((response) => response.json());
  return response;
}

// Server components
export default async function Products() {
  const response = await getProducts();

  return (
    <div>
      <h1> Listagem de Produtos </h1>
      <p> Next</p>
      <ul>
        {response.map((item) => (
          <>
            <Link key={item.id} href={`/products/${item.id}`}>
              <li className="text-white" key={item.id}>
                {item.name} R$ - {item.price}
              </li>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}
