import React, { useMemo, forwardRef } from "react";
import PropTypes from "prop-types";
import { useAppSelector } from "../store";
import { Empty } from "antd";
import OptimizedCategoryPage from "./OptimizedCategoryPage";

const OptimizedCategoryPageWrapper = forwardRef(({ 
  onAddToFavorite, 
  onAddToCart, 
  onPointerDown, 
  onPointerUp, 
  isLoading, 
  loading,
  trimCollectionValue = "new"
}, ref) => {
  const productsSlice = useAppSelector((state) => state.products);
  
  // Get products for the current collection
  const productsItems = useMemo(() => {
    if (!trimCollectionValue) return [];
    return productsSlice[trimCollectionValue] || [];
  }, [productsSlice, trimCollectionValue]);

  // Add loading placeholders if needed
  const displayItems = useMemo(() => {
    const items = [...(productsItems || [])];
    if (isLoading || loading) {
      return [...items, ...Array(15).fill(null)];
    }
    return items;
  }, [productsItems, isLoading, loading]);

  // Если товаров нет и не идет загрузка, показываем пустое состояние
  if (!displayItems?.length && !isLoading && !loading) {
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
    <div ref={ref}>
      <OptimizedCategoryPage 
        products={displayItems}
        isLoading={isLoading || loading}
        onAddToFavorite={onAddToFavorite}
        onAddToCart={onAddToCart}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      />
    </div>
  );
});

OptimizedCategoryPageWrapper.propTypes = {
  onAddToFavorite: PropTypes.func,
  onAddToCart: PropTypes.func,
  onPointerDown: PropTypes.func,
  onPointerUp: PropTypes.func,
  isLoading: PropTypes.bool,
  loading: PropTypes.bool,
  trimCollectionValue: PropTypes.string
};

export default React.memo(OptimizedCategoryPageWrapper);
