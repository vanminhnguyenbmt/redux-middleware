# redux-middleware
Custom redux middleware

- [Reducing Boilerplate](#reducing-boilerplate)
  - [Shorthand action](#shorthand-action)
  - [Generating Reducers](#generating-reducers)
- [Applying Patterns](#applying-patterns)
  - [Repository](#repository-with-axios-interceptors)
  - [Factory](#factory-to-initialize-instance-of-repository)
- [Available Scripts](#available-scripts)
  - [yarn install](#yarn-install)
  - [yarn start:dev](#yarn-start:dev)
  - [yarn build:dev](#yarn-build:dev)
  - [yarn build:production](#yarn-build:production)
  
## Reducing Boilerplate
### Shorthand action

#### Before
```js
export const actGetListTodoSuccess = (todos) => ({
    type: Types.GET_LIST_TODO_SUCCESS,
    payload: todos,
});

export const actGetListTodoFailure = (error) => ({
    type: Types.GET_LIST_TODO_FAILURE,
    payload: error,
});

export const actFetchingListTodo = () => ({
    type: Types.GET_LIST_TODO_REQUEST,
});

export const actGetListTodo = () => (dispatch) => {
    dispatch(actFetchingListTodo());
    return todoRepository.getAll()
        .then((res) => {
            dispatch(actGetListTodoSuccess(res.data));
        })
        .catch((err) => {
            dispatch(actGetListTodoFailure(err));
        });
};
```

#### After
```js
export const actGetListTodo = () => (dispatch) => {
    dispatch({
        types: [Types.GET_LIST_TODO_REQUEST, Types.GET_LIST_TODO_SUCCESS, Types.GET_LIST_TODO_FAILURE],
        callAPI: () => todoRepository.getAll(),
        callBack: {
            success: response => {console.log('callAPI success', response)},
            failure: error => {console.log('callAPI failure', error)}
        }
    })
};
```

## Generating Reducers
### Object mapping from action types to handlers.
#### Before
```js
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_TODO:
            return {
                ...state,
                todos: [],
                error: null,
                isLoading: true,
            };
        case Types.GET_LIST_TODO_SUCCESS:
            return {
                ...state,
                todos: action.payload,
                error: null,
                isLoading: false,
            };
        case Types.GET_LIST_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};
```

#### After
```js
const homeReducer = createReducer(initialState, {
    [Types.GET_LIST_TODO]: (state, action) => {
        return {
            ...state,
            todos: [],
            error: null,
            isLoading: true,
        };
    },
    [Types.GET_LIST_TODO_SUCCESS]: (state, action) => {
        return {
            ...state,
            todos: action.payload,
            error: null,
            isLoading: false,
        };   
    },
    [Types.GET_LIST_TODO_FAILURE]: (state, action) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    }
})
```

## Applying Patterns
### Repository with axios interceptors
```js
export default class BaseRepository {
    uri: string;
    repository: AxiosInstance;

    constructor(uri: string) {
        this.uri = uri;
        this.repository = this.axiosClient();
        this.repository.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            const yourToken = 'your_token';
            config.headers['Authorization'] = `Bearer ${yourToken}`;

            return config;
        });
        this.repository.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    axiosClient(headers = {}): AxiosInstance {
        const baseURL = process.env.REACT_APP_BASE_URL;
        return axios.create({
            baseURL,
            headers: {
                ...headers,
            }
        });
    }

    handleSuccess(response: AxiosResponse): AxiosResponse {
        return response;
    }

    handleError = (error: AxiosError): any => {
        console.error('axios error:', error);
        switch (error?.response?.status) {
            case CONST.HttpStatus.UNAUTHORIZED:
                break;
            case CONST.HttpStatus.NOT_FOUND:
                break;
            default:
                break;
        }

        return Promise.reject(error);
    }

    setUri(uri: string): BaseRepository {
        this.uri = uri;
        return this;
    }

    _invalidObject(payload = {}): string | null {
        if (!_.isObject(payload)) return 'Payload is invalid';
        if ((payload instanceof FormData) && (_.isNil(payload) || payload.entries().next().done)) {
            return 'Payload is Empty';
        }

        return null;
    }

    getById<T>(id: number): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');
        return this.repository.get(`${this.uri}/${id}`);
    }

    getOne<T>(id: number): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.get(`${this.uri}?id=${id}`);
    }

    getAll<T>(): Promise<AxiosResponse<T>> {
        return this.repository.get(this.uri);
    }

    /**
    * @param {object} is a object query
    * @example {a: 1, b: '2', c: 'string'}
    * ⟹ a=1&b=2&c=string
    */
    query<T>(object: Record<string, any>): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(object);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.get(`${this.uri}?${qs.stringify(object)}`);
    }

    pagination<T>({ pageIndex = 0, limit = 10, sortBy = 'createdTime', sortType = 'DESC' }: { pageIndex: number, limit: number, sortBy?: string, sortType?: string }): Promise<AxiosResponse<T>> {
        return this.repository.get(`${this.uri}?itemsPerPage=${limit}&pageId=${pageIndex}&sortBy=${sortBy}&sortType=${sortType}`);
    }

    search<T>(searchText: string | number): Promise<AxiosResponse<T>> {
        if (_.isNil(searchText)) return Promise.reject('SearchText is empty');

        return this.repository.get(`${this.uri}?search=${searchText}`);
    }

    create<T>(payload = {}): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.post(this.uri, payload);
    }

    update<T>(payload = {}): Promise<AxiosResponse<T>> {
        const invalidMessage = this._invalidObject(payload);
        if (invalidMessage) return Promise.reject(invalidMessage);

        return this.repository.put(this.uri, payload);
    }

    delete<T>(id: number): Promise<AxiosResponse<T>> {
        if (!_.isNumber(id)) return Promise.reject('Id is not a number');

        return this.repository.delete(`${this.uri}/${id}`)
    }

    customConfig<T>(config: AxiosRequestConfig): AxiosPromise<T> {
        return axios(config);
    }
}
```

### TodoRepository
```js
export default class TodoRepository extends BaseRepository {
    constructor() {
        super(CONST.ApiURI.TODO);
    }

    getAllCustom(): Promise<AxiosResponse<Todo>> {
        return this.setUri(CONST.ApiURI.TODO).getAll<Todo>();
    }
}
```
### Factory to initialize instance of repository
```js
export enum RepositoryName {
    TODO = 'todoRepository'
}

type RepositoryValue = {
    [RepositoryName.TODO]: TodoRepository
}

type RepositoryType = {
    [key in RepositoryName]: RepositoryValue[key];
}

const Repositories: RepositoryType = {
    [RepositoryName.TODO]: new TodoRepository()
};
```

> ##### Using
```js
const todoRepository = Repositories[RepositoryName.TODO];
```

## Available Scripts

In the project directory, you can run:

### `yarn install`
Install all dependencies

### `yarn start:dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build:dev`
### `yarn build:production`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!