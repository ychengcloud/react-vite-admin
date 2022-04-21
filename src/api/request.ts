import { createContext, ReactNode } from 'react';
import Axios, { AxiosInstance, AxiosTransformer } from 'axios';
import { message } from 'antd';
import { useContext } from 'react';
import { createBrowserHistory } from 'history';
import { useQuery, useMutation } from 'react-query';
import qs from 'qs';
import { http } from '../enum/httpStatus';
import { fm } from '../locales';
import { Object2GetParams } from '../utils/url';

const history = createBrowserHistory();

console.log('baseurl:', import.meta.env.VITE_BASE_URL);
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  const token = `Bearer ${localStorage.getItem('token')}`;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === http.statusOK) {
      return data;
    }
    message.warning(`请求错误 ${response.statusText}: ${response}`);

    if (response.status === 401) {
      history.push('/auth/login');
    }

    return Promise.reject(new Error(response.statusText || 'Error'));
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          message.error(error.response.data?.message || error.response.data);
          history.push('/login');
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token
        // 跳转登录页面
        case 403:
          history.push('/login');
          break;
        // 404请求不存在
        case 404:
          message.error(error.response.data?.message || fm('global.404'));
          break;
        case 400:
          message.error(error.response.data?.message || fm('global.400'));
          break;
        default:
          message.error(
            error.response.data?.message || fm('global.requestError')
          );
      }
    }
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

const transformPagination = (pagination: any) => {
  if (!pagination) return;

  const current = pagination.current
    ? pagination.current
    : pagination.defaultCurrent;
  const pageSize = pagination.pageSize
    ? pagination.pageSize
    : pagination.defaultPageSize;

  let offset = 0;
  if (current && pageSize) {
    offset = (current - 1) * pageSize;
  }

  return {
    offset,
    limit: pageSize,
  };
};

const transformFilters = (filters: any) => {
  if (!filters) return;
  let result: any[] = [];
  for (let key in filters) {
    if (!filters[key] || filters[key] === null) continue;
    result = [...result, [key + ':eq:' + filters[key]]];
  }
  return result;
};

const transformSorter = (sorter: any) => {
  if (!sorter) return;

  let result = '';
  if (sorter.field && sorter.order) {
    let order: string = 'desc';
    if (sorter.order === 'ascend') order = 'asc';
    result = sorter.field + ' ' + order;
  }

  return result;
};

const useGetList = <T>(key: string, url: string, params?: any) => {
  const axios = useAxios();
  const service = async () => {
    const data: T = await axios.post(`${url}`, {
      params,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
    return data;
  };
  return useQuery(key, () => service());
};

const useGetWithParams = <T, P>(key: string, url: string, params?: T) => {
  const axios = useAxios();
  const service = async () => {
    const data: P = await axios.get(`${url}`, { params });
    return data;
  };
  return useQuery(key, () => service());
};

const useGet = <T>(key: string, url: string) => {
  const axios = useAxios();
  const service = async () => {
    const data: T = await axios.get(`${url}`);
    return data;
  };
  return useQuery(key, () => service());
};

const useCreate = <T, U>(url: string) => {
  const axios = useAxios();
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

const useUpdate = <T>(url: string) => {
  const axios = useAxios();
  return useMutation(async (item: T) => {
    const data: T = await axios.post(`${url}`, item);
    return data;
  });
};

const useDelete = <T>(url: string) => {
  const axios = useAxios();
  return useMutation(async (params: Object) => {
    const data: T = await axios.delete(`${url}${Object2GetParams(params)}`);
    return data;
  });
};

const useBatch = (url: string) => {
  const axios = useAxios();
  return useMutation(async (ids: number[]) => {
    const data = await axios.post(`${url}`, { idList: ids });
    return data;
  });
};

const useTableRequest = (url: string) => {
  return async (params: Object, sort: any) => {
    const keys = Object.keys(sort);
    if (keys.length) {
      params = {
        ...params,
        order_by: keys[0],
        order_type: sort[keys[0]] === 'ascend' ? 'ASC' : 'DESC',
      };
    }
    const result: any = await axios.post(url, params);
    return {
      data: result.data,
      success: true,
      total: result.total,
    };
  };
};

export {
  useGetWithParams,
  useGetList,
  useUpdate,
  useCreate,
  useDelete,
  useBatch,
  useGet,
  useTableRequest,
};

export default axios;
