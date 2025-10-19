import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const AllProducts = () => {
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const { data: products = [], refetch, isLoading, error } = useQuery({
    queryKey: ["products", page, perPage],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/books`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data;
    },
  });

  const filtered = useMemo(() => {
    if (!queryText) return products;
    const q = queryText.toLowerCase();
    return products.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.seller?.name || "").toLowerCase().includes(q)
    );
  }, [products, queryText]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const doDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (!res.ok) throw new Error("Delete failed");
      await res.json();
      toast.success("Product deleted");
      setConfirmDelete(null);
      refetch();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const saveEdit = async (updates) => {
    try {
      const res = await fetch(`${API_BASE}/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Update failed");
      await res.json();
      toast.success("Product updated");
      setEditingProduct(null);
      refetch();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading products</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <div className="flex gap-2">
          <input
            aria-label="Search products"
            placeholder="Search by name, category, or seller"
            value={queryText}
            onChange={(e) => {
              setQueryText(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Seller</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((product, i) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2 align-top">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-2">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">${product.price?.toFixed(2)}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.seller?.name || 'N/A'}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(product)}
                      className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">{total} product(s) found</div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          <div className="px-2 py-1">
            {page} / {pages}
          </div>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Edit Product</h3>
            <EditForm 
              product={editingProduct} 
              onCancel={() => setEditingProduct(null)} 
              onSave={saveEdit} 
            />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-md p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold">Delete Product</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete <strong>{confirmDelete.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button 
                onClick={() => setConfirmDelete(null)} 
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button 
                onClick={() => doDelete(confirmDelete._id)} 
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditForm = ({ product, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    stock: product.stock || 0,
    description: product.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AllProducts;
