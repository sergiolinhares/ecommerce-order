package com.github.sergiolinhares.ecommerce_order_consumer.order.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private String name;
    private String image;
    private Integer qty;
    private Double cost;
    private String currency;
}
