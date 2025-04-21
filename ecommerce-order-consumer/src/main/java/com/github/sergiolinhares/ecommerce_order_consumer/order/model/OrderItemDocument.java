package com.github.sergiolinhares.ecommerce_order_consumer.order.model;


import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDocument {
    private String name;
    private String image;
    private Integer qty;
    private Double cost;
    private String currency;
}
