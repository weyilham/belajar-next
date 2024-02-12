// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retieveData, retieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.products![1]) {
    const data = await retieveDataById("products", req.query.products![1]);
    res.status(200).json({ status: true, statusNumber: 200, data });
  } else {
    const data = await retieveData("products");
    res.status(200).json({ status: true, statusNumber: 200, data });
  }
}
