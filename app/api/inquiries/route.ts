import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { delay } from "@/lib/utils";
import { Inquiry } from "@/types/inquiryTypes";

export const dynamic = 'force-dynamic';

const fakeDb = path.join(process.cwd(), "inquiries.json");

export async function GET(request: NextRequest) {
  await delay(500);

  try {
    const jsonData = await fs.readFile(fakeDb, "utf8");
    const inquiries = JSON.parse(jsonData);

    return NextResponse.json(inquiries, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
