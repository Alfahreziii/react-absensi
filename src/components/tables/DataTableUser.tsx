import React, { useEffect, useState } from "react";
import { User } from "../../api/types/user";
import { fetchUsers, updateProfile } from "../../api/services/userService";
import { formatHari } from "../../utils/dateFormatter";
import DataTable from "./ReusableTables/BasicTableOne";
import { ColumnConfig } from "./ReusableTables/BasicTableOne";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";

const UserTable: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleForm, setRoleForm] = useState("user");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUser(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (id: number) => {
    navigate(`/user-tables/detail-user/${id}`);
  };

  const handleOpenRoleModal = (user: User) => {
    setSelectedUser(user);
    setRoleForm(user.role ?? "user");
    setFormMessage("");
    openModal();
  };

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleForm(e.target.value);
  };

  const handleSubmitRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
    await updateProfile({ id: selectedUser.id, role: roleForm });
      setFormMessage("Role berhasil diperbarui.");
      fetchData();
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (err: any) {
      setFormMessage(err.response?.data?.message || "Gagal mengubah role.");
    }
  };

  const columns: ColumnConfig<User>[] = [
    {
      header: "Nama",
      accessor: "name",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Role",
      accessor: "role",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Nomor NIK",
      accessor: "nomor_nik",
    },
    {
      header: "Nomor KK",
      accessor: "nomor_kk",
    },
    {
      header: "Jenis Kelamin",
      accessor: "jenis_kelamin",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Tempat Lahir",
      accessor: "tempat_lahir",
    },
    {
      header: "Tanggal Lahir",
      accessor: "tanggal_lahir",
      className: "max-w-[250px] truncate",
      render: (value: string) => formatHari(value),
    },
    {
      header: "Pekerjaan",
      accessor: "pekerjaan",
    },
    {
      header: "Alamat KTP",
      accessor: "alamat_ktp",
      className: "max-w-[250px] truncate",
    },
    {
      header: "Dibuat Pada",
      accessor: "created_at",
      className: "max-w-[250px] truncate",
      render: (value: string) =>
        new Date(value).toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (_value: any, row: User) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDetail(row.id)}
            className="px-3 py-1 bg-cyan-500 text-white rounded"
          >
            Detail
          </button>
          <button
            onClick={() => handleOpenRoleModal(row)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Ubah Role
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div>
        <DataTable<User> data={user} columns={columns} createLink="/form-user" />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Ubah Role Pengguna</h2>
          <form onSubmit={handleSubmitRole}>
            <div className="mb-4">
              <Label>Role</Label>
              <select
                name="role"
                value={roleForm}
                onChange={handleChangeRole}
                className="border rounded w-full p-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {formMessage && <p className="text-sm text-cyan-600">{formMessage}</p>}
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={closeModal}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
