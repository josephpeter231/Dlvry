import { useState, useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Add Inventory', href: '#', current: false },
    { name: 'Inventory Items', href: '#', current: false },
    { name: 'Upload Files', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function YourComponent() {
    const [category, setCategory] = useState('');
    const [damaged, setDamaged] = useState('');
    const [perishable, setPerishable] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [status, setStatus] = useState('');
    const [deliveryusers, setDeliveryusers] = useState([]);
    const [pickedBy, setPickedBy] = useState('');

    // Function to handle updating the picked by value for a specific item
    const handleUpdatePickedBy = async (newValue, itemId) => {
        try {
            await axios.put(`http://localhost:5000/inventory/${itemId}`, { pickedby: newValue });
            // If the request is successful, update the state with the new value for the specific item
            setPickedBy(newValue);
        } catch (error) {
            // Handle errors if any
            console.error('Error updating picked by:', error);
            // You can display an error message to the user or handle it as needed
        }
    };



    useEffect(() => {
        
        axios.get('http://localhost:5000/deliveryteam')
            .then(res => {
                setDeliveryusers(res.data)
                console.log(res.data)
            })
        axios.get('http://localhost:5000/inventory/all')
            .then(response => {

                setInventoryItems(response.data); // Assuming response.data is an array of inventory items
                setFilteredItems(response.data); // Initialize filtered items with all inventory items
            })
            .catch(error => {
                console.error('Error fetching inventory items:', error);
            });
    });

    useEffect(() => {
        filterItems();
    }, [category, damaged, perishable, expiryDate]);

    const filterItems = () => {
        let filtered = inventoryItems.filter(item => {
            let condition = true;
            if (category && item.category !== category) {
                condition = false;
            }
            if (damaged !== '' && item.damaged.toString() !== damaged) {
                condition = false;
            }
            if (perishable !== '' && item.perishable.toString() !== perishable) {
                condition = false;
            }
            if (expiryDate && item.expiryDate !== expiryDate) {
                condition = false;
            }
            return condition;
        });
        setFilteredItems(filtered);
    };



    return (
        <div className="min-h -full">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <main>
                <div className="container mx-auto p-4">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Inventory Items</h2>
                        {/* Input fields for adding inventory */}
                    </div>

                    <div>
                        {/* <h2 className="text-lg font-semibold mb-2">=</h2> */}
                        <div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">Filter by Category:</label>
                                    <select id="categoryFilter" name="categoryFilter" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">All</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Appliances">Appliances</option>
                                        <option value="Sports and Fitness">Sports and Fitness</option>
                                        <option value="Groceries">Groceries</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="damagedFilter" className="block text-sm font-medium text-gray-700">Filter by Damaged:</label>
                                    <select id="damagedFilter" name="damagedFilter" value={damaged} onChange={(e) => setDamaged(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">All</option>
                                        <option value="true">Damaged</option>
                                        <option value="false">Not Damaged</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="perishableFilter" className="block text-sm font-medium text-gray-700">Filter by Perishable:</label>
                                    <select id="perishableFilter" name="perishableFilter" value={perishable} onChange={(e) => setPerishable(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">All</option>
                                        <option value="true">Perishable</option>
                                        <option value="false">Non-Perishable</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="expiryDateFilter" className="block text-sm font-medium text-gray-700">Filter by Expiry Date:</label>
                                    <input type="date" id="expiryDateFilter" name="expiryDateFilter" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md px-3 py-2" />
                                </div>
                            </div>
                        </div>
                        <div>
                            {filteredItems.length === 0 ? (
                                <p>No inventory items available</p>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Picked By</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredItems.map(item => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.productName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.damaged ? 'Yes' : 'No'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.perishable ? 'Yes' : 'No'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={item.status}
                                                        onChange={(e) => { setStatus(e.target.value) }}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                                                    >
                                                        <option value="Pending">Select</option>
                                                        <option value="Picked">Picked</option>
                                                        <option value="Not Picked">Not Picked</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={item.pickedby}
                                                        onChange={(e) => handleUpdatePickedBy(e.target.value, item._id)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                                                    >
                                                        <option value="">Select</option>
                                                        {deliveryusers.map(user => (
                                                            <option key={user._id} value={user}>{user}</option>
                                                        ))}
                                                    </select>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default YourComponent;
