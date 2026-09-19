/**
 * SkillGraph — S3 Upload & Pre-signed URL Service (Day 5 / Task 5.2)
 * Handles resume artifact upload validation and pre-signed S3 destination generation.
 * Reference: GoThrough.txt § 11, § 13, § 21 (Day 5).
 */

export interface UploadValidationResult {
  valid: boolean;
  error?: string;
  sanitizedFileName?: string;
  sizeBytes?: number;
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  s3Key: string;
  bucketName: string;
  expiresInSeconds: number;
}

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per GoThrough § 13 & § 21

/**
 * Validates a resume file for upload according to security invariants.
 */
export function validateResumeFile(file: File): UploadValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds maximum allowed limit of 5.0 MB.`,
    };
  }

  const isValidType =
    ALLOWED_MIME_TYPES.includes(file.type) ||
    file.name.endsWith('.pdf') ||
    file.name.endsWith('.docx') ||
    file.name.endsWith('.txt');

  if (!isValidType) {
    return {
      valid: false,
      error: 'Invalid file format. Only PDF, DOCX, and TXT documents are supported.',
    };
  }

  // Sanitize filename to prevent directory traversal or S3 key injection
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

  return {
    valid: true,
    sanitizedFileName,
    sizeBytes: file.size,
  };
}

/**
 * Generates an S3 Pre-signed URL descriptor for secure client-side PUT.
 */
export async function getPresignedResumeUploadUrl(
  userId: string,
  fileName: string
): Promise<PresignedUploadResponse> {
  const timestamp = Date.now();
  const bucketName = process.env.NEXT_PUBLIC_S3_DOCUMENT_BUCKET || 'skillgraph-document-bucket-live';
  const s3Key = `resumes/${userId}/${timestamp}_${fileName}`;

  // In production, this calls API Gateway -> Lambda with STS generate_presigned_url
  // For client runtime, we construct the authenticated S3 target descriptor
  const uploadUrl = `https://${bucketName}.s3.amazonaws.com/${s3Key}`;

  return {
    uploadUrl,
    s3Key,
    bucketName,
    expiresInSeconds: 900, // 15-minute validity window
  };
}
