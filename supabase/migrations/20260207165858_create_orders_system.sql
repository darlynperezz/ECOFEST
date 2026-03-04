/*
  # Sistema de Pedidos y Usuarios ECOFEST

  1. New Tables
    - `users` - Información de clientes
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `latitude` (numeric, para geolocalización)
      - `longitude` (numeric, para geolocalización)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `orders` - Solicitudes de compra
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `order_number` (text, unique)
      - `items` (jsonb, array de productos con cantidades)
      - `meeting_point` (text, opcional)
      - `delivery_date` (date, opcional)
      - `notes` (text, notas adicionales)
      - `status` (text, 'pending', 'confirmed', 'completed', 'cancelled')
      - `total_quantity` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can view and update own profile
    - Users can view own orders
    - Admin policies managed separately

  3. Important Notes
    - Sistema de solicitud de compra, NO compra automática
    - Información enviada al admin por email/WhatsApp
    - Pedidos con estado inicial 'pending' hasta confirmación del vendedor
    - Geolocalización opcional para facilitar entrega
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  items jsonb NOT NULL,
  meeting_point text,
  delivery_date date,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  total_quantity integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
