export interface Student {
  student_id?: number;
  student_name: string;
  student_last_name: string;
  student_address: string;
  student_city: string;
  student_phone: string;
  student_zip: string;
  student_id_user: number;

  user_id: number;
  user_email: string;
  user_password: string;
  user_type: string;
  user_deleted: string;
}