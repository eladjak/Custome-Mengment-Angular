/**
 * ממשק המייצג לקוח במערכת
 */
export interface Customer {
  /** מזהה ייחודי של הלקוח */
  id: string;
  /** שם הלקוח */
  name: string;
  /** אזור מגורים */
  area: string;
  /** מספר טלפון */
  phone: string;
  /** כתובת דואר אלקטרוני */
  email: string;
  /** תאריך יצירת הרשומה */
  createdAt?: Date;
  /** תאריך עדכון אחרון */
  updatedAt?: Date;
}
