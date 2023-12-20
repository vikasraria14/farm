import Table from './Table/index'
const Complaints = () =>{
    const columns = [
        {
          label: "Title",
          field: "title",
          type: "text",
          isEditable: false
        },
        {
          label: "Description",
          field: "description",
          type: "text",
          isEditable: false
        },
        {
          label: "Assign To",
          field: "assignedTo",
          type: "select",
          isEditable: false
        },
        {
          label: "Remarks",
          field: "remarks",
          type: "text",
          isEditable: true
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