import React from 'react';
import AppShell from '../../components/AppShell';
import { EmptyState } from '../../components/States';

export function TopBrandsScreen() {
  return (
    <AppShell showBack title="Top Brands">
      <EmptyState title="Coming soon" subtitle="Top Brands will be available in a future update." />
    </AppShell>
  );
}

export function NearbyStoresScreen() {
  return (
    <AppShell showBack title="Nearby Stores">
      <EmptyState title="Coming soon" subtitle="Nearby Stores will be available in a future update." />
    </AppShell>
  );
}
