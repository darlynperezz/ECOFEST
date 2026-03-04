export interface Product {
  id: string;
  name: string;
  category: 'Birchwood' | 'Caña de Azúcar' | 'Hojas de Palma' | 'Biocups';
  image: string;
  shortDescription: string;
  fullDescription: string;
  specifications: {
    material: string;
    size: string;
    capacity?: string;
    use: string;
  };
  pricing: {
    unitPrice: string;
    volumePrice: string;
    minOrder?: string;
  };
  badges: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
}

export interface User {
  id?: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: string;
}

export interface Order {
  id?: string;
  user_id?: string;
  order_number?: string;
  items: OrderItem[];
  meeting_point?: string;
  delivery_date?: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_quantity: number;
  created_at?: string;
}
