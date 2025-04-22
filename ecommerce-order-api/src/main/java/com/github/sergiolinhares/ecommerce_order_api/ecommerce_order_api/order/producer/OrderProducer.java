package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.producer;

import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto.OrderDTO;

public interface OrderProducer {
    void send(OrderDTO order);
}
