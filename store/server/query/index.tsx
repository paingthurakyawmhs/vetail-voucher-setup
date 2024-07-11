import { authJsonHeader, axios } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface voucherSettingProp {
  id: number;
  branch: number;
}

const getDataVoucherSetting = async (payload: voucherSettingProp) => {
  const { data } = await axios.get(
    `Miscellaneous/GetVoucherSettingByBranchId?shopId=${payload.id}&branchId=${payload.branch}
`,
    {
      headers: authJsonHeader(),
    }
  );
  return data;
};

export const useGetDataVoucherSetting = (payload: voucherSettingProp) => {
  return useQuery({
    queryKey: ["voucher-setting", payload],
    queryFn: () => getDataVoucherSetting(payload),
  });
};
