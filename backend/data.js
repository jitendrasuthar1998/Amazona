import bcrypt from 'bcryptjs';

const data = {

  users: [
    {
      name: 'Jitendra',
      email: 'jitu@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Kavita',
      email: 'kavi@@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    }
  ],

  products: [
    {
      _id: '1',
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality products',
    },


    {
      _id: '2',
      name: 'Adidas fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 100,
      countInStock: 16,
      brand: 'Adidas',
      rating: 4.3,
      numReviews: 18,
      description: 'High quality products',
    },

    {
      _id: '3',
      name: 'Lacoste free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 1200,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 20,
      description: 'High quality products',
    },

    {
      _id: '4',
      name: 'Nike Slim Paints',
      category: 'Paints',
      image: '/images/p4.jpg',
      price: 1788,
      countInStock: 20,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 140,
      description: 'High quality products',
    },

    {
      _id: '5',
      name: 'Puma Slim paints',
      category: 'Paints',
      image: '/images/p5.jpg',
      price: 65,
      countInStock: 30,
      brand: 'Puma',
      rating: 4.9,
      numReviews: 109,
      description: 'High quality products',
    },

    {
      _id: '6',
      name: 'Adidas fit pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 120,
      countInStock: 11,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality products',
    },
  ],
};

export default data; 