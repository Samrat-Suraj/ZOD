import React, { useState } from "react";
import { UserFormError, userFormType } from "./types/userForm";
import { userFormSchema } from "./types/userForm";

// No Need To Define In ZOD
// interface formType {
//   name: string;
//   age: number;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phoneNumber : string;
//   gender: string;
// }

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
        <label htmlFor="name" className="font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      {
        error?.name && <div className="text-red-500">{error.name[0]}</div>
      }
      <div className="flex flex-col">
        <label htmlFor="age" className="font-medium">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}

          className="border p-2 rounded-md"
        />
      </div>
      {
        error?.age && <div className="text-red-500">{error.age[0]}</div>
      }
      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}

          className="border p-2 rounded-md"
        />
      </div>
      {
        error?.email && <div className="text-red-500">{error.email[0]}</div>
      }
      <div className="flex gap-3 items-center">
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}

            className="border p-2 rounded-md"
          />
        </div>
        {
          error?.password && <div className="text-red-500">{error.password[0]}</div>
        }
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="font-medium">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}

            className="border p-2 rounded-md"
          />
        </div>
        {
          error?.confirmPassword && <div className="text-red-500">{error.confirmPassword[0]}</div>
        }
      </div>
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
      <div className="flex flex-col">
        <label className="font-medium">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded-md">
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {
        error?.gender && <div className="text-red-500">{error.gender[0]}</div>
      }
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default UserForm;
