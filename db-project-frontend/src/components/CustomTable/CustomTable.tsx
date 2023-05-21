import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import clsx from 'clsx';
import { format } from 'date-fns';

import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  MenuItem,
  Typography,
  IconButton,
  Pagination,
  PaginationItem,
  Select,
} from '@mui/material';

import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

import {
  eliminarColaborador,
  selectColaboradores,
  selectLoading,
  traerColaboradores,
  traerColaboradorById,
  setRowsPerPage,
  setPage,
  selectPage,
  selectRowsPerPage,
  selectTotal,
  setLoadingSync,
} from '../store/colaboradoresSlice';

import CustomTableHead from './CustomTableHead';

const useStyles = makeStyles((theme) => ({
  textMenu: {
    fontSize: 14,
    color: '#747B87',
    marginLeft: 8,
    marginTop: 5,
  },
  tableCell: {
    borderBottom: '1px solid #D1D9EB',
  },
  textFieldPag: {
    minWidth: 50,
    marginLeft: 12,
    marginRight: 12,
    '& .MuiInputBase-root': {
      padding: '0px',
      minHeight: 0,
    },
    '& .MuiSelect-select': {
      fontSize: 12,
      color: '#2e2e2e',
      minHeight: 16,
      padding: '3px 5px',
      background: 'white',
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 24,
    },

    '& input': {
      fontSize: 12,
      color: '#2e2e2e',
      minHeight: 0,
      padding: '3px 5px',
      background: 'white',
      borderRadius: 4,
    },
  },
  selectedPag: {
    borderRadius: 'inherit',
    borderBottom: '1px solid #4FDFC8',
  },
}));

