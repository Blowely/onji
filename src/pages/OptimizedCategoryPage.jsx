import React, { memo, useCallback } from "react";
import { Empty } from "antd";
import Card from "../components/Card";

const OptimizedCard = memo(({ item, index, onAddToFavorite, onAddToCart, isLoading, onPointerDown, onPointerUp }) => {
  const handlePointerDown = useCallback((e) => onPointerDown?.(e), [onPointerDown]);
  const handlePointerUp = useCallback((e) => onPointerUp?.(item, e), [onPointerUp, item]);
  
  return (
    <div key={`${item?.spuId}-${index}`} style={{ height: '100%' }}>
      <Card
        onFavorite={onAddToFavorite}
        onPlus={onAddToCart}
        loading={isLoading}
        image={item?.images?.[0] || ''}
        price={item?.price || ''}
        item={item}
        name={item?.name || ''}
        index={index + 1}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      />
    </div>
  );
});

function OptimizedCategoryPage({ 
  products = [], 
  isLoading, 
  onAddToFavorite, 
  onAddToCart,
  onPointerDown,
  onPointerUp
}) {
  // Memoize the render function to prevent unnecessary re-renders
  const renderItem = useCallback((item, index) => (
    <OptimizedCard
      key={`${item?.spuId}-${index}`}
      item={item}
      index={index}
      onAddToFavorite={onAddToFavorite}
      onAddToCart={onAddToCart}
      isLoading={isLoading}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  ), [isLoading, onAddToFavorite, onAddToCart, onPointerDown, onPointerUp]);

  if (!products?.length && !isLoading) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{ height: 100, paddingTop: "20px", width: '100%' }}
        description="Ничего не найдено"
        className="empty"
      />
    );
  }

  return (
    <div className="cards-section-wrapper">
      {products.filter(product => !product?.isDeleted).map(renderItem)}
    </div>
  );
}

export default memo(OptimizedCategoryPage);
