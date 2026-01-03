'use client'
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    itemId: {
      _id: string;
      name: string;
      image: string;
    };
    quantity: number;
    priceAtPurchase: number;
  }[];
};

export default function Order(){
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    }
    getOrders();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <div>
                <p className="font-semibold">Order ID</p>
                <p className="text-sm text-gray-600">{order._id}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{order.totalAmount}</p>
                <p className="text-sm text-gray-600 capitalize">{order.status}</p>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map(i => (
                <div key={i.itemId._id} className="flex justify-between text-sm">
                  <span>{i.itemId.name} × {i.quantity}</span>
                  <span>₹{i.priceAtPurchase}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
