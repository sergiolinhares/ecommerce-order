package com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.producer;

import com.github.sergiolinhares.ecommerce_order_api.ecommerce_order_api.order.dto.OrderDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StreamBridgeOrderProducer implements OrderProducer {

    private final StreamBridge streamBridge;

    @Override
    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 5_000))
    public void send(OrderDTO order) {
        streamBridge.send("producerOrder-out-0", order);
        log.info("Order [{}] published to topic.", order.getOrder());
    }
}
