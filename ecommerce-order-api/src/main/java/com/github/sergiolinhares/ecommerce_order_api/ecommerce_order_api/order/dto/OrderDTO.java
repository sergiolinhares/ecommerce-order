package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private String order;
    private String origin;
    private Double total;
    private String createdAt;
    private List<OrderItemDTO> items;
}