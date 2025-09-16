import gql from "graphql-tag";

export const typeDefs = gql`
  type Auth {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    number: Float
    role: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    category: String!
    price: Float!
    image: String!
    color: String!
    size: String
    rating: Float
    reviews: Int
    brand: String
  }

  type Cart {
    id: ID!
    user: User!
    products: [Product!]!
    total: Float!
  }

  type Order {
    id: ID!
    user: User!
    products: [Product!]!
    total: Float!
  }

  type Query {
    me: [User]
    products: [Product!]!
    product(id: ID!): Product
    cart: [Cart]
    orders: [Order!]!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    role: String
    adminSecret: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input createProductInput {
    title: String!
    description: String!
    category: String!
    price: Float!
    image: String!
    color: String!
    size: String
    rating: Float
    reviews: Int
    brand: String
  }

  input updateProductInput {
    id: ID!
    title: String
    description: String
    category: String
    price: Float
    image: String
    color: String
    size: String
    rating: Float
    reviews: Int
    brand: String
  }

  type Mutation {
    signup(input: SignUpInput): Auth!
    login(input: LoginInput): Auth!
    createProduct(input: createProductInput): Product!
    updateProduct(input: updateProductInput): Product!
    deleteProduct(id: ID!): Product
    addToCart(productId: ID!): Cart
    removeFromCart(productId: ID!): Cart
    checkout: Order
  }
`;
