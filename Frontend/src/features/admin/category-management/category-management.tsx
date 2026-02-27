import DataTable from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { CategoryItem } from "./category-management.modal";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/ui/form-dialog";
import type { FormConfig } from "@/utils/types";
import ConfirmDialog from "@/components/confirm-dialog";

function CategoryManagement() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [formData, setFormData] = useState({ name: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({ name: "" });
    setFormErrors({});
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (category: CategoryItem) => {
    setSelectedCategory(category);
    setFormData({ name: category.categoryName });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };
  const handleDelete = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = () => {
    console.log("Submited!");
  };

  const handleConfirmDelete = () => {
    console.log("Deleted!");
  };

  const categories = [
    { id: "1", categoryName: "Novel" },
    { id: "2", categoryName: "Romantic" },
    { id: "3", categoryName: "Detective" },
    { id: "4", categoryName: "Science Fiction" },
    { id: "5", categoryName: "Fantasy" },
    { id: "6", categoryName: "Horror" },
    { id: "7", categoryName: "Thriller" },
    { id: "8", categoryName: "Biography" },
    { id: "9", categoryName: "History" },
    { id: "10", categoryName: "Self Development" },
    { id: "11", categoryName: "Psychology" },
    { id: "12", categoryName: "Business" },
    { id: "13", categoryName: "Marketing" },
    { id: "14", categoryName: "Technology" },
    { id: "15", categoryName: "Programming" },
    { id: "16", categoryName: "Education" },
    { id: "17", categoryName: "Health" },
    { id: "18", categoryName: "Travel" },
    { id: "19", categoryName: "Cooking" },
    { id: "20", categoryName: "Art" },
  ];

  const columns = useMemo<ColumnDef<CategoryItem>[]>(
    () => [
      {
        accessorKey: "categoryName",
        header: "Category Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("categoryName")}</div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-center w-full">Actions</div>,
        cell: ({ row }) => {
          const field = row.original;

          return (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => handleEdit(field)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
                onClick={() => handleDelete(field)}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const handleFormChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value as string }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formConfig: FormConfig = {
    title: selectedCategory ? "Edit Field" : "Create Field",
    description: selectedCategory
      ? "Update category information"
      : "Add a new category to the system",
    fields: [
      {
        name: "name",
        label: "Category Name",
        type: "text",
        required: true,
        placeholder: "Enter category name",
      },
    ],
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
    setFormData({ name: "" });
    setFormErrors({});
  };

  return (
    <div className=" w-full px-8 py-4">
      <Button className="mb-4 cursor-pointer" onClick={handleCreate}>
        Add Category
      </Button>
      <DataTable
        data={categories}
        columns={columns}
        searchable
        searchPlaceholder="Search fields..."
        searchFields={["categoryName"]}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        emptyMessage="No fields found. Get started by adding your first field."
        className="w-full"
      />
      <FormDialog
        open={isCreateDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseDialog();
        }}
        config={formConfig}
        data={formData}
        errors={formErrors}
        // loading={isSubmitting}
        onSubmit={handleFormSubmit}
        onCancel={handleCloseDialog}
        onChange={handleFormChange}
        mode={selectedCategory ? "edit" : "create"}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Field"
        description={`Are you sure you want to delete "${selectedCategory?.categoryName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        // loading={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedCategory(null);
        }}
      />
    </div>
  );
}

export default CategoryManagement;
