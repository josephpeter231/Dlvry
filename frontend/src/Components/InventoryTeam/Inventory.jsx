import  { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [damaged, setDamaged] = useState(false);
  const [perishable, setPerishable] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch inventory items from the backend when the component mounts
    axios.get('http://localhost:5000/inventory/all')
      .then(response => {
        setInventoryItems(response.data); // Assuming response.data is an array of inventory items
      })
      .catch(error => {
        console.error('Error fetching inventory items:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const handleAddInventory = async () => {
    try {
      const newInventoryItem = {
        productName,
        category,
        damaged,
        perishable,
        expiryDate,
        quantity
      };
      await axios.post('http://localhost:5000/inventory/add', newInventoryItem);
      setInventoryItems([...inventoryItems, newInventoryItem]);
      // Clear input fields after adding
      setProductName('');
      setCategory('');
      setDamaged(false);
      setPerishable(false);
      setExpiryDate('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Inventory Management</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
              <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
              <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Sports and Fitness">Sports and Fitness</option>
                <option value="Groceries">Groceries</option>
              </select>
            </div>
            <div>
              <label htmlFor="damaged" className="block text-sm font-medium text-gray-700">Damaged:</label>
              <input type="checkbox" id="damaged" name="damaged" checked={damaged} onChange={(e) => setDamaged(e.target.checked)} className="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="perishable" className="block text-sm font-medium text-gray-700">Perishable:</label>
              <input type="checkbox" id="perishable" name="perishable" checked={perishable} onChange={(e) => setPerishable(e.target.checked)} className="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date:</label>
              <input type="date" id="expiryDate" name="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
              <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <button onClick={handleAddInventory} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Inventory</button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
          {inventoryItems.length === 0 ? (
            <p className="text-gray-700">No inventory items available</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damaged</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perishable</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryItems.map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.damaged ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.perishable ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
