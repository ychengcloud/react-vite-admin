import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../stores';
import {
  updateModalState,
  refreshTable as refresh,
  setTableSelectDataRedux,
} from '../../../../../stores/user';
import { IUser } from '../../../tableHeader';

const useModalState = (
  modalName: string
): {
  visible: boolean;
  refresh: boolean;
  setModalStatus: (status: boolean) => void;
  refreshTable: () => void;
  tableSelectData: IUser;
  setSelectTableData: (data: IUser) => void;
} => {
  const reduxState = useSelector((state: RootState) => {
    return {
      visible: state.user.modalStatus[modalName],
      tableSelectData: state.user.tableSelectData,
      refresh: state.user.refresh,
    };
  });
  const dispatch = useDispatch();

  const setModalStatus = (status: boolean) => {
    dispatch(updateModalState({ btnId: modalName, status }));
  };

  const setSelectTableData = (data: IUser) => {
    dispatch(setTableSelectDataRedux(data));
  };

  const refreshTable = () => {
    dispatch(refresh());
  };
  return {
    ...reduxState,
    refreshTable,
    setModalStatus,
    setSelectTableData,
  };
};
export default useModalState;
