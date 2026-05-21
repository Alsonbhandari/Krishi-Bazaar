const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Retailers only)
exports.createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;

    // Check if user is a retailer
    if (req.user.role !== 'retailer') {
      return res.status(403).json({
        success: false,
        error: 'Only retailers can place orders'
      });
    }

    // Validate products
    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please add at least one product to order'
      });
    }

    // Calculate total price and validate products
    let totalPrice = 0;
    let farmerId = null;

    for (const item of products) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: `Product not found with id ${item.product}`
        });
      }

      // Check if quantity is available
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Insufficient quantity available for ${product.name}`
        });
      }

      // Set farmer ID (all products must be from the same farmer)
      if (!farmerId) {
        farmerId = product.farmer;
      } else if (farmerId.toString() !== product.farmer.toString()) {
        return res.status(400).json({
          success: false,
          error: 'All products must be from the same farmer'
        });
      }

      // Add price to total
      totalPrice += product.price * item.quantity;

      // Update product with price at time of order
      item.price = product.price;

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
      retailer: req.user.id,
      farmer: farmerId
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res, next) => {
  try {
    let query;

    // If user is a retailer, only get their orders
    if (req.user.role === 'retailer') {
      query = Order.find({ retailer: req.user.id });
    } 
    // If user is a farmer, only get orders for their products
    else if (req.user.role === 'farmer') {
      query = Order.find({ farmer: req.user.id });
    } 
    // If admin, get all orders
    else {
      query = Order.find();
    }

    // Add population
    query = query.populate({
      path: 'products.product',
      select: 'name images'
    }).populate({
      path: 'retailer',
      select: 'name email phone'
    }).populate({
      path: 'farmer',
      select: 'name email phone'
    });

    // Execute query
    const orders = await query;

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'products.product',
        select: 'name images'
      })
      .populate({
        path: 'retailer',
        select: 'name email phone'
      })
      .populate({
        path: 'farmer',
        select: 'name email phone'
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Make sure user is the order owner or the farmer
    if (
      order.retailer._id.toString() !== req.user.id &&
      order.farmer._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private (Farmer who owns the products or admin)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a status'
      });
    }

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Make sure user is the farmer or admin
    if (
      order.farmer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this order'
      });
    }

    // Update order
    order.status = status;
    
    // If status is delivered, set delivery date
    if (status === 'delivered') {
      order.deliveryDate = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private (Admin only)
exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a payment status'
      });
    }

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Only admin can update payment status
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update payment status'
      });
    }

    // Update order
    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

