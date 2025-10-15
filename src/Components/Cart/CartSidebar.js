import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Proceeding to checkout', items);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.9
    },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    exit: { 
      opacity: 0, 
      x: -50,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => dispatch(toggleCart())}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl z-50 flex flex-col"
          >
            {/* Header with gradient - Fixed Layout */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
              {/* First Row - Close Button */}
              <div className="flex justify-end p-4 pb-2">
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleCart())}
                  className="text-white/90 hover:text-white bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
                >
                  <FaTimes size={18} />
                </motion.button>
              </div>
              
              {/* Second Row - Cart Title */}
              <div className="px-6 pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/20 p-3 rounded-full backdrop-blur-sm"
                  >
                    <FaShoppingCart size={24} />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">Shopping Cart</h2>
                    <p className="text-white/80 text-sm mt-1">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Clear Cart Button - Separate Row */}
                {items.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCart}
                    className="w-full flex items-center justify-center space-x-2 text-white bg-red-500/90 hover:bg-red-600 px-4 py-2.5 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-md"
                  >
                    <FaTrash size={14} />
                    <span className="font-medium">Clear All Items</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full mb-6 shadow-inner"
                  >
                    <FaShoppingCart size={64} className="text-gray-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some books to get started!</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(toggleCart())}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item, index) => (
                        <motion.div
                          key={item._id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-300"
                        >
                          {/* Gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                          
                          <div className="relative flex items-center p-4">
                            {/* Image Container */}
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="relative w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 overflow-hidden shadow-md"
                            >
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <FaShoppingCart size={32} />
                                </div>
                              )}
                            </motion.div>

                            {/* Item Details */}
                            <div className="ml-4 flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 text-base mb-1 truncate group-hover:text-indigo-600 transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="text-lg font-bold text-indigo-600">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  × {item.quantity}
                                </span>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2">
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                  className="p-2 text-gray-600 hover:text-white bg-gray-100 hover:bg-indigo-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                  disabled={item.quantity <= 1}
                                >
                                  <FaMinus size={10} />
                                </motion.button>
                                
                                <motion.span 
                                  key={item.quantity}
                                  initial={{ scale: 1.5 }}
                                  animate={{ scale: 1 }}
                                  className="w-10 text-center font-semibold text-gray-800"
                                >
                                  {item.quantity}
                                </motion.span>
                                
                                <motion.button 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                  className="p-2 text-gray-600 hover:text-white bg-gray-100 hover:bg-indigo-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                  <FaPlus size={10} />
                                </motion.button>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <motion.button 
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(item._id)}
                              className="ml-3 p-3 text-red-500 hover:text-white bg-red-50 hover:bg-red-500 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <FaTrash size={16} />
                            </motion.button>
                          </div>

                          {/* Item Total Price */}
                          <div className="px-4 pb-3 flex justify-end">
                            <div className="text-sm text-gray-600">
                              Subtotal: <span className="font-bold text-indigo-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Summary Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                  >
                    {/* Pricing Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-semibold">${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Shipping:</span>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="font-medium">Tax:</span>
                        <span className="font-semibold text-sm">Calculated at checkout</span>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t-2 border-gray-200 my-3" />
                      
                      {/* Total */}
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-800">Total:</span>
                        <motion.span 
                          key={calculateTotal()}
                          initial={{ scale: 1.2, color: '#6366f1' }}
                          animate={{ scale: 1, color: '#4f46e5' }}
                          className="text-indigo-600"
                        >
                          ${calculateTotal()}
                        </motion.span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:from-green-600 hover:to-emerald-700"
                    >
                      Proceed to Checkout
                    </motion.button>

                    {/* Continue Shopping Link */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => dispatch(toggleCart())}
                      className="w-full mt-3 text-gray-600 hover:text-indigo-600 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
