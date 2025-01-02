import { ProductSeedData } from './seeds/product.seed';

const seeds = async () => {
  const Product_seed = new ProductSeedData();
  await Product_seed.main();
};
seeds();
