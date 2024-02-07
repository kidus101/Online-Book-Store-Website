import { Router } from "express";
import orderController from "../controllers/orderController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Order management
 * 
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: number
 *             required:
 *               - bookId
 *     responses:
 *       200:
 *         description: Order created
 *       400:
 *         description: Invalid credentials
 *  
 * /order/{id}:
 *   get:
 *     summary: Get an order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order retrieved
 *       400:
 *         description: Invalid credentials
 * 
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted
 *       400:
 *         description: Invalid credentials
 * 
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Orders retrieved
 *       400:
 *         description: Invalid credentials
 */

router.post("/create", orderController.createOrder);
router.get("/:id", orderController.getOrderById);
router.delete("/:id", orderController.deleteOrder);
router.get("/", orderController.getAllOrders);


export default router;
