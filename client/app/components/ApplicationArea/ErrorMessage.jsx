import { get, isObject } from "lodash";
import React from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.less";
import DynamicComponent from "@/components/DynamicComponent";
import { ErrorMessageDetails } from "@/components/ApplicationArea/ErrorMessageDetails";

function getErrorMessageByStatus(status, defaultMessage) {
  switch (status) {
    case 404:
      return "网页不存在。";
    case 401:
    case 403:
      return "没有权限。";
    default:
      return defaultMessage;
  }
}

function getErrorMessage(error) {
  const message = "系统出错，请刷新重试或者联系系统管理员！";
  if (isObject(error)) {
    // HTTP errors
    if (error.isAxiosError && isObject(error.response)) {
      return getErrorMessageByStatus(error.response.status, get(error, "response.data.message", message));
    }
    // Router errors
    if (error.status) {
      return getErrorMessageByStatus(error.status, message);
    }
  }
  return message;
}

export default function ErrorMessage({ error, message }) {
  if (!error) {
    return null;
  }

  console.error(error);

  const errorDetailsProps = {
    error,
    message: message || getErrorMessage(error),
  };

  return (
    <div className="error-message-container" data-test="ErrorMessage" role="alert">
      <div className="error-state bg-white tiled">
        <div className="error-state__icon">
          <i className="zmdi zmdi-alert-circle-o" />
        </div>
        <div className="error-state__details">
          <DynamicComponent
            name="ErrorMessageDetails"
            fallback={<ErrorMessageDetails {...errorDetailsProps} />}
            {...errorDetailsProps}
          />
        </div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.string,
};
