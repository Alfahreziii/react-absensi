import React, { useEffect, useState } from "react";
import { LogInOut } from "../../api/types/loginout";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import {
  getLogInOut,
  deleteLogInOut,
  createLogInOut,
} from "../../api/services/loginoutService";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { showAlert, showConfirmAlert } from "../ui/alert/AlertPopup";

import Alert from "../ui/alert/Alert";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

const LogInOutTable: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [loginout, setLogInOut] = useState<LogInOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState({
    tempat: "",
    status: "", // akan di-set otomatis saat klik tombol
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getLogInOut();
      setLogInOut(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openModalWithStatus = (status: string) => {
    setForm({ tempat: "", status }); // reset tempat dan set status
    setMessage("");
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createLogInOut(form);
      setMessage("Log berhasil ditambahkan! Halaman akan diperbarui dalam 2 detik.");

      setTimeout(() => {
        fetchData();
        closeModal();
        setForm({ status: "", tempat: "" }); // reset form
        setMessage("");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal menambahkan log.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id: number) => {
    const confirmed = await showConfirmAlert(
      "Yakin ingin menghapus?",
      "Tindakan ini tidak bisa dibatalkan!"
    );

    if (confirmed) {
      try {
        await deleteLogInOut(id);
        showAlert("Berhasil", "Data berhasil dihapus", "success");
        fetchData();
      } catch (error) {
        showAlert("Gagal", "Gagal menghapus data", "error");
      }
    }
  };

  const columns: ColumnConfig<LogInOut>[] = [
    {
      header: "Name",
      accessor: "User",
      render: (_val, row) => row.User?.name ?? "Tidak diketahui",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Tempat",
      accessor: "tempat",
    },
    {
      header: "Dibuat Pada",
      accessor: "created_at",
      render: (value: string) =>
        new Date(value).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (_value: any, row: LogInOut) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button size="sm" onClick={() => openModalWithStatus("Masuk")}>
          Tambah Log Masuk
        </Button>
        <Button size="sm" variant="outline" onClick={() => openModalWithStatus("Keluar")}>
          Tambah Log Keluar
        </Button>
      </div>

      <DataTable<LogInOut> data={loginout} columns={columns} />

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Tambah Log {form.status}
            </h4>

            {error && (
              <Alert variant="error" title="Error Messages" message={error} />
            )}

            {message && (
              <Alert variant="success" title="Success" message={message} />
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="custom-scrollbar px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Status</Label>
                    <Input type="text" name="status" value={form.status} readOnly />

                    <Label className="mt-5">Tempat</Label>
                    <Input
                      type="text"
                      name="tempat"
                      value={form.tempat}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LogInOutTable;
