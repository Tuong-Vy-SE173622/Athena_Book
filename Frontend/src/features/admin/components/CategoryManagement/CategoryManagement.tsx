import DataTable from "@/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryItem } from "../../models/CategoryManagement";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/ui/form-dialog";
import type { FormConfig } from "@/utils/types";
import ConfirmDialog from "@/components/confirm-dialog";
import { CategoryManagementServer } from "../../services/CategoryManagement";

function CategoryManagement() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );
  const [formData, setFormData] = useState({ categoryName: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const server = useRef(new CategoryManagementServer()).current;

  const fetchData = async () => {
    try {
      const res = await server.getCategoryList();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.categoryName.trim()) {
      errors.categoryName = "Field name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({ categoryName: "" });
    setFormErrors({});
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (category: CategoryItem) => {
    setSelectedCategory(category);
    setFormData({ categoryName: category.categoryName });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  const handleDelete = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (selectedCategory) {
        await server.updateCategory(selectedCategory._id, formData);
        alert("Updated Successfully!");
        setIsEditDialogOpen(false);
      } else {
        await server.createCategory(formData);
        alert("Created Successfully!");
        setIsCreateDialogOpen(false);
      }
      setSelectedCategory(null);
      setFormData({ categoryName: "" });
      setFormErrors({});
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await server.deleteCategory(selectedCategory._id);
      alert("Deleted Successfully!");
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

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
        accessorKey: "categorySlug",
        header: "Category Slug",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("categorySlug")}</div>
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
    title: selectedCategory ? "Edit Category" : "Create Category",
    description: selectedCategory
      ? "Update category information"
      : "Add a new category to the system",
    fields: [
      {
        name: "categoryName",
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
    setFormData({ categoryName: "" });
    setFormErrors({});
  };

  return (
    <div className="w-full px-8 py-4">
      <Button className="mb-4 cursor-pointer" onClick={handleCreate}>
        Add Category
      </Button>
      <DataTable
        data={categories}
        columns={columns}
        searchable
        searchPlaceholder="Search categories..."
        searchFields={["categoryName"]}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        emptyMessage="No categories found. Get started by adding your first category."
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
        onSubmit={handleFormSubmit}
        onCancel={handleCloseDialog}
        onChange={handleFormChange}
        mode={selectedCategory ? "edit" : "create"}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.categoryName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
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