function CustomTable(props) {
  // --------------------------------------------------------------
  const { actualizarItem } = props;
  // --------------------------------------------------------------
  const dispatch = useDispatch();
  const dataRedux = useSelector(selectColaboradores);
  const pageRedux = useSelector(selectPage);
  const rowsPerPageRedux = useSelector(selectRowsPerPage);
  const totalRedux = useSelector(selectTotal);
  const loadingRedux = useSelector(selectLoading);
  // --------------------------------------------------------------
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'col_id',
  });
  // --------------------------------------------------------------
  const classes = useStyles();
  const [menuTable, setMenuTable] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [data, setData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  // --------------------------------------------------------------
  const optionState = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];
  const count =
    totalRedux <= 10
      ? 1
      : Number.isInteger(totalRedux / rowsPerPageRedux)
      ? totalRedux / rowsPerPageRedux
      : Math.trunc(totalRedux / rowsPerPageRedux) + 1;
  // --------------------------------------------------------------
  useEffect(() => {
    async function fetch() {
      await dispatch(
        traerColaboradores({
          page: pageRedux,
          rowsPerPage: rowsPerPageRedux,
          orderBy: order.id,
          order: order.direction,
          params: {},
        })
      );
    }
    fetch();
  }, [dispatch, pageRedux, rowsPerPageRedux, order.id, order.direction]);

  useEffect(() => {
    async function fetch() {
      if (loadingRedux) {
        await dispatch(
          traerColaboradores({
            page: pageRedux,
            rowsPerPage: rowsPerPageRedux,
            orderBy: order.id,
            order: order.direction,
            params: {},
          })
        );
        await dispatch(setLoadingSync());
      }
    }
    fetch();
  }, [loadingRedux]);

  useEffect(() => {
    if (dataRedux?.length > 0) {
      setData(dataRedux);
    } else {
      setData([]);
    }
  }, [dataRedux]);
  // --------------------------------------------------------------
  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({
      direction,
      id,
    });
  }

  function handleChangePage(event, value) {
    dispatch(setPage(value - 1));
  }

  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
    dispatch(setPage(0));
  }
  // --------------------------------------------------------------
  const handleClose = (type) => async () => {
    if (type === 'editar') {
      await dispatch(traerColaboradorById(placement?.col_id));
      setMenuTable(false);
      actualizarItem();
    } else if (type === 'borrar') {
      setDeleteDialog(true);
      setMenuTable(false);
    } else {
      setMenuTable(false);
    }
  };

  const handleClick = (item) => async (event) => {
    setAnchorEl(event.currentTarget);
    setMenuTable((prev) => placement?.col_id !== item.col_id || !prev);
    setPlacement(item);
  };
  // --------------------------------------------------------------
  const handleDelete = async () => {
    try {
      const result = await dispatch(eliminarColaborador(placement?.col_id));
      if (result) {
        setDeleteDialog(false);
        dispatch(
          showMessage({
            message: 'El colaborador se eliminó correctamente',
            variant: result?.payload?.message,
          })
        );
        await dispatch(setLoadingSync());
      }
    } catch (error) {
      setDeleteDialog(false);
      dispatch(
        showMessage({
          message: 'Ocurrió un error al eliminar el colaborador',
          variant: 'error',
        })
      );
    }
  };

  // ----------------------------------------------------------------
  const ArrowBackIcon = () => {
    return (
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center"
        style={{ background: '#EFE8FF' }}
      >
        <FuseSvgIcon className="text-48" size={16} color="#3C00BB">
          material-outline:arrow_back_ios
        </FuseSvgIcon>
      </div>
    );
  };
  const ArrowForwardIcon = () => {
    return (
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center"
        style={{ background: '#EFE8FF' }}
      >
        <FuseSvgIcon className="text-48" size={16} color="#3C00BB">
          material-outline:arrow_forward_ios
        </FuseSvgIcon>
      </div>
    );
  };

  return (
    <div className="px-24 py-16">
      <div className="flex sm:flex-row flex-col justify-end items-center mb-12">
        <Typography>
          Mostrando
          <Select
            className={classes.textFieldPag}
            value={rowsPerPageRedux}
            onChange={handleChangeRowsPerPage}
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
          resultados de {totalRedux}
        </Typography>
        <Pagination
          count={count}
          page={pageRedux + 1}
          handleClickstate
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              style={{
                background: 'inherit',
              }}
              classes={{ selected: classes.selectedPag }}
              {...item}
            />
          )}
        />
      </div>
      {/* <FuseScrollbars className="grow overflow-x-auto"> */}
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <CustomTableHead onRequestSort={handleRequestSort} order={order} />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.col_id) {
                    case 'Id': {
                      return o.col_id;
                    }
                    default: {
                      return o[order.col_id];
                    }
                  }
                },
              ],
              [order.direction]
            ).map((e, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <IconButton onClick={handleClick(e)}>
                      <FuseSvgIcon className="text-48 " size={18} color="#AA82FF">
                        feather:more-vertical
                      </FuseSvgIcon>
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <Typography
                      color="#4C647A"
                      className="text-11 h-44 flex justify-center items-center"
                    >
                      {e?.col_id}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.col_fecha_creacion &&
                          format(new Date(e?.col_fecha_creacion), 'yyyy-MM-dd (hh:mm aaa)')}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.fk_tipos_documento?.tsd_descripcion}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.col_nombres}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="left"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 text-left overflow-hidden text-ellipsis max-h-36"
                      >
                        {e?.col_apellidos}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.fk_ciudad?.cty_name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.col_email}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.col_celular}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.fk_rol?.rl_nombre}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color="#4C647A"
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e?.col_fecha_nacimiento}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <div className="h-44 flex justify-center items-center">
                      <Typography
                        color={e.col_mesa_ayuda === null ? '#EB5757' : '#4F0CDD'}
                        className="text-11 h-44 flex justify-center items-center"
                      >
                        {e.col_mesa_ayuda === null
                          ? 'N/A'
                          : `${e.col_mesa_ayuda?.fk_ciudad?.cty_name} - ${e.col_mesa_ayuda?.colma_whatssapp}`}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell
                    align="center"
                    scope="row"
                    component="th"
                    className={clsx(classes.tableCell, 'p-0')}
                  >
                    <Typography
                      color={e.col_estado === 1 ? '#11AE92' : '#EB5757'}
                      className="text-11 h-44 flex justify-center items-center"
                    >
                      {e?.col_estado === 1 ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      {/* </FuseScrollbars> */}
      <div className="flex sm:flex-row flex-col justify-end items-center mt-12">
        <Typography>
          Mostrando
          <Select
            className={classes.textFieldPag}
            value={rowsPerPageRedux}
            onChange={handleChangeRowsPerPage}
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
          resultados de {totalRedux}
        </Typography>
        <Pagination
          count={count}
          page={pageRedux + 1}
          handleClickstate
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              style={{
                background: 'inherit',
              }}
              classes={{ selected: classes.selectedPag }}
              {...item}
            />
          )}
        />
      </div>
    </div>
  );
}

export default CustomTable;
