package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private String name;
    private String image;
    private Integer qty;
    private Double cost;
    private String currency;
}
