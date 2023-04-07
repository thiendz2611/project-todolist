import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add, updateWork, status } from "../../Actions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import moment from "moment";

const Add = ({
  dialog,
  closeDialog,
  update,
  id,
  nameWorkDialog,
  setNameWorkDialog,
  statusDialog,
  nameDialog,
  nameButton,
}) => {
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));

  const dispatch = useDispatch();

  const addNew = (data) => {
    dispatch(
      add.addRequest({ nameWork: data, date: date, status: "Chưa hoàn thành" })
    );
    closeDialog();
  };

  const updateData = (data) => {
    dispatch(updateWork.updateRequest({ id: id, nameWork: data }));
    closeDialog();
  };

  const onChangeStatus = () => {
    dispatch(status.statusRequest({ id: id, status: "Hoàn thành" }));
    closeDialog();
  };

  return (
    <div>
      <Dialog open={dialog || update} fullWidth={true}>
        <DialogTitle>{nameDialog}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ margin: "10px 0px 5px 0px" }} fullWidth={true}>
            <InputLabel>Tên công việc</InputLabel>
            <Input
              placeholder="Tên công việc"
              onChange={(e) => setNameWorkDialog(e.target.value)}
              value={nameWorkDialog}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Đóng</Button>
          <Button
            variant="contained"
            sx={{ margin: "10px 0px 5px 0px" }}
            onClick={() => {
              if (!id) {
                addNew(nameWorkDialog);
              } else {
                updateData(nameWorkDialog);
              }
            }}
          >
            {nameButton}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog update status */}
      <Dialog open={statusDialog}>
        <DialogContent>Bạn đã hoàn thành công việc?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialog();
              setDate("");
            }}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onChangeStatus()}
          >
            Đúng vậy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Add;
