import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/shop/ShopScreen';
import { TopBrandsScreen, NearbyStoresScreen } from './screens/shop/StubScreens';
import MarketplaceScreen from './screens/marketplace/MarketplaceScreen';
import ProductDetailScreen from './screens/marketplace/ProductDetailScreen';
import OrderReviewScreen from './screens/marketplace/OrderReviewScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/shop/top-brands" element={<TopBrandsScreen />} />
        <Route path="/shop/nearby" element={<NearbyStoresScreen />} />
        <Route path="/shop/marketplace" element={<MarketplaceScreen />} />
        <Route path="/shop/marketplace/review" element={<OrderReviewScreen />} />
        <Route path="/shop/marketplace/:productId" element={<ProductDetailScreen />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
