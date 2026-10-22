import React from 'react';
import { ShieldCheck, ClipboardList, CalendarDays, FlaskConical, Users, Stethoscope, FileText, ListOrdered } from 'lucide-react';
import ProductLanding from '../components/ProductLanding';

// Order: hero pills, then features_list
const icons = [ShieldCheck, ClipboardList, CalendarDays, FlaskConical, Users, ClipboardList, ShieldCheck, FileText, Stethoscope, ListOrdered];

export default function FuturionMed() {
  return (
    <ProductLanding
      ns="med"
      name="Futurion Med"
      logo="/medlogo.png"
      accent="#A3E635"
      accentSoft="rgba(163, 230, 53, 0.07)"
      icons={icons}
    />
  );
}
