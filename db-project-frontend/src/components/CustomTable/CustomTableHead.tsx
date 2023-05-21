import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import clsx from "clsx";
import { DatePicker } from "@mui/x-date-pickers";

import { makeStyles } from "@mui/styles";
import {
  TextField,
  MenuItem,
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip,
  Select,
  TableHead,
  Typography,
} from "@mui/material";

import {
  traerColaboradores,
  setPage,
  selectPage,
  selectRowsPerPage,
} from "../store/colaboradoresSlice";
import { CalendarIcon } from "@heroicons/react/24/solid";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    "& .MuiInputBase-root": {
      padding: "0px",
      minHeight: 0,
    },
    "& .MuiSelect-select": {
      fontSize: 12,
      color: "#2e2e2e",
      minHeight: 16,
      padding: "3px 5px",
      background: "white",
      borderRadius: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& input": {
      fontSize: 12,
      color: "#2e2e2e",
      minHeight: 0,
      padding: "3px 5px",
      background: "white",
      borderRadius: 4,
    },
  },
  customSort: {
    "&.Mui-active": {
      color: "#1B0055",
    },
    "&.MuiTableSortLabel-icon": {
      color: "#1B0055",
    },
    "&.Mui-active > .MuiTableSortLabel-icon": {
      color: "#1B0055",
    },
    "&:hover": {
      color: "#000",
    },
  },
}));

const rows = [
  {
    id: "col_id",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "ID",
    width: "4%",
  },
  {
    id: "col_fecha_creacion",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Creado",
    width: "7%",
  },
  {
    id: "col_tipo_documento",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Doc. identidad",
    width: "10%",
  },
  {
    id: "col_nombres",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Nombres",
    width: "10%",
  },
  {
    id: "col_apellidos",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Apellidos",
    width: "10%",
  },
  {
    id: "col_ciudad",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Ciudad",
    width: "7%",
  },
  {
    id: "col_email",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Email",
    width: "12%",
  },
  {
    id: "col_celular",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Celular",
    width: "7%",
  },
  {
    id: "col_rol",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "ROL",
    width: "7%",
  },
  {
    id: "col_fecha_nacimiento",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Cumpleaños",
    width: "10%",
  },
  {
    id: "col_mesa_ayuda",
    align: "center",
    disablePadding: false,
    sort: false,
    label: "Mesa de ayuda",
    width: "7%",
  },
  {
    id: "col_estado",
    align: "center",
    disablePadding: false,
    sort: true,
    label: "Estado",
    width: "7%",
  },
];

const defaultValues = {
  col_id: "",
  col_fecha_creacion: null,
  col_documento: "",
  col_nombres: "",
  col_apellidos: "",
  col_ciudad: "",
  col_email: "",
  col_celular: "",
  col_rol: "",
  col_fecha_nacimiento: null,
  col_mesa_ayuda: "",
  col_estado: "",
};

