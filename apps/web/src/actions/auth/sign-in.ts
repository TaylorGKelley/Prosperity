import { authClient } from "@/lib/auth/auth";
import { ValidationError } from "@/lib/types/errors/ValidationError.error";
import { FormActionState } from "@/lib/types/FormActionResponse";
import { formatZodErrors } from "@/lib/utils/formatZodErrors";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormState = FormActionState<
  z.output<typeof signInFormSchema>
>;

export const signIn = async (
  initialState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> => {
  const fields = Object.fromEntries(
    formData.entries(),
  ) as SignInFormState["values"];

  try {
    const output = signInFormSchema.safeParse(fields);

    if (!output.success) {
      throw new ValidationError(formatZodErrors(output.error));
    }

    const response = await authClient.signIn.email(output.data);

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
