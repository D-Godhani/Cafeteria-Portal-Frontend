// /src/app/admin/canteens/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/authContext"; // Your auth hook

// --- 1. Import from your new service file ---
import {
  getAllCanteens,
  addCanteen,
  updateCanteen,
  deleteCanteen,
  Canteen,
  CanteenFormData,
} from "@/services/canteenService"; // Adjust path if needed

export default function AdminCanteensPage() {
  const { user, loading: isAuthLoading, logout } = useUser();
  const router = useRouter();

  // --- State (This remains the same) ---
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCanteen, setSelectedCanteen] = useState<Canteen | null>(null);
  const [formData, setFormData] = useState<CanteenFormData>({
    canteenName: "",
    info: "",
    fssaiCertificateUrl: "",
    imageUrl: "",
  });
  const [canteenToDelete, setCanteenToDelete] = useState<Canteen | null>(null);

  // --- 2. Refactored Data Fetching (READ) ---
  const fetchCanteens = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCanteens();
      setCanteens(data);
    } catch (err: any) {
      setError(err.message);
      // If token is bad, service throws an error
      if (err.message.includes("Unauthorized")) {
        logout();
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // This useEffect is the same, but now it calls the cleaner fetchCanteens
  useEffect(() => {
    if (!isAuthLoading) {
      if (user && user.role === "ADMIN") {
        fetchCanteens();
      }
    }
  }, [isAuthLoading, user]);

  // --- Modal Handlers (These are the same) ---
  const handleOpenAddModal = () => {
    setSelectedCanteen(null);
    setFormData({
      canteenName: "",
      info: "",
      fssaiCertificateUrl: "",
      imageUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (canteen: Canteen) => {
    setSelectedCanteen(canteen);
    setFormData(canteen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCanteen(null);
  };

  // Form Change Handler (This is the same)
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- 3. Refactored API Handlers (CREATE & UPDATE) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (selectedCanteen) {
        // Update logic
        await updateCanteen(selectedCanteen.id, formData);
      } else {
        // Add logic
        await addCanteen(formData);
      }
      handleCloseModal();
      fetchCanteens(); // Refresh list
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  // --- 4. Refactored API Handlers (DELETE) ---
  const handleDelete = async () => {
    if (!canteenToDelete) return;

    setError(null);
    try {
      await deleteCanteen(canteenToDelete.id);
      setCanteenToDelete(null); // Close confirmation modal
      fetchCanteens(); // Refresh list
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  // --- Auth Protection Rendering (This is the same) ---
  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="alert alert-error max-w-lg">
          <div>
            <h3 className="font-bold">Access Denied</h3>
            <div className="text-xs">
              You do not have permission to view this page.
            </div>
            <button
              className="btn btn-sm btn-neutral mt-2"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Page Render (This is the same) ---
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-3xl font-bold">Canteen Management</h1>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          Add New Canteen
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <span>Error: {error}</span>
          </div>
        </div>
      )}

      {/* Canteen Table */}
      {loading ? (
        <div className="flex justify-center p-12">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Info</th>
                <th>FSSAI URL</th>
                <th>Image URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {canteens.map((canteen) => (
                <tr key={canteen.id} className="hover">
                  <th>{canteen.id}</th>
                  <td>{canteen.canteenName}</td>
                  <td>{canteen.info}</td>
                  <td className="truncate max-w-xs">
                    {canteen.fssaiCertificateUrl}
                  </td>
                  <td className="truncate max-w-xs">{canteen.imageUrl}</td>
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenEditModal(canteen)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => setCanteenToDelete(canteen)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {selectedCanteen ? "Edit Canteen" : "Add New Canteen"}
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Form controls... */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Canteen Name</span>
              </label>
              <input
                type="text"
                name="canteenName"
                value={formData.canteenName}
                onChange={handleFormChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Info</span>
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleFormChange}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">FSSAI Certificate URL</span>
              </label>
              <input
                type="text"
                name="fssaiCertificateUrl"
                value={formData.fssaiCertificateUrl}
                onChange={handleFormChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleFormChange}
                className="input input-bordered w-full"
              />
            </div>
            {/* Modal actions... */}
            <div className="modal-action mt-6">
              <button type="button" className="btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog className={`modal ${canteenToDelete ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete the canteen "
            {canteenToDelete?.canteenName}"? This action cannot be undone.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setCanteenToDelete(null)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
