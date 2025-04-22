package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.model;


import lombok.Getter;

@Getter
public class OrderItemDocument {
    private String name;
    private String image;
    private Integer qty;
    private Double cost;
    private String currency;
}
