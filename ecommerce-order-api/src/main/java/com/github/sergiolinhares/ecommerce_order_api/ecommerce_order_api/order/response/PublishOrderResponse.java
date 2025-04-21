package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PublishOrderResponse {
    private final boolean success;
    private final String  message;
}
