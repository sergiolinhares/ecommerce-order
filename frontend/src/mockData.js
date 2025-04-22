// Mock data for orders that matches the GraphQL schema
export const mockOrders = [
  {
    order: "ORD-123456",
    origin: "web",
    total: 129.99,
    createdAt: "2023-05-15T10:30:00",
    items: [
      {
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/150?text=Headphones",
        qty: 1,
        cost: 89.99,
        currency: "USD"
      },
      {
        name: "Phone Charger",
        image: "https://via.placeholder.com/150?text=Charger",
        qty: 2,
        cost: 19.99,
        currency: "USD"
      }
    ]
  },
  {
    order: "ORD-789012",
    origin: "mobile",
    total: 249.95,
    createdAt: "2023-05-10T14:45:00",
    items: [
      {
        name: "Smart Watch",
        image: "https://via.placeholder.com/150?text=SmartWatch",
        qty: 1,
        cost: 199.95,
        currency: "USD"
      },
      {
        name: "Watch Band",
        image: "https://via.placeholder.com/150?text=WatchBand",
        qty: 2,
        cost: 24.99,
        currency: "USD"
      }
    ]
  },
  {
    order: "ORD-345678",
    origin: "web",
    total: 599.99,
    createdAt: "2023-05-05T09:15:00",
    items: [
      {
        name: "Laptop",
        image: "https://via.placeholder.com/150?text=Laptop",
        qty: 1,
        cost: 599.99,
        currency: "USD"
      }
    ]
  }
];