import { isString, get, find } from "lodash";
import sanitize from "@/services/sanitize";
import { axios } from "@/services/axios";
import notification from "@/services/notification";
import { clientConfig } from "@/services/auth";

function getErrorMessage(error) {
  return find([get(error, "response.data.message"), get(error, "response.statusText"), "Unknown error"], isString);
}

function disableResource(user) {
  return `api/users/${user.id}/disable`;
}

function enableUser(user) {
  const userName = sanitize(user.name);

  return axios
    .delete(disableResource(user))
    .then(data => {
      notification.success(`用户 ${userName} 已启用！`);
      user.is_disabled = false;
      user.profile_image_url = data.profile_image_url;
      return data;
    })
    .catch(error => {
      notification.error("不能启用用户！", getErrorMessage(error));
    });
}

function disableUser(user) {
  const userName = sanitize(user.name);
  return axios
    .post(disableResource(user))
    .then(data => {
      notification.warning(`用户 ${userName} 已停用。`);
      user.is_disabled = true;
      user.profile_image_url = data.profile_image_url;
      return data;
    })
    .catch(error => {
      notification.error("不能停用用户！", getErrorMessage(error));
    });
}

function deleteUser(user) {
  const userName = sanitize(user.name);
  return axios
    .delete(`api/users/${user.id}`)
    .then(data => {
      notification.warning(`用户 ${userName} 已被删除！`);
      return data;
    })
    .catch(error => {
      notification.error("不能删除用户！", getErrorMessage(error));
    });
}

function activeUser(user) {
  const userName = sanitize(user.name);
  return axios
    .post(`api/users/${user.id}/active`)
    .then(data => {
      notification.warning(`用户 ${userName} 已激活！默认密码为“dazdada”，请为其分配角色即可正常使用。`);
      return data;
    })
    .catch(error => {
      notification.error("不能激活用户！", getErrorMessage(error));
    });
}

function convertUserInfo(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImageUrl: user.profile_image_url,
    apiKey: user.api_key,
    groupIds: user.groups,
    isDisabled: user.is_disabled,
    isInvitationPending: user.is_invitation_pending,
  };
}

function regenerateApiKey(user) {
  return axios
    .post(`api/users/${user.id}/regenerate_api_key`)
    .then(data => {
      notification.success("API Key 已经重新生成！");
      return data.api_key;
    })
    .catch(error => {
      notification.error("重新生成API Key失败！", getErrorMessage(error));
    });
}

function resetPassword(user) {
  return axios
    .get(`api/users/${user.id}/reset_password`)
    .then(data => {
      notification.success("重置密码已成功。");
    })
    .catch(error => {
      notification.error("重置密码不成功。", getErrorMessage(error));
    });
}

function sendPasswordReset(user) {
  return axios
    .post(`api/users/${user.id}/reset_password`)
    .then(data => {
      if (clientConfig.mailSettingsMissing) {
        notification.warning("电子邮件服务没有配置。");
        return data.reset_link;
      }
      notification.success("重置密码邮件已发送。");
    })
    .catch(error => {
      notification.error("重置密码邮件发送不成功。", getErrorMessage(error));
    });
}

function resendInvitation(user) {
  return axios
    .post(`api/users/${user.id}/invite`)
    .then(data => {
      if (clientConfig.mailSettingsMissing) {
        notification.warning("电子邮件服务器没有配置。");
        return data.invite_link;
      }
      notification.success("用户邀请邮件已发送。");
    })
    .catch(error => {
      notification.error("用户邀请邮件发送失败。", getErrorMessage(error));
    });
}

const User = {
  query: params => axios.get("api/users", { params }),
  get: ({ id }) => axios.get(`api/users/${id}`),
  create: data => axios.post(`api/users`, data),
  save: data => axios.post(`api/users/${data.id}`, data),
  enableUser,
  disableUser,
  deleteUser,
  activeUser,
  convertUserInfo,
  regenerateApiKey,
  sendPasswordReset,
  resetPassword,
  resendInvitation,
};

export default User;
