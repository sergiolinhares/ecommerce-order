package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.service;

import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.mapper.OrderMapper;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.producer.OrderProducer;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.repository.OrderRepository;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto.OrderDTO;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.response.PublishOrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final OrderMapper mapper;
    private final OrderProducer producer;

    public PublishOrderResponse publish(OrderDTO dto) {
        producer.send(dto);
        return PublishOrderResponse.builder()
                .success(true)
                .message("Order queued.")
                .build();
    }

    public List<OrderDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

}
