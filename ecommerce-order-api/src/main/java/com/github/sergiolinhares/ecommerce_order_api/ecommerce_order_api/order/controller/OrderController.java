package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.controller;

import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.service.OrderService;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto.OrderDTO;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.response.PublishOrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @MutationMapping
    public PublishOrderResponse publishPlacedOrderMessage(@Argument OrderDTO order) {
        return orderService.publish(order);
    }

    @QueryMapping
    public List<OrderDTO> placedOrders() {
        return orderService.findAll();
    }

}