import { Button, Card, Space, Typography } from "antd";


type ProductHeroProps = {
  onAdd: () => void;
  onRefresh: () => void;
};


function ProductHero({ onAdd, onRefresh }: ProductHeroProps) {
  return (
    <Card className="hero-card" variant="borderless">
      <div className="hero-copy">
        <Typography.Text className="eyebrow">
          FastAPI + React
        </Typography.Text>
        <Typography.Title level={1} className="hero-title">
          Products Dashboard
        </Typography.Title>
        <Typography.Paragraph className="hero-text">
          A simple UI to create, read, update, and delete products from your
          FastAPI backend.
        </Typography.Paragraph>
      </div>

      <Space>
        <Button type="primary" size="large" onClick={onAdd}>
          Add Product
        </Button>
        <Button size="large" onClick={onRefresh}>
          Refresh
        </Button>
      </Space>
    </Card>
  );
}


export default ProductHero;
