import productModel from "@/app/api/models/product.model";
import { connectDB } from "@/app/utils/connectdb";

export const productResolvers = {
  Query: {
    products: async () => {
      try {
        connectDB();
        const products = await productModel.find({});
        return products;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching products");
      }
    },

    product: async (_: any, { id }: { id: string }) => {
      if (!id) {
        throw new Error("product id is required");
      }
      
      try {
        connectDB();
        const product = await productModel.findById(id);
        return product;
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching product");
      }
    }
  },
  Mutation: {
    createProduct: async (_: any, { input }: { input: any }) => {
      try {
        await connectDB();
        const product = await productModel.create(input);

        return {
          id: product._id.toString(),
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          image: product.image,
          color: product.color,
          size: product.size,
          rating: product.rating,
          reviews: product.reviews,
          brand: product.brand,
        };
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message || "Error creating product");
      }
    },

    updateProduct: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        connectDB();
        const updatedProduct = await productModel.findByIdAndUpdate(input.id, input, { new: true })
        return updatedProduct
      } catch (error) {
        console.log(error);
        throw new Error("Error updating product");
      }
    },

    deleteProduct: async (_: any, { id }: { id: string }) => {
      try {
        connectDB();
        const deletedProduct = await productModel.findByIdAndDelete(id);
        return deletedProduct;
      } catch (error) {
        console.log(error);
        throw new Error("Error deleting product");
      }
    }
  },
};
