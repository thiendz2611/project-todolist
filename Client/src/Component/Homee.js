import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pagination, deleteWork, search } from "../Actions/index";
import { userData } from "../Selector";
import Add from "./dialog/Dialog";
import {
  Box,
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Button,
  TableRow,
  Pagination,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";
import { limit } from "../constant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from "@mui/icons-material/Restore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import HomeIcon from "@mui/icons-material/Home";
import "../style.css";

const Homee = (props) => {
  const [dialog, setDialog] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  const [nameWork, setNameWork] = useState("");
  const [nameWorkDialog, setNameWorkDialog] = useState("");
  const [statusDialog, setStatusDialog] = useState(false);
  const [nameDialog, setNameDialog] = useState("");
  const [nameButton, setNameButton] = useState("");

  const dataReducer = useSelector(userData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pagination.paginationRequest(1));
  }, [dispatch]);

  const deleteButton = (id) => {
    dispatch(deleteWork.deleteRequest({ id: id }));
  };

  const closeDialog = () => {
    setDialog(false);
    setUpdate(false);
    setNameWork("");
    setNameWorkDialog("");
    setStatusDialog(false);
  };

  const onChangePage = (e, page) => {
    if (dataReducer.activePage !== page) {
      if (dataReducer.textSearch) {
        dispatch(
          search.searchRequest({
            activePage: page,
            textSearch: dataReducer.textSearch,
          })
        );
      } else {
        dispatch(pagination.paginationRequest(page));
      }
    }
  };

  const complete = "Hoàn thành";
  const unComplete = "Chưa hoàn thành";

  const onChangeNav = (data) => {
    dispatch(search.searchRequest({ textSearch: data, activePage: 1 }));
  };

  const skip = (dataReducer.activePage - 1) * limit;

  let dataItem = [];
  dataItem = dataReducer.act.map((item, key) => {
    return (
      <TableRow key={key}>
        <TableCell align="center" width={"3%"}>
          {key + 1 + skip}
        </TableCell>
        <TableCell align="center" width={"10%"}>
          {item.nameWork}
        </TableCell>
        <TableCell align="center" width={"10%"}>
          <Button onClick={() => deleteButton(item._id)}>
            <DeleteOutlineIcon color="error" />{" "}
          </Button>
          {item.status === "Hoàn thành" ? (
            <Button disabled>
              <EditIcon />
            </Button>
          ) : (
            <Button
              onClick={() => {
                setUpdate(true);
                setId(item._id);
                setNameWorkDialog(item.nameWork);
                setNameDialog("Chỉnh sửa công việc");
                setNameButton("Chỉnh sửa");
              }}
            >
              <EditIcon />{" "}
            </Button>
          )}
        </TableCell>
        <TableCell align="center" width={"10%"}>
          {item.date}
        </TableCell>
        <TableCell align="center" width={"10%"}>
          {item.status === "Chưa hoàn thành" ? (
            <Button
              sx={{ color: "#00b200" }}
              endIcon={<DoneIcon />}
              onClick={() => {
                setStatusDialog(true);
                setId(item._id);
              }}
            >
              Hoàn thành
            </Button>
          ) : (
            <Button disabled>Đã hoàn thành</Button>
          )}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <Add
        dialog={dialog}
        closeDialog={closeDialog}
        update={update}
        id={id}
        nameWork={nameWork}
        nameWorkDialog={nameWorkDialog}
        setNameWorkDialog={setNameWorkDialog}
        statusDialog={statusDialog}
        nameDialog={nameDialog}
        nameButton={nameButton}
      />

      <Container maxWidth="md">
        <Box sx={{ height: "100vh" }}>
          <h1 className="title">To-do List</h1>

          <Button
            endIcon={<AddCircleOutlineIcon />}
            variant="contained"
            onClick={() => {
              setDialog(true);
              setNameDialog("Thêm mới công việc");
              setNameButton("Thêm mới");
            }}
            sx={{ margin: "10px 0px 5px 0px" }}
          >
            Thêm mới
          </Button>
          <Box sx={{ minHeight: 350 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#d3e6f1" }}>
                <TableRow>
                  <TableCell align="center" width={"3%"}>
                    STT
                  </TableCell>
                  <TableCell align="center" width={"10%"}>
                    Tên công việc
                  </TableCell>
                  <TableCell align="center" width={"10%"}>
                    Thao tác
                  </TableCell>
                  <TableCell align="center" width={"10%"}>
                    Ngày tạo
                  </TableCell>
                  <TableCell align="center" width={"10%"}>
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{dataItem}</TableBody>
            </Table>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              sx={{ margin: "10px 0px 10px 0px" }}
              page={dataReducer.activePage}
              count={dataReducer.totalPage}
              color="primary"
              onChange={onChangePage}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: 1 / 2 }}>
              <BottomNavigation sx={{ backgroundColor: "#d3e6f1" }} showLabels>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction
                  label="Favorites"
                  icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                  label="Uncomplete"
                  icon={<RestoreIcon />}
                  onClick={() => {
                    onChangeNav(unComplete);
                  }}
                />
                <BottomNavigationAction
                  label="Complete"
                  icon={<CheckCircleIcon />}
                  onClick={() => {
                    onChangeNav(complete);
                  }}
                />
              </BottomNavigation>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Homee;
