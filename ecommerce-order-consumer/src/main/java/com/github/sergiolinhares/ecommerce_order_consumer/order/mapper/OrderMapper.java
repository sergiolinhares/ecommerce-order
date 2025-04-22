package com.github.sergiolinhares.ecommerce_order_consumer.order.mapper;

import com.github.sergiolinhares.ecommerce_order_consumer.order.dto.OrderDTO;
import com.github.sergiolinhares.ecommerce_order_consumer.order.model.OrderDocument;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    private final ModelMapper mapper = new ModelMapper();

    public OrderDocument toEntity(OrderDTO dto) {
        return mapper.map(dto, OrderDocument.class);
    }
}
