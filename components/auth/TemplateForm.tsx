import React from "react";

interface TemplateFormProps {
  children: React.ReactNode;
  headerText: string;
}

export const TemplateForm = ({ children, headerText }: TemplateFormProps) => {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {headerText}
        </h2>
      </div>
      {children}
    </>
  );
};
