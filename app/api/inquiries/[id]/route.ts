import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { delay } from "@/lib/utils";
import { Inquiry } from "@/types/inquiryTypes";

const fakeDb = path.join(process.cwd(), "inquiries.json");

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(500);

  try {
    const body = await request.json();
    const { phase } = body;
    const id = params.id;

    if (!id || !phase) {
      return NextResponse.json(
        { error: "Missing id or phase" },
        { status: 400 }
      );
    }

    const jsonData = await fs.readFile(fakeDb, "utf8");
    const inquiries = JSON.parse(jsonData);

    const inquiryIndex = inquiries.findIndex((el: Inquiry) => el.id === id);

    if (inquiryIndex === -1) {
      return NextResponse.json(
        { error: "can not found Inquiry" },
        { status: 404 }
      );
    }

    inquiries[inquiryIndex].phase = phase;
    inquiries[inquiryIndex].updatedAt = new Date().toISOString();

    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));

    return NextResponse.json(inquiries[inquiryIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
