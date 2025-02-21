import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_AWS_BUCKET_NAME!;
const BUCKET_URL = process.env.S3_AWS_BUCKET_URL!;

export async function POST(request: Request) {
  try {
    // Ensure environment variables are set
    if (!BUCKET_NAME || !BUCKET_URL) {
      console.error("Missing AWS environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { filename, contentType, folder } = await request.json();
    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Filename and contentType are required" },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitizedFilename = filename.replace(/[^\w.-]/g, "-").toLowerCase();
    const key = `${folder || "uploads"}/${nanoid()}-${sanitizedFilename}`;

    // Generate S3 pre-signed URL
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json({
      presignedUrl,
      finalUrl: `${BUCKET_URL}/${key}`,
      key,
    });
  } catch (error) {
    console.error("Presigned URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
