package com.github.sergiolinhares.ecommerce_order_consumer.order.service;

import com.github.sergiolinhares.ecommerce_order_consumer.order.dto.OrderDTO;

public interface OrderService {
    void process(OrderDTO orderDTO);
}
