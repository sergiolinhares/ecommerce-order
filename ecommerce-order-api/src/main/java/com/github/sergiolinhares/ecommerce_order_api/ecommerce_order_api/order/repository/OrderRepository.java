package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.repository;


import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.model.OrderDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<OrderDocument, String> {

}
