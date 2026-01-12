import { Inquiry } from "@/types/inquiryTypes";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
 export const sum =(Inquiries:Inquiry[])=> Inquiries.reduce((acc,el)=> el.potentialValue + acc,0 )
