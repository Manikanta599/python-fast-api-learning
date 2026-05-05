import { Button, Card, Empty, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Product } from "../types/product";


type ProductsTableProps = {
  loading: boolean;
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
};


function ProductsTable({
  loading,
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `Rs. ${price.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(product.id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="table-card" variant="borderless">
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: (
            <Empty
              description="No products found. Add your first product."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </Card>
  );
}


export default ProductsTable;
