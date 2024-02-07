import CustomError from "../utils/customError";
import orderRepository from "../repositories/orderRepository";
import {Order} from "../entities/orderEntity";

class OrderService {
    async getOrderById(id: number): Promise<Order | null> {
        return orderRepository.getOrderById(id);
    }

    async createOrder(order: Partial<Order>): Promise<Order> {
        return orderRepository.createOrder(order);
    }

    async deleteOrder(id: number): Promise<number> {
        return orderRepository.deleteOrder(id);
    }

    async getAllOrders(userId: number): Promise<Order[]> {
        return orderRepository.getAllOrders(userId);
    }

}

export default new OrderService();

