import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import { FaShoppingCart, FaComments, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('description');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'BookLover123', text: 'Has anyone read this book before?', time: '2h ago' },
    { id: 2, user: 'ReaderPro', text: 'Yes, it\'s amazing! Highly recommended.', time: '1h ago' }
  ]);

  const { id } = useParams();
  const handleAddToCart = () => {
    // Add to cart logic here
    toast.success('Added to cart!');
  };

  const handleCheckout = () => {
    // Redirect to payment page
    window.location.href = `/payment?bookId=${book._id}`;
  };

   useEffect(() => {
      fetch(`http://localhost:5000/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => console.log("this is data",data));
    }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: user?.displayName || 'Guest',
        text: message,
        time: 'Just now'
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/" className="flex items-center text-blue-600 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Books
      </Link>
      
      <motion.div className="bg-white rounded-lg shadow-lg overflow-hidden" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
        <div className="md:flex">
          <motion.div className="md:w-1/3 p-6" initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.05 }}>
            <motion.img 
              src={book.image_url} 
              alt={book.name} 
              className="w-full h-auto rounded-lg shadow-md"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            />
            <div className="mt-4 flex flex-col space-y-4">
              <motion.button 
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart className="mr-2" /> Add to Cart
              </motion.button>
              <motion.button 
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div className="md:w-2/3 p-6" initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.35, delay: 0.08 }}>
            <h1 className="text-3xl font-bold mb-2">{book.name}</h1>
            <p className="text-gray-600 text-lg mb-4">by {book.author || 'Unknown Author'}</p>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-800">${book.resale_price}</span>
              {book.original_price && (
                <span className="ml-2 text-gray-500 line-through">${book.original_price}</span>
              )}
              {book.original_price && (
                <span className="ml-2 text-green-600 font-medium">
                  {Math.round((1 - book.resale_price / book.original_price) * 100)}% OFF
                </span>
              )}
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Condition:</span>
                  <span className="font-medium">{book.condition || 'Good'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Category:</span>
                  <span className="font-medium">{book.category || 'Fiction'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Seller:</span>
                  <span className="font-medium">{book.seller || 'BookStore'}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex border-b">
                <motion.button
                  className={`px-4 py-2 ${activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('description')}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Description
                </motion.button>
                <motion.button
                  className={`px-4 py-2 ${activeTab === 'community' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setActiveTab('community')}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Community Chat
                </motion.button>
              </div>
              
              <div className="mt-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' ? (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">About the Book</h3>
                      <p className="text-gray-700">
                        {book.description || 'No description available for this book.'}
                      </p>
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800">Details</h4>
                        <ul className="mt-2 space-y-1">
                          <li>• <span className="font-medium">Publisher:</span> {book.publisher || 'Not specified'}</li>
                          <li>• <span className="font-medium">Published:</span> {book.publishedDate || 'Not specified'}</li>
                          <li>• <span className="font-medium">Pages:</span> {book.pages || 'Not specified'}</li>
                          <li>• <span className="font-medium">Language:</span> {book.language || 'English'}</li>
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="community"
                      className="community-chat"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="h-64 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50">
                        <AnimatePresence initial={false}>
                          {chatMessages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              className="mb-3"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="flex items-start">
                                <motion.div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 font-bold mr-2" layout initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                                  {msg.user.charAt(0).toUpperCase()}
                                </motion.div>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium">{msg.user}</span>
                                    <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                                  </div>
                                  <p className="text-gray-800">{msg.text}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <form onSubmit={handleSendMessage} className="flex">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <motion.button
                          type="submit"
                          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Send
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookDetailsPage;
