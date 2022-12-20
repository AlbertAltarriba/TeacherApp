export interface Admin {
  admin_id?: number;
  admin_name: string;
  admin_address: string;
  admin_city: string;
  admin_phone: string;
  admin_zip: string;
  admin_id_user: number;

  user_id: number;
  user_email: string;
  user_password: string;
  user_type: string;
  user_deleted: string;
}
