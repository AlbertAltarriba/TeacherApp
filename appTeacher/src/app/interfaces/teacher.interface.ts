export interface Teacher {
  teach_id: number;
  teach_name: string;
  teach_last_name: string;
  teach_address: string;
  teach_city: string;
  teach_zip: string;
  teach_description: string;
  teach_experience_years: number;
  teach_price_an_hour: number;
  teach_phone: string;
  teach_validated: string;
  teach_image: string;

  teach_id_subject: number;
  teach_id_user: number;

  user_deleted: string;
  user_email: string;
  user_id: number;
  user_password: string;
  user_type: string;
}
