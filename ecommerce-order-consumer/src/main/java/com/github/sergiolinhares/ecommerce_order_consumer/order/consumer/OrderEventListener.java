package com.github.sergiolinhares.ecommerce_order_consumer.order.consumer;

import com.github.sergiolinhares.ecommerce_order_consumer.order.dto.OrderDTO;
import com.github.sergiolinhares.ecommerce_order_consumer.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderEventListener implements Consumer<OrderDTO> {

    private final OrderService orderService;

    @Override
    public void accept(OrderDTO orderDTO) {
        log.debug("Received message: {}", orderDTO);
        try {
            orderService.process(orderDTO);
        } catch (Exception ex) {
            log.error("Failed to process order {} - {}", orderDTO.getOrder(), ex.getMessage(), ex);
            throw ex;
        }
    }

}
