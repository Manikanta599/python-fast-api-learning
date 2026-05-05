import { App as AntApp, Col, Row } from "antd";
import { useEffect, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api/products";
import ProductFormModal from "../components/ProductFormModal";
import ProductHero from "../components/ProductHero";
import ProductsTable from "../components/ProductsTable";
import "../App.css";
import type { Product, ProductFormValues } from "../types/product";


function ProductsPage() {
  const { message } = AntApp.useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      message.error("Could not load products");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProduct(null);
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProduct(null);
  }

  async function handleSubmit(values: ProductFormValues) {
    setSaving(true);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
        message.success("Product updated successfully");
      } else {
        await createProduct(values);
        message.success("Product created successfully");
      }

      closeModal();
      loadProducts();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not save product";
      message.error(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(productId: number) {
    try {
      await deleteProduct(productId);
      message.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not delete product";
      message.error(errorMessage);
    }
  }

  return (
    <div className="page-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <Row justify="center">
        <Col xs={24} lg={20} xl={18}>
          <ProductHero onAdd={openCreateModal} onRefresh={loadProducts} />
          <ProductsTable
            loading={loading}
            products={products}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </Col>
      </Row>

      <ProductFormModal
        editingProduct={editingProduct}
        loading={saving}
        open={isModalOpen}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}


export default ProductsPage;
