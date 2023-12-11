import { Table } from 'antd';

const TableListView = ({columns, allData}) => {
  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={allData.map((item, index) => ({
          ...item,
          key: index.toString(),
        }))}
        bordered
        pagination={{
          showTotal: (total) => `${total} records`,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        scroll={{
          y: 'calc(100vh - 26em)'
        }}
      />
    </div>
  );
};

export default TableListView;
