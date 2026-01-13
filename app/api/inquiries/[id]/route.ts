import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { delay } from "@/lib/utils";
import { Inquiry } from "@/types/inquiryTypes";

export const dynamic = 'force-dynamic';

const fakeDb = path.join(process.cwd(), "inquiries.json");

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500);

  try {
    const body = await request.json();
    const { phase, notes } = body;
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
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

    if (phase !== undefined) {
      inquiries[inquiryIndex].phase = phase;
    }
    if (notes !== undefined) {
      inquiries[inquiryIndex].notes = notes;
    }
    inquiries[inquiryIndex].updatedAt = new Date().toISOString();

    await fs.writeFile(fakeDb, JSON.stringify(inquiries, null, 2));

    return NextResponse.json(inquiries[inquiryIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
