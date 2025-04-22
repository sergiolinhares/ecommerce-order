package com.github.sergiolinhares.ecommerce_order_consumer.order.service;

import com.github.sergiolinhares.ecommerce_order_consumer.order.dto.OrderDTO;
import com.github.sergiolinhares.ecommerce_order_consumer.order.mapper.OrderMapper;
import com.github.sergiolinhares.ecommerce_order_consumer.order.model.OrderDocument;
import com.github.sergiolinhares.ecommerce_order_consumer.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public void process(OrderDTO orderDTO) {
        log.info("Processing order {}", orderDTO.getOrder());
        OrderDocument order = orderMapper.toEntity(orderDTO);
        orderRepository.save(order);
        log.info("Order {} persisted with DB id {}", orderDTO.getOrder(), order.getId());
    }
}
