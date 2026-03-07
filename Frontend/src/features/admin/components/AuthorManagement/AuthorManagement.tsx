import { useEffect, useMemo, useRef, useState } from "react";
import type { IAuthor } from "../../models/AuthorManagement";
import { AuthorManagementServer } from "../../services/AuthorManagement";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { FormConfig } from "@/utils/types";
import DataTable from "@/components/data-table";
import FormDialog from "@/components/ui/form-dialog";
import ConfirmDialog from "@/components/confirm-dialog";

function AuthorManagement() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [categories, setCategories] = useState<IAuthor[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthor | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    authorName: "",
    authorBiography: "",
    authorAvatar: null,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const server = useRef(new AuthorManagementServer()).current;

  const fetchData = async () => {
    try {
      const res = await server.getAuthorList();
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
    if (!formData.authorName.trim()) {
      errors.authorName = "Field name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = () => {
    setSelectedAuthor(null);
    setFormData({ authorName: "", authorBiography: "", authorAvatar: null });
    setPreviewUrl(null); // ← reset, không có ảnh preview
    setFormErrors({});
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (author: IAuthor) => {
    setSelectedAuthor(author);
    setFormData({
      authorName: author.authorName,
      authorBiography: author.authorBiography,
      authorAvatar: null, // ← null = chưa chọn file mới, sẽ KHÔNG gửi lên API
    });
    setPreviewUrl(author.authorAvatar); // ← chỉ để hiển thị ảnh cũ trong dialog
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  const handleDelete = (author: IAuthor) => {
    setSelectedAuthor(author);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (selectedAuthor) {
        await server.updateAuthor(selectedAuthor._id, formData);
        alert("Updated Successfully!");
        setIsEditDialogOpen(false);
      } else {
        await server.createAuthor(formData);
        alert("Created Successfully!");
        setIsCreateDialogOpen(false);
      }
      setSelectedAuthor(null);
      setFormData({ authorName: "", authorBiography: "", authorAvatar: null });
      setFormErrors({});
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAuthor) return;
    try {
      await server.deleteAuthor(selectedAuthor._id);
      alert("Deleted Successfully!");
      setIsDeleteDialogOpen(false);
      setSelectedAuthor(null);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = useMemo<ColumnDef<IAuthor>[]>(
    () => [
      {
        accessorKey: "authorAvatar",
        header: () => <div className="">Author Avatar</div>,
        cell: ({ row }) => (
          <div className="w-1/2 pl-8">
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-1 ring-slate-200 shadow-md"
              src={row.getValue("authorAvatar")}
              alt="avatar"
            />
          </div>
        ),
      },
      {
        accessorKey: "authorName",
        header: "Author Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("authorName")}</div>
        ),
      },
      {
        accessorKey: "authorBiography",
        header: "Author Biography",
        cell: ({ row }) => (
          <div className="max-w-sm whitespace-normal break-words line-clamp-2 text-sm leading-relaxed">
            {row.getValue("authorBiography")}
          </div>
        ),
      },
      {
        accessorKey: "authorSlug",
        header: "Author Slug",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("authorSlug")}</div>
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
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Nếu field là avatar và value là File → tạo preview URL mới
    if (field === "authorAvatar" && value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
    }

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formConfig: FormConfig = {
    title: selectedAuthor ? "Edit Author" : "Create Author",
    description: selectedAuthor
      ? "Update author information"
      : "Add a new author",
    fields: [
      {
        name: "authorName",
        label: "Author Name",
        type: "text",
        required: true,
        placeholder: "Enter author name",
      },
      {
        name: "authorBiography",
        label: "Biography",
        type: "textarea", // hoặc "text" tuỳ FormDialog của bạn hỗ trợ
        placeholder: "Enter author biography",
      },
      {
        name: "authorAvatar",
        label: "Avatar",
        type: "file",
        // Truyền thêm previewUrl để FormDialog hiển thị ảnh hiện tại
        previewUrl: previewUrl ?? undefined,
      },
    ],
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedAuthor(null);
    setFormData({ authorName: "", authorBiography: "", authorAvatar: null });
    setPreviewUrl(null);
    setFormErrors({});
  };

  return (
    <div className="w-full px-8 py-4">
      <Button className="mb-4 cursor-pointer" onClick={handleCreate}>
        Add Author
      </Button>
      <DataTable
        data={categories}
        columns={columns}
        searchable
        searchPlaceholder="Search categories..."
        searchFields={["authorName"]}
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
        mode={selectedAuthor ? "edit" : "create"}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Author"
        description={`Are you sure you want to delete "${selectedAuthor?.authorName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setSelectedAuthor(null);
        }}
      />
    </div>
  );
}

export default AuthorManagement;
