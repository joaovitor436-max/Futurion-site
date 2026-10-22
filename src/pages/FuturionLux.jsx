import React from 'react';
import { ShoppingCart, Gem, SquareKanban, Trophy, Tags, Wallet, Receipt } from 'lucide-react';
import ProductLanding from '../components/ProductLanding';

// Order: hero pills, then features_list
const icons = [ShoppingCart, Gem, SquareKanban, Trophy, ShoppingCart, Tags, SquareKanban, Trophy, Wallet, Receipt];

export default function FuturionLux() {
  return (
    <ProductLanding
      ns="lux"
      name="Futurion Lux"
      logo="/luxlogo.png"
      accent="#D4AF37"
      accentSoft="rgba(212, 175, 55, 0.08)"
      icons={icons}
    />
  );
}
