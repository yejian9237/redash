import React, { useState, useEffect, useCallback } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Alert from "antd/lib/alert";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import recordEvent from "@/services/recordEvent";

const formFields = [
  { required: true, name: "name", title: "Name", type: "text", autoFocus: true },
  { required: true, name: "email", title: "Email", type: "email" },
];

function CreateUserDialog({ dialog }) {
  const [error, setError] = useState(null);
  useEffect(() => {
    recordEvent("view", "page", "users/new");
  }, []);

<<<<<<< HEAD
  const createUser = useCallback(() => {
    if (formRef.current) {
      formRef.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dialog.close(values).catch(setError);
        }
      });
    }
  }, [dialog]);

  const formFields = useMemo(() => {
    const common = { required: true, props: { onPressEnter: createUser } };
    return [
      { ...common, name: "name", title: "姓名", type: "text", autoFocus: true },
      { ...common, name: "email", title: "电子邮箱", type: "email" },
    ];
  }, [createUser]);

  return (
    <Modal {...dialog.props} title="新建用户" okText="创建" cancelText="取消" onOk={createUser}>
      <DynamicForm fields={formFields} ref={formRef} hideSubmitButton />
      {error && <Alert message={error.message} type="error" showIcon />}
=======
  const handleSubmit = useCallback(values => dialog.close(values).catch(setError), [dialog]);

  return (
    <Modal
      {...dialog.props}
      title="Create a New User"
      footer={[
        <Button key="cancel" {...dialog.props.cancelButtonProps} onClick={dialog.dismiss}>
          Cancel
        </Button>,
        <Button
          key="submit"
          {...dialog.props.okButtonProps}
          htmlType="submit"
          type="primary"
          form="userForm"
          data-test="SaveUserButton">
          Create
        </Button>,
      ]}
      wrapProps={{
        "data-test": "CreateUserDialog",
      }}>
      <DynamicForm id="userForm" fields={formFields} onSubmit={handleSubmit} hideSubmitButton />
      {error && <Alert message={error.message} type="error" showIcon data-test="CreateUserErrorAlert" />}
>>>>>>> 32b41e41123a038e14078ed7ae081c4f3591b443
    </Modal>
  );
}

CreateUserDialog.propTypes = {
  dialog: DialogPropType.isRequired,
};

export default wrapDialog(CreateUserDialog);
