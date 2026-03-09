import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IPublisher } from "../../models/PublisherManagement";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { PublisherManagementServer } from "../../services/PublisherManagement";
import FormDialog from "@/components/ui/form-dialog";
import type { FormConfig } from "@/utils/types";
import ConfirmDialog from "@/components/confirm-dialog";

function PublisherManagement() {
  const [publishers, setPublishers] = useState<IPublisher[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedPublisher, setSelectedPublisher] = useState<IPublisher | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });

  const server = useRef(new PublisherManagementServer()).current;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.authorName = "Field name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCloseDialog = () => {
    //close Dialog
  };

  const handleEdit = (publisher: IPublisher) => {
    setSelectedPublisher(publisher);
    setFormData({
      name: publisher.name,
      description: publisher.description,
      logo: null,
    });
    setPreviewUrl(publisher.logo);
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  const handleDelete = (publisher: IPublisher) => {
    setSelectedPublisher(publisher);
    setIsDeleteDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPublisher(null);
    setFormData({ name: "", description: "", logo: null });
    setPreviewUrl(null); // ← reset, không có ảnh preview
    setFormErrors({});
    setIsCreateDialogOpen(true);
  };

  const handleFormChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Nếu field là avatar và value là File → tạo preview URL mới
    if (field === "logo" && value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
    }

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const fetchData = async () => {
    try {
      const res = await server.getPublisherList();
      setPublishers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (selectedPublisher) {
        await server.updatePublisher(selectedPublisher._id, formData);
        alert("Updated Successfully!");
        setIsEditDialogOpen(false);
      } else {
        await server.createPublisher(formData);
        alert("Created Successfully!");
        setIsCreateDialogOpen(false);
      }
      setSelectedPublisher(null);
      setFormData({ name: "", description: "", logo: null });
      setFormErrors({});
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedPublisher) return;
    try {
      await server.deletePublisher(selectedPublisher._id);
      alert("Deleted Successfully!");
      setIsDeleteDialogOpen(false);
      setSelectedPublisher(null);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = useMemo<ColumnDef<IPublisher>[]>(
    () => [
      {
        accessorKey: "logo",
        header: () => <div className="">Logo</div>,
        cell: ({ row }) => (
          <div className="w-1/2">
            <img
              className="h-10 w-18  object-cover"
              src={row.getValue("logo")}
              alt="logo"
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Publisher Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Publisher description",
        cell: ({ row }) => (
          <div className=" whitespace-normal break-words line-clamp-2 text-sm leading-relaxed">
            {row.getValue("description")}
          </div>
        ),
      },
      {
        accessorKey: "slug",
        header: "Publisher Slug",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("slug")}</div>
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

  const formConfig: FormConfig = {
    title: selectedPublisher ? "Edit Publisher" : "Create Publisher",
    description: selectedPublisher
      ? "Update Publisher information"
      : "Add a new Publisher",
    fields: [
      {
        name: "name",
        label: "Publisher Name",
        type: "text",
        required: true,
        placeholder: "Enter Publisher name",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter Publisher description",
      },
      {
        name: "logo",
        label: "Logo",
        type: "file",
        previewUrl: previewUrl ?? undefined,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-8 py-4">
      <Button className="mb-4 cursor-pointer" onClick={handleCreate}>
        Add Author
      </Button>
      <DataTable
        data={publishers}
        columns={columns}
        searchable
        searchPlaceholder="Search publisher..."
        searchFields={["name"]}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        emptyMessage="No categories found. Get started by adding your first author."
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
        mode={selectedPublisher ? "edit" : "create"}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Author"
        description={`Are you sure you want to delete "${selectedPublisher?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedPublisher(null);
        }}
      />
    </div>
  );
}

export default PublisherManagement;
