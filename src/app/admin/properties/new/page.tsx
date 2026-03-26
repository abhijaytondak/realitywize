"use client";

import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl md:text-3xl text-primary mb-8">Add New Property</h1>
      <p className="text-sm text-on-surface-variant mb-6">Create the property first, then add images on the edit page.</p>
      <PropertyForm />
    </div>
  );
}
