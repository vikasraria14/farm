import Table from "./Table/index";
const Complaints = () => {
  const columns = [
    {
      label: "Complainant",
      field: "complainent",
      type: "select",
      isEditable: false,
    },
    {
      label: "Title",
      field: "title",
      type: "text",
      isEditable: false,
    },
    {
      label: "Description",
      field: "description",
      type: "text",
      isEditable: false,
    },

    {
      label: "Remarks",
      field: "remarks",
      type: "text",
      isEditable: true,
    },
  ];

  return (
    <div>
      <Table
        showDropDown={false}
        columns={columns}
        endpoint={"complaints"}
        title={"Complaint"}
      />
    </div>
  );
};
export default Complaints;
