# Create types Folder In Src

<!-- npm install zod -->

1. Create userForm.ts file in types folder

userForm.ts

```typescript
import { z } from "zod";

export const userFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z.string(),
    phoneNumber: z.string().min(10).max(10, "Invalid phone number"),
    age: z.number().min(18, "You must be at least 18 years old"),
    gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Please select a valid gender" })
    })

}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type userFormType = z.infer<typeof userFormSchema>;
export type UserFormError = Partial<Record<keyof userFormType, string[]>>;
```

UserForm.tsx

```typescript
import React, { useState } from "react";
import { UserFormError, userFormType } from "./types/userForm";
import { userFormSchema } from "./types/userForm";

// No Need To Write Interface For Props if use ZOD

const UserForm = () => {
  const [error, setError] = useState<UserFormError>({})
  const [formData, setFormData] = useState<userFormType>({
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "male",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "age" ? Number(e.target.value) : e.target.value,
    });

    //Clear Error Message
    setError((prev) => ({ ...prev, [e.target.name]: undefined }))
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userFormSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors)
    } else {
      setError({})
      console.log(formData)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="font-medium">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}

          className="border p-2 rounded-md"
        />
      </div>
      {
        error?.phoneNumber && <div className="text-red-500">{error.phoneNumber[0]}</div>
      }
    </form>
  );
};

export default UserForm;
```
