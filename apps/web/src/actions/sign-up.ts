import { authClient } from "@/lib/auth/auth";
import { ValidationError } from "@/lib/types/errors/ValidationError.error";
import { FormActionState } from "@/lib/types/FormActionResponse";
import { formatZodErrors } from "@/lib/utils/formatZodErrors";
import { z } from "zod";

const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    passwordConfirm: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type SignUpFormState = FormActionState<
  z.output<typeof signUpFormSchema>
>;

export const signUp = async (
  initialState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const fields = Object.fromEntries(
    formData.entries(),
  ) as SignUpFormState["values"];

  try {
    const output = signUpFormSchema.safeParse(fields);

    if (!output.success) {
      throw new ValidationError(formatZodErrors(output.error));
    }

    const response = await authClient.signUp.email(output.data);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      values: fields,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        values: fields,
        errors: error.errors,
      };
    } else {
      return {
        values: fields,
        message: (error as Error).message,
      };
    }
  }
};
