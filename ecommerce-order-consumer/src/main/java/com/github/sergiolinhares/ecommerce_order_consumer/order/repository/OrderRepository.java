package com.github.sergiolinhares.ecommerce_order_consumer.order.repository;

import com.github.sergiolinhares.ecommerce_order_consumer.order.model.OrderDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<OrderDocument, String> {

}

