import { supabase } from './supabaseClient';
import { User, Order, OrderItem } from '../types';

// Supabase is optional - if not configured, DB features are disabled
const checkSupabase = () => {
  if (!supabase) {
    console.warn('Supabase not configured. Database features are disabled.');
    return false;
  }
  return true;
};

export const orderService = {
  async createOrUpdateUser(user: User): Promise<User | null> {
    try {
      if (!checkSupabase()) return user as User;
      
      const { data: existingUser } = await supabase!
        .from('users')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (existingUser) {
        const { data, error } = await supabase!
          .from('users')
          .update({
            full_name: user.full_name,
            phone: user.phone,
            address: user.address,
            city: user.city,
            latitude: user.latitude,
            longitude: user.longitude,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingUser.id)
          .select()
          .maybeSingle();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase!
          .from('users')
          .insert([
            {
              email: user.email,
              full_name: user.full_name,
              phone: user.phone,
              address: user.address,
              city: user.city,
              latitude: user.latitude,
              longitude: user.longitude,
            },
          ])
          .select()
          .maybeSingle();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error('Error creating/updating user:', error);
      return null;
    }
  },

  async createOrder(
    userId: string,
    items: OrderItem[],
    meetingPoint?: string,
    deliveryDate?: string,
    notes?: string
  ): Promise<Order | null> {
    try {
      if (!checkSupabase()) return null;
      
      const orderNumber = `ECO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

      const { data, error } = await supabase!
        .from('orders')
        .insert([
          {
            user_id: userId,
            order_number: orderNumber,
            items: items,
            meeting_point: meetingPoint,
            delivery_date: deliveryDate,
            notes: notes,
            status: 'pending',
            total_quantity: totalQuantity,
          },
        ])
        .select()
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    try {
      if (!checkSupabase()) return [];
      
      const { data, error } = await supabase!
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      if (!checkSupabase()) return null;
      
      const { data, error } = await supabase!
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
};
