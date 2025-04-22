package com.github.sergiolinhares.ecommerce_order_consumer.order.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Getter
@Setter
public class OrderDocument {

    @Id
    private String id;
    private String order;
    private String origin;
    private Double total;
    private String createdAt;
    private List<OrderItemDocument> items;
}
