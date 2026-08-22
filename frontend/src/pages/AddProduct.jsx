import { useState } from "react";
import { FiImage, FiUpload, FiCheckCircle, FiX } from "react-icons/fi";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { api } from "../services/api";
import "./css/AddProduct.css";

function AddProduct({ onChangePage, onChangeSection }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !price) {
      setError("Title and price are required");
      return;
    }

    setLoading(true);

    try {
      await api.createProduct({
        title,
        description: description || "",
        category: category || "",
        image: imageUrl || "",
        price: Number(price),
        rating: 4.5,
      });

      setSuccess(true);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onChangePage={onChangePage} onChangeSection={onChangeSection} />

      <div className="add-product-page">
        <div className="add-product-container">
          <div className="add-product-header">
            <h2>Add New Product</h2>
            <p>Add a new product to your store</p>
          </div>

          {success && (
            <div className="add-product-success">
              <FiCheckCircle />
              <span>Product created successfully!</span>
              <button className="success-close" onClick={() => setSuccess(false)}>
                <FiX />
              </button>
            </div>
          )}

          {error && (
            <div className="add-product-error">
              <span>{error}</span>
              <button className="error-close" onClick={() => setError("")}>
                <FiX />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="form-section">
              <h3>Product Image URL</h3>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Preview" onError={(e) => e.target.style.display = "none"} />
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Product Details</h3>

              <div className="form-group">
                <label htmlFor="title">Product Name *</label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Classic Cotton T-Shirt"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  placeholder="Describe your product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="T-shirts">T-Shirts</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Activewear">Activewear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Adding Product...
                </>
              ) : (
                <>
                  <FiUpload />
                  Add Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer onChangePage={onChangePage} onChangeSection={onChangeSection} />
    </>
  );
}

export default AddProduct;
