import { authJsonHeader, axios } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editVoucherSetting = async (payload: any) => {
  const { data } = await axios.post(
    `Miscellaneous/UpdateVoucherSetting`,
    payload,
    {
      headers: authJsonHeader(),
    }
  );
  return data;
};

export const useEditVoucherSetting = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => editVoucherSetting(payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["voucher-setting"] });
    },
  });
};
