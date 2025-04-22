package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.mapper;

import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.model.OrderDocument;
import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto.OrderDTO;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    private final ModelMapper mapper = new ModelMapper();

    public OrderDTO toDto(OrderDocument entity) {
        return mapper.map(entity, OrderDTO.class);
    }

    public OrderDocument toEntity(OrderDTO dto) {
        return mapper.map(dto, OrderDocument.class);
    }
}
