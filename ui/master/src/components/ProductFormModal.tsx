import { Form, Input, InputNumber, Modal } from "antd";
import { useEffect } from "react";

import type { Product, ProductFormValues } from "../types/product";


type ProductFormModalProps = {
  editingProduct: Product | null;
  loading: boolean;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
};


function ProductFormModal({
  editingProduct,
  loading,
  open,
  onCancel,
  onSubmit,
}: ProductFormModalProps) {
  const [form] = Form.useForm<ProductFormValues>();

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
      });
      return;
    }

    form.setFieldsValue({
      name: "",
      description: "",
      price: 1,
    });
  }, [editingProduct, form, open]);

  return (
    <Modal
      title={editingProduct ? "Edit Product" : "Add Product"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText={editingProduct ? "Update" : "Create"}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please enter product name" },
            { min: 2, message: "Name should have at least 2 characters" },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter description" },
            {
              min: 3,
              message: "Description should have at least 3 characters",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please enter price" },
            {
              validator: async (_, value) => {
                if (value > 0) {
                  return;
                }

                throw new Error("Price should be greater than 0");
              },
            },
          ]}
        >
          <InputNumber
            className="price-input"
            min={1}
            step={1}
            placeholder="Enter price"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}


export default ProductFormModal;
