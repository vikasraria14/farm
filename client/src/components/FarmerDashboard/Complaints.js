import Table from '../Table/index'
const Complaints = () =>{
    const columns = [
        {
          label: "Title",
          field: "title",
          type: "text",
          isEditable: true
        },
        {
          label: "Description",
          field: "description",
          type: "text",
          isEditable: true
        },
        {
          label: "Assign To",
          field: "assignedTo",
          type: "select",
          isEditable: true
        },
        {
          label: "Remarks",
          field: "remarks",
          type: "text",
          isEditable: false
        }
      ];

      return(
        <div>
            <Table
              showDropDown={false}
              columns={columns}
              endpoint={"complaints"}
              title={"Complaint"}
            />
        </div>
      )

}
export default Complaints;