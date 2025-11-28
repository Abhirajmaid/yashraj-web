const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

type SignatureResponse = {
  timestamp: number;
  signature: string;
  apiKey: string;
  folder?: string;
};

type UploadOptions = {
  folder?: string;
};

export type CloudinaryUploadResult = {
  url: string;
  secureUrl: string;
  publicId: string;
};

async function fetchSignature(folder?: string): Promise<SignatureResponse> {
  const response = await fetch('/api/cloudinary/signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to fetch Cloudinary signature.');
  }

  return response.json();
}

export async function uploadImageToCloudinary(
  file: File,
  options?: UploadOptions
): Promise<CloudinaryUploadResult> {
  if (!cloudName) {
    throw new Error('Cloudinary cloud name is missing. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in the environment.');
  }

  const { folder } = options ?? {};
  const signaturePayload = await fetchSignature(folder);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signaturePayload.apiKey);
  formData.append('timestamp', String(signaturePayload.timestamp));
  formData.append('signature', signaturePayload.signature);
  if (signaturePayload.folder) {
    formData.append('folder', signaturePayload.folder);
  }

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    const errorBody = await uploadResponse.text();
    throw new Error(errorBody || 'Cloudinary image upload failed.');
  }

  const payload = await uploadResponse.json();
  return {
    url: payload.url as string,
    secureUrl: payload.secure_url as string,
    publicId: payload.public_id as string,
  };
}
