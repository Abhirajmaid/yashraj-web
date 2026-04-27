export type CareerApplicationRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  coverLetter: string;
  resumeLink: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CreateCareerApplicationPayload = Omit<
  CareerApplicationRecord,
  "id" | "createdAt" | "updatedAt"
>;
