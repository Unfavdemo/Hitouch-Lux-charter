import { z } from "zod";

export const contactStepSchema = z.object({
  contactName: z.string().trim().min(2, "Name is required.").max(120),
  email: z.string().trim().email("A valid email is required.").max(200),
  phone: z.string().trim().min(7, "Phone is required.").max(40),
});

export const tripStepSchema = z.object({
  pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pickup date is required."),
  pickupTime: z.string().trim().min(1, "Pickup time is required.").max(20),
  pickupAddress: z.string().trim().min(3, "Pickup location is required.").max(300),
  destinationAddress: z.string().trim().min(3, "Destination is required.").max(300),
  vehicleClass: z.enum(["sedan", "suv", "sprinter"]),
  passengers: z.coerce.number().int().min(1).max(14),
  notes: z.string().trim().max(2000).optional(),
});

export type ContactStepInput = z.infer<typeof contactStepSchema>;
export type TripStepInput = z.infer<typeof tripStepSchema>;
