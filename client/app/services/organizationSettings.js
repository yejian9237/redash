import { axios } from "@/services/axios";
import notification from "@/services/notification";

export default {
  get: () => axios.get("api/settings/organization"),
  save: (data, message = "保存成功。") =>
    axios
      .post("api/settings/organization", data)
      .then(data => {
        notification.success(message);
        return data;
      })
      .catch(() => {
        notification.error("保存失败。");
      }),
};
