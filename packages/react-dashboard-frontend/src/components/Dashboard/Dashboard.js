import { Box, Divider, List, ListItem, Typography } from "@mui/material";
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
  const [loadingCard, setLoadingCard] = useState(true);

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
    setLoadingCard(true);
    getCardsFromDB()
      .then((res) => {
        if (res?.data && res.data?.length > 0) {
          setCards(res.data);
          setSelectedId(res.data[0].id);
        }
        setLoadingCard(false);
      })
      .catch((err) => {
        console.log("Some Error occured");
        setLoadingCard(false);
      });
  }, []);
  useEffect(() => {
    setLoadingTable(true);
    if (selectedId) {
      getCustomersFromDB(selectedId)
        .then((res) => {
          if (res?.data && res.data?.length > 0) {
            setTableDetails(res.data);
          }
          setLoadingTable(false);
        })
        .catch((err) => {
          setLoadingTable(false);
          console.log("Some Error occured");
        });
    } else {
      setLoadingTable(false);
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
            loading={loadingCard}
            setLoading={setLoadingCard}
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
          <Typography variant="h3">Full-Stack Application Demo</Typography>
          <Typography paragraph>
            Welcome to the Full-Stack Application Demo, showcasing the
            integration of React.js, Material-UI, Node.js, Express.js, and
            Supabase. This application manages details of agents and their
            associated customers. This project demonstrates the development of a
            full-stack web application for managing agent and customer data. It
            includes a React.js-based frontend for the user interface, a
            Node.js/Express.js-based backend for API endpoints, and Supabase as
            the database for storing and retrieving data.
          </Typography>
          <List>
            <ListItem>
              <Typography>View a list of agents and their details.</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                View a list of customers associated with each agent.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Add, edit, and delete agents and customers.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Search for agents and customers.</Typography>
            </ListItem>
            <ListItem>
              <Typography> Pagination for large datasets.</Typography>
            </ListItem>
          </List>
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
