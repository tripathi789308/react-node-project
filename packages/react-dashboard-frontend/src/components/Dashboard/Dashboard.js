import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardDrawer from "./DashboardDrawer";
import { getCards, getCardsFromDB } from "../../helpers/cards";
import {
  createCustomerInDB,
  deleteCustomers,
  deleteCustomersInDB,
  getCustomers,
  getCustomersFromDB,
  updateCustomers,
  updateCustomersInDB,
} from "../../helpers/customerdetails";
import ScrollableCardList from "../Card/Card";
import TableComponent from "../Table/table";
import EditDialog from "../Model/model";
import CreateModal from "../Model/createModal";

const drawerWidth = 250;

function DashBoard(props) {
  const [open, setOpen] = useState(false);
  const fileName = "DashBoard.js";
  const [cards, setCards] = useState([]);
  const [selectedId, setSelectedId] = useState(undefined);
  const [tableDetails, setTableDetails] = useState([]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);

  const handleEditClick = (row) => {
    setSelectedRowData(row);
    setIsEditDialogOpen(true);
  };

  const handleEditSave = (editedData) => {
    // updateCustomers(
    //   editedData,
    //   () => {
    //     setTableDetails(getCustomers(selectedId));
    //   },
    //   (e) => {
    //     console.error(`Error Occured : ${e}`);
    //   }
    // );
    setLoadingTable(true);
    updateCustomersInDB(editedData.id, editedData)
      .then((res) => {
        setSelectedId(editedData.agent_id);
        return getCustomersFromDB(editedData.agent_id);
      })
      .then((res) => {
        if (res?.data && res.data?.length > 0) {
          setTableDetails(res.data);
          setLoadingTable(false);
        }
      })
      .catch((err) => {
        console.log("Error during updating", err);
        setLoadingTable(false);
      });
    console.log("Edited Data:", editedData);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  const handleCreateDialogClose = () => {
    setOpenCreateModal(false);
  };

  const handleCreateCustomer = (data) => {
    console.log(data);
    createCustomerInDB(data)
      .then((res) => {
        setSelectedId(data.agent_id);
        return getCustomersFromDB(data.agent_id);
      })
      .then((res) => {
        if (res?.data && res.data?.length > 0) {
          setTableDetails(res.data);
          setLoadingTable(false);
        }
      })
      .catch((err) => {
        console.log("Error during creating", err);
        setLoadingTable(false);
      });
  };

  const handleDelete = (data) => {
    setLoadingTable(true);
    deleteCustomersInDB(data.id)
      .then((res) => {
        setSelectedId(data.agent_id);
        return getCustomersFromDB(data.agent_id);
      })
      .then((res) => {
        if (res?.data && res.data?.length > 0) {
          setTableDetails(res.data);
          setLoadingTable(false);
        }
      })
      .catch((err) => {
        console.log("Error during deleting", err);
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    getCardsFromDB()
      .then((res) => {
        if (res?.data && res.data?.length > 0) {
          setCards(res.data);
          setSelectedId(res.data[0].id);
        }
      })
      .catch((err) => {
        console.log("Some Error occured");
      });
  }, []);
  useEffect(() => {
    setLoadingTable(true);
    if (selectedId) {
      getCustomersFromDB(selectedId).then((res) => {
        if (res?.data && res.data?.length > 0) {
          setTableDetails(res.data);
          setLoadingTable(false);
        }
      });
    }
  }, [selectedId]);

  return (
    <>
      <Box>
        <DashboardDrawer
          open={open}
          setOpen={setOpen}
          headerText={"DashBoard"}
        />
        <Box
          sx={{
            marginLeft: open ? `${drawerWidth}px` : `10px`,
          }}
        >
          <ScrollableCardList
            cardsData={cards}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
          />
          <Divider sx={{ padding: "10px", margin: "10px" }} />
          <TableComponent
            data={tableDetails}
            onDelete={handleDelete}
            onEdit={handleEditClick}
            selectedId={selectedId}
            loading={loadingTable}
            setLoading={setLoadingTable}
            setOpenCreateModal={setOpenCreateModal}
          />
          <Divider sx={{ padding: "10px" }} />
          <Typography variant="h2">Website Information</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
          {isEditDialogOpen && (
            <EditDialog
              open={isEditDialogOpen}
              handleClose={handleEditDialogClose}
              rowData={selectedRowData}
              handleSave={handleEditSave}
            />
          )}
          {openCreateModal && (
            <CreateModal
              open={openCreateModal}
              onClose={handleCreateDialogClose}
              onSave={handleCreateCustomer}
              selectedId={selectedId}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default DashBoard;
