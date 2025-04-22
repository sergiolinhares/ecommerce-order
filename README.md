
# 📦 ecommerce-order

A **full‑stack, event‑driven** demo that shows how to receive e‑commerce orders through a **GraphQL API**, publish the events to **RabbitMQ**, persist them in **MongoDB**, and display them in a **React + Tailwind** dashboard.

| Layer | Tech |
|-------|------|
| **Frontend** | React 18, Vite, Apollo Client, Tailwind CSS |
| **API** | Spring Boot 3, GraphQL‑Java, Spring Cloud Stream |
| **Messaging** | RabbitMQ 3.9 |
| **Persistence** | MongoDB 7 |
| **Runtime** | Docker / Docker Compose |

---

## ▶️ Quick start

```bash
# clone & build everything
git clone https://github.com/sergiolinhares/ecommerce-order.git
cd ecommerce-order
docker compose up --build
```

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | <http://localhost:3000> | React dashboard |
| GraphQL API | <http://localhost:8082/graphiql> | GraphiQL IDE & playground |
| RabbitMQ UI | <http://localhost:15672> (guest/guest) | Queue & message inspection |

Container logs will show the API publishing events, the consumer persisting them and the UI polling the GraphQL endpoint.

---

## 🗂 Project layout

```
ecommerce-order/
├── docker-compose.yml
├── ecommerce-order-api/       # Spring Boot GraphQL producer
├── ecommerce-order-consumer/  # Spring Boot message consumer
└── ecommerce-order-ui/        # React dashboard
```

---

## ⚙️ Docker compose stack

```yaml
services:
  ecommerce-order-api:      # GraphQL producer (8082)
  ecommerce-order-consumer: # Rabbit listener → MongoDB
  ecommerce-order-ui:       # React dashboard (3000)
  mongodb:                  # Persistence
  rabbitmq:                 # Broker + mgmt UI (15672)
```

Each service is built from its own `Dockerfile`; no local Java / Node toolchain is required.

---

## 🏗 Architecture

```mermaid
  UI --Apollo--> API
  API --publish--> Broker
  Broker --consume--> Consumer
  Consumer --persist--> DB
  UI --query--> API
```

---

## 🛠 API details

### GraphQL schema (`order.graphqls`)

```graphql
type Mutation {
  publishPlacedOrderMessage(order: OrderInput): PublishOrderResponse
}

type Query {
  placedOrders: [Order!]!
}
```

*Example mutation:*

```graphql
mutation {
    publishPlacedOrderMessage(
        order: {
            order: "MY-ORDER-NUMBER-1",
            origin: "moon",
            total: 98.25,
            createdAt: "2023-06-28T17:37:24.169Z",
            items: [
                {
                    name: "Boot",
                    image: "image-path.png",
                    qty: 1,
                    cost: 50.25,
                    currency: "BRL"
                },
                {
                    name: "Hammer",
                    image: "image-path.png",
                    qty: 2,
                    cost: 10.5,
                    currency: "BRL"
                },
                {
                    name: "Fork",
                    image: "image-path.png",
                    qty: 12,
                    cost: 2.25,
                    currency: "BRL"
                }
            ]
        }
    ) {
        success
        message
    }
}
```

## 💻 Front‑end

* **`Dashboard.jsx`** displays KPIs, recent orders and an Orders tab.  
* Uses **Apollo Client** pointed at `NEXT_PUBLIC_API_URL` (`http://host.docker.internal:8082`) so the UI can run inside Docker yet reach the host network.

