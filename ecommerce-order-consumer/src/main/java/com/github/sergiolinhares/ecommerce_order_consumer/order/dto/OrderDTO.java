package com.github.sergiolinhares.ecommerce_order_consumer.order.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private String order;
    private String origin;
    private Double total;
    private String createdAt;
    private List<OrderItemDTO> items;
}
