import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info" | "question";

export const showAlert = (
  title: string,
  text: string,
  icon: AlertType = "success"
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
  });
};

export const showConfirmAlert = async (
  title: string,
  text: string
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });

  return result.isConfirmed;
};
