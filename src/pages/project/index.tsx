import { LocaleFormatter, useLocale } from "@/locales";
import { FooterToolbar, PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, Card, message, Modal, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import React, { useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import OperationModal from "./components/OperationModal";
import {
  useAddProject,
  useBatchDeleteProject,
  useGetProjects,
  useUpdateProject,
} from "@/api";
import {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from "@ant-design/pro-form";

const TableList = () => {
  const { formatMessage } = useLocale();

  const addBtn = useRef(null);

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [projects, setProjects] = useState<API.Project[]>();
  const [filters, setFilters] = useState<API.Project[]>();
  const [current, setCurrent] = useState<Partial<API.Project> | undefined>(
    undefined
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [pagination, setPagination] = useState<{}>({
    current: 1,
    pageSize: 10,
  });

  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.Project[]>([]);

  const { data, error, isLoading, refetch } = useGetProjects(
    pagination,
    filters
  );

  const { mutateAsync } = useAddProject();
  const { mutateAsync: update } = useUpdateProject();
  const { mutateAsync: batchDelete } = useBatchDeleteProject();

  useEffect(() => {
    setProjects(data?.list);
    setPagination({
      ...pagination,
      total: data?.total,
      showQuickJumper: true,
    });
  }, [data]);

  useEffect(() => {
    refetch();
  }, [filters]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: API.Project) => {
    setVisible(true);
    setCurrent(item);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const addProject = async (data: API.Project) => {
    await mutateAsync(data);
  };
  const updateProject = async (data: API.Project) => {
    await update(data);
  };
  const handleSubmit = async (values: API.Project) => {
    values.id = current && current.id ? current.id : 0;

    setAddBtnblur();
    setVisible(false);

    const hide = message.loading("正在添加/更新");
    try {
      if (values.id === 0) {
        await addProject(values);
      } else {
        await updateProject(values);
      }

      hide();

      message.success("操作成功");
      refetch();

      return true;
    } catch (error) {
      hide();
      message.error("操作失败请重试！");
      return false;
    }
  };
  /**
   * 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.Project[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      await batchDelete(selectedRows.map((row) => row.id));
      hide();
      message.success("删除成功，即将刷新");
      return true;
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
      return false;
    }
  };
  const columns = [
    {
      title: formatMessage({ id: "app.project.name" }),
      dataIndex: "name",
    },
    {
      title: formatMessage({ id: "app.project.description" }),
      dataIndex: "description",
    },
  ];
  // const columns: ProColumns<API.Project>[] = [
  //   {
  //     title: formatMessage({ id: "app.project.name" }),
  //     dataIndex: "name",
  //     tip: "项目名称是唯一的 key",
  //     sorter: true,
  //     render: (dom, entity) => {
  //       return (
  //         <a
  //           onClick={() => {
  //             setCurrent(entity);
  //             setShowDetail(true);
  //           }}
  //         >
  //           {dom}
  //         </a>
  //       );
  //     },
  //   },
  //   {
  //     title: formatMessage({ id: "app.project.description" }),
  //     dataIndex: "description",
  //     valueType: "textarea",
  //     sorter: true,
  //   },
  //   {
  //     title: formatMessage({ id: "gloabal.tips.operation" }),
  //     dataIndex: "option",
  //     valueType: "option",
  //     render: (_, record) => [
  //       <a
  //         key="edit"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           showEditModal(record);
  //         }}
  //       >
  //         {formatMessage({ id: "gloabal.tips.modify" })}
  //       </a>,
  //       <a
  //         key="delete"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           Modal.confirm({
  //             title: "删除項目",
  //             content: "确定删除该項目吗？",
  //             okText: "确认",
  //             cancelText: "取消",
  //             onOk: async () => {
  //               await handleRemove([{ ...record }]);
  //               setSelectedRows([]);
  //               refetch();
  //             },
  //           });
  //         }}
  //       >
  //         {formatMessage({ id: "gloabal.tips.delete" })}
  //       </a>,
  //     ],
  //   },
  // ];

  return (
    <PageContainer>
      <div className="table-filter">
        <QueryFilter<API.Project[]>
          onFinish={async (values) => {
            console.log(values);
            setFilters(values);
          }}
        >
          <ProFormText
            name="name"
            label={formatMessage({ id: "app.project.name" })}
            
            rules={[{ required: true }]}
          />
          <ProFormText name="description" label={formatMessage({ id: "app.project.description" })} />
        </QueryFilter>
      </div>

      <Card style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: "flex-end" }}>
          <Space>
            <Button type="primary" key="primary" onClick={showModal}>
              <PlusOutlined /> <LocaleFormatter id="gloabal.tips.create" />
            </Button>
          </Space>
        </div>
        <Table<API.Project>
          rowKey="id"
          dataSource={projects}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
      </Card>

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <LocaleFormatter
                id="app.project.chosen"
                defaultMessage="已选择"
              />{" "}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{" "}
              <LocaleFormatter id="app.project.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              refetch();
            }}
          >
            <LocaleFormatter id="app.project.batchDeletion" />
          </Button>
        </FooterToolbar>
      )}

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};

export default TableList;
