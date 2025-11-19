"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../../contexts/authContext";
import {
  addCanteen,
  updateCanteen,
  deleteCanteen,
  Canteen,
  CanteenFormData,
} from "../../../services/canteenService";
import { getPublicCanteens } from "@/services/publicService";

// UI Imports
import {
  ArrowLeft,
  Store,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Search,
} from "lucide-react";

export default function AdminCanteensPage() {
  const { user, loading: isAuthLoading, logout } = useUser();
  const router = useRouter();

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

  const fetchCanteens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublicCanteens();
      setCanteens(data);
    } catch (err: any) {
      setError(err.message);
      if (
        err.message.includes("Unauthorized") ||
        err.message.includes("Forbidden")
      ) {
        logout();
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [logout, router]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (user && user.role?.toUpperCase() === "ROLE_ADMIN") {
        fetchCanteens();
      } else if (!user) {
        setLoading(false);
      }
    }
  }, [isAuthLoading, user, fetchCanteens]);

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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (selectedCanteen) {
        await updateCanteen(selectedCanteen.id, formData);
      } else {
        await addCanteen(formData);
      }
      handleCloseModal();
      fetchCanteens();
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  const handleDelete = async () => {
    if (!canteenToDelete) return;

    setError(null);
    try {
      await deleteCanteen(canteenToDelete.id);
      setCanteenToDelete(null);
      fetchCanteens();
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  // --- Loading State ---
  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  // --- Access Denied State ---
  if (!user || user.role?.toUpperCase() !== "ROLE_ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="alert alert-error max-w-lg shadow-xl">
          <AlertTriangle className="stroke-current shrink-0 h-6 w-6" />
          <div>
            <h3 className="font-bold text-lg">Access Denied</h3>
            <div className="text-sm mt-1">
              You do not have permission to view this page.
            </div>
            <button
              className="btn btn-sm btn-neutral mt-4"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Store className="w-8 h-8 text-blue-500" />
              Canteen Management
            </h1>
            <p className="text-base-content/70">
              Manage canteens, menus, and details.
            </p>
          </div>
        </div>

        <button
          className="btn btn-primary gap-2 w-full md:w-auto shadow-lg"
          onClick={handleOpenAddModal}
        >
          <Plus className="w-5 h-5" />
          Add New Canteen
        </button>
      </div>

      {/* --- Error Alert --- */}
      {error && (
        <div className="alert alert-error shadow-lg mb-6 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle className="stroke-current shrink-0 h-6 w-6" />
          <span>{error}</span>
        </div>
      )}

      {/* --- Main Content --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/50">Loading canteens...</p>
        </div>
      ) : canteens.length === 0 ? (
        // Empty State
        <div className="text-center py-20 bg-base-200/50 rounded-xl border-2 border-dashed border-base-300">
          <Store className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
          <h3 className="text-lg font-semibold opacity-60">
            No canteens found
          </h3>
          <p className="text-base-content/50 mb-4">
            Get started by adding your first canteen.
          </p>
          <button
            className="btn btn-outline btn-primary btn-sm gap-2"
            onClick={handleOpenAddModal}
          >
            <Plus className="w-4 h-4" /> Add Canteen
          </button>
        </div>
      ) : (
        // Data Table
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th>ID</th>
                  <th>Canteen Name</th>
                  <th>Information</th>
                  <th>Certificates & Images</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {canteens.map((canteen) => (
                  <tr key={canteen.id} className="hover transition-colors">
                    <td className="font-mono text-xs opacity-50">
                      #{canteen.id}
                    </td>
                    <td>
                      <div className="font-bold text-lg">
                        {canteen.canteenName}
                      </div>
                    </td>
                    <td className="max-w-xs">
                      <p
                        className="truncate text-base-content/70"
                        title={canteen.info}
                      >
                        {canteen.info}
                      </p>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {canteen.fssaiCertificateUrl ? (
                          <span className="badge badge-success badge-outline badge-xs">
                            FSSAI Linked
                          </span>
                        ) : (
                          <span className="badge badge-ghost badge-xs opacity-50">
                            No Certificate
                          </span>
                        )}
                        {canteen.imageUrl ? (
                          <span className="badge badge-info badge-outline badge-xs">
                            Image Linked
                          </span>
                        ) : (
                          <span className="badge badge-ghost badge-xs opacity-50">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-square btn-ghost text-blue-500 hover:bg-blue-50"
                          onClick={() => handleOpenEditModal(canteen)}
                          title="Edit Canteen"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-sm btn-square btn-ghost text-red-500 hover:bg-red-50"
                          onClick={() => setCanteenToDelete(canteen)}
                          title="Delete Canteen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Add/Edit Modal --- */}
      <dialog
        className={`modal ${
          isModalOpen ? "modal-open" : ""
        } modal-bottom sm:modal-middle`}
      >
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>

          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            {selectedCanteen ? (
              <Edit2 className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {selectedCanteen ? "Edit Canteen Details" : "Add New Canteen"}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Canteen Name</span>
              </label>
              <input
                type="text"
                name="canteenName"
                value={formData.canteenName}
                onChange={handleFormChange}
                className="input input-bordered w-full focus:input-primary"
                placeholder="e.g. Main Cafeteria"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Description / Info
                </span>
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleFormChange}
                className="textarea textarea-bordered w-full h-24 focus:textarea-primary"
                placeholder="Details about food, timing, etc."
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  FSSAI Certificate URL
                </span>
              </label>
              <input
                type="text"
                name="fssaiCertificateUrl"
                value={formData.fssaiCertificateUrl}
                onChange={handleFormChange}
                className="input input-bordered w-full focus:input-primary"
                placeholder="https://..."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Cover Image URL
                </span>
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleFormChange}
                className="input input-bordered w-full focus:input-primary"
                placeholder="https://..."
              />
            </div>

            <div className="modal-action mt-6">
              <button type="button" className="btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {selectedCanteen ? "Update Canteen" : "Create Canteen"}
              </button>
            </div>
          </form>
        </div>
        {/* Backdrop click to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>

      {/* --- Delete Confirmation Modal --- */}
      <dialog
        className={`modal ${
          canteenToDelete ? "modal-open" : ""
        } modal-bottom sm:modal-middle`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2 text-error">
            <AlertTriangle className="w-6 h-6" />
            Confirm Deletion
          </h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <strong>{canteenToDelete?.canteenName}</strong>?
            <br />
            <span className="text-sm opacity-70">
              This action creates a permanent change and cannot be undone.
            </span>
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setCanteenToDelete(null)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete Canteen
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