function CustomTableHead(props) {
  // --------------------------------------------------
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageRedux = useSelector(selectPage);
  const rowsPerPageRedux = useSelector(selectRowsPerPage);
  // --------------------------------------------------
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });
  const { watch, setValue, getValues, control } = methods;
  // --------------------------------------------------
  const optionState = [
    { value: "", label: "- seleccione -" },
    { value: 1, label: "Activo" },
    { value: 0, label: "Inactivo" },
  ];
  // -------------------------------------------------------
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };
  // -------------------------------------------------------
  const handledChangeInput = (event) => {
    setValue(event.target.name, event.target.value);
    if (event.target.value === "") {
      setValue(`${event.target.name}`, "");
      handledEnter("random");
    }
    if (event.target.name === "col_estado" && event.target.value !== "") {
      handledEnter("random");
    }
  };
  const handledChangeDate = (prop) => (event) => {
    setValue(prop, event);
    if (event === null) {
      setValue(prop, null);
      handledEnter("random");
    }
  };
  // -------------------------------------------------------
  const handledEnter = async (event) => {
    if (event.key === "Enter" || event === "random") {
      const data = getValues();
      await dispatch(setPage(0));
      await dispatch(
        traerColaboradores({
          page: pageRedux,
          rowsPerPage: rowsPerPageRedux,
          orderBy: props.order.id,
          order: props.order.direction,
          params: {
            ...data,
            col_fecha_creacion:
              data.col_fecha_creacion === null
                ? ""
                : format(new Date(data.col_fecha_creacion), "yyyy-MM-dd"),
            col_fecha_nacimiento:
              data.col_fecha_nacimiento === null
                ? ""
                : format(new Date(data.col_fecha_nacimiento), "yyyy-MM-dd"),
          },
        })
      );
    }
  };

  return (
    <TableHead className="h-48 sm:h-64">
      <TableRow style={{ backgroundColor: "#EFE8FF" }}>
        {rows.map((row) => (
          <TableCell
            align="center"
            key={row.id}
            className="p-5"
            style={{ width: row.width }}
          >
            <div className="flex justify-center items-center">
              {row.sort && (
                <Tooltip
                  title="Ordenar"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className={clsx(
                      classes.customSort,
                      "text-11 font-semibold mr-8 tectx-center"
                    )}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
              {!row.sort && (
                <Typography className="text-11 font-semibold mr-8">
                  {row.label}
                </Typography>
              )}
            </div>
          </TableCell>
        ))}
      </TableRow>
      <TableRow style={{ backgroundColor: "#F7F8FC" }} className="h-36">
        {rows.map((row) => {
          return (
            <TableCell
              className="px-4 md:px-16 py-0"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
              style={{ width: row.width, maxHeight: 10 }}
            >
              {row.id === "col_id" && (
                <Controller
                  name="col_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 45 }}
                      id="col_id"
                      name="col_id"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id == "col_fecha_creacion" && (
                <Controller
                  control={control}
                  name="col_fecha_creacion"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      clearable
                      disableFuture
                      value={field.value}
                      inputFormat="yyyy-MM-dd"
                      onAccept={() => handledEnter("random")}
                      onChange={handledChangeDate("col_fecha_creacion")}
                      renderInput={(_props) => (
                        <TextField
                          id="col_fecha_creacion"
                          className={classes.textField}
                          style={{ background: "#fff" }}
                          {..._props}
                        />
                      )}
                      components={{
                        OpenPickerIcon: () => (
                          <CalendarIcon
                            className="text-48 mr-8"
                            size={14}
                            color="#651DFF"
                          />
                        ),
                      }}
                    />
                  )}
                />
              )}
              {row.id === "col_tipo_documento" && (
                <Controller
                  name="col_tipo_documento"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 200 }}
                      id="col_tipo_documento"
                      name="col_tipo_documento"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_nombres" && (
                <Controller
                  name="col_nombres"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 200 }}
                      id="col_nombres"
                      name="col_nombres"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_apellidos" && (
                <Controller
                  name="col_apellidos"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 200 }}
                      id="col_apellidos"
                      name="col_apellidos"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_ciudad" && (
                <Controller
                  name="col_ciudad"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 400 }}
                      id="col_ciudad"
                      name="col_ciudad"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_email" && (
                <Controller
                  name="col_email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      id="col_email"
                      name="col_email"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_rol" && (
                <Controller
                  name="col_rol"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      id="col_rol"
                      name="col_rol"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id === "col_celular" && (
                <Controller
                  name="col_celular"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className={classes.textField}
                      id="col_celular"
                      name="col_celular"
                      onKeyPress={handledEnter}
                      onChange={handledChangeInput}
                    />
                  )}
                />
              )}
              {row.id == "col_fecha_nacimiento" && (
                <Controller
                  control={control}
                  name="col_fecha_nacimiento"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      clearable
                      disableFuture
                      value={field.value}
                      inputFormat="yyyy-MM-dd"
                      onAccept={() => handledEnter("random")}
                      onChange={handledChangeDate("col_fecha_nacimiento")}
                      renderInput={(_props) => (
                        <TextField
                          id="col_fecha_nacimiento"
                          className={classes.textField}
                          style={{ background: "#fff" }}
                          {..._props}
                        />
                      )}
                      components={{
                        OpenPickerIcon: () => (
                          <CalendarIcon
                            className="text-48 mr-8"
                            size={14}
                            color="#651DFF"
                          />
                        ),
                      }}
                    />
                  )}
                />
              )}
              {row.id === "col_estado" && (
                <Controller
                  name="col_estado"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className={classes.textField}
                      style={{ maxWidth: 300 }}
                      id="col_estado"
                      name="col_estado"
                      onChange={handledChangeInput}
                      sx={{
                        minHeight: 25,
                      }}
                    >
                      {optionState.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}
export default CustomTableHead;
