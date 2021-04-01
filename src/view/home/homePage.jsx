import React, {useEffect, useState} from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

const WooCommerce = new WooCommerceRestApi({
  url: 'http://192.168.56.10/', // Your store URL
  consumerKey: 'ck_a45dccafe3f03eb0335129ddf8ae6464ff637b67', // Your consumer key
  consumerSecret: 'cs_720106a5298531eabbe761540616d8f02a07539e', // Your consumer secret
  version: 'wc/v3' // WooCommerce WP REST API version
});

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    WooCommerce
      .get("products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
  });
  }, []);

  return (
    <div>
      {
        products.map((product) => {
          return <p key={product.id}>{product.name}</p>
        })
      }
    </div>
  );
}

export default HomePage;
