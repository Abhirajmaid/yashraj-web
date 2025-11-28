import { NextResponse } from 'next/server';
import crypto from 'crypto';

type SignatureRequestPayload = {
  folder?: string;
};

const DEFAULT_FOLDER = process.env.CLOUDINARY_UPLOAD_FOLDER ?? 'projects';

function generateSignature(params: Record<string, string>, secret: string) {
  const sortedKeys = Object.keys(params)
    .filter((key) => Boolean(params[key]))
    .sort();
  const signatureBase = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
  return crypto.createHash('sha1').update(`${signatureBase}${secret}`).digest('hex');
}

export async function POST(request: Request) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Cloudinary environment variables are missing.' },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as SignatureRequestPayload;
  const folder = body.folder || DEFAULT_FOLDER;
  const timestamp = Math.round(Date.now() / 1000);

  const signature = generateSignature(
    {
      folder,
      timestamp: String(timestamp),
    },
    apiSecret
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    folder,
  });
}
